import React from 'react';
import './App.css';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [ 
        {
        //   name: "example track name",
        //   artist: "example track artist",
        //   album: "example ablum",
        //   id: 1,
        // },
        // {
        //   name: "example track name 2",
        //   artist: "example track artist 2",
        //   album: "example ablum 2",
        //   id: 2,
        },
      ],
      playlistName: "example playlist",
      playlistTracks: [
        {
          name: "example playlist track name",
          artist: "example playlist track artist",
          album: "example playlist ablum",
          id: 3,
        },
        // {
        //   name: "example playlist track name 4",
        //   artist: "example playlist track artist 4",
        //   album: "example playlist ablum 4",
        //   id: 4,
        // },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    const foundTrack = this.state.playlistTracks.find(
      (playlistTrack) => playlistTrack.id === track.id
      );
      const newTrack = this.state.playlistTracks.concat(track);
      foundTrack ? console.log("Track already exists") : this.setState({ playlistTracks: newTrack });

      // if (foundTrack) {
      //   console.log("Track already exist");
      // } else {
      //   this.setState({ playlistTracks: newTrack});
      // } LONGER VERSION OF LINE 48 (Just for reference)
  }

  removeTrack(track) {
    const isPresent = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
      this.setState({ playlistTracks: isPresent });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((results) => {
      this.setState({ searchResults: results });
      // console.log(term);
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar 
          onSearch={this.search}
          />

          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
            />
            
            {/* <!-- Add a Playlist component --> */}
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
