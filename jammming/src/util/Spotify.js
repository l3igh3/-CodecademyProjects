let accessToken = "";
const clientID = "14580eb615cd4e029515323506b35447";
// const redirectURI = "http://localhost:3000/";
const redirectURI = `https://www.Jammming-spot-code.surge.sh`;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = redirect;
    }
  },

    search(term) {
        accessToken = Spotify.getAccessToken();
        // console.log(accessToken);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}`},
        })
            .then((response)=> {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map((tracks) => ({
                    id: tracks.id,
                    name: tracks.name,
                    artist: tracks.artists[0].name,
                    album: tracks.album.name,
                    uri: tracks.uri,
                }));
            });
    },

    savePlaylistName(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json",};
        let userID = "";
        return fetch("https://api.spotify.com/v1/me", { headers: headers })
            .then((response) => response.json())
            .then((jsonResponse) => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: name }),
                })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    const playlistID = jsonResponse.id;
                    return fetch(
                        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                        {
                            headers: headers,
                            method: "POST",
                            body: JSON.stringify({ uris: trackURIs}),
                        }
                    );
                });
            });
        
    },
};

export { Spotify };