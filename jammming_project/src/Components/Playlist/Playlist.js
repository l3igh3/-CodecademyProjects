import React from "react";
import "./Playlist.css";
import TrackList from "../trackList/TrackList";


class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
             <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
             {/* <!-- Add a TrackList component --> */}
             <TrackList 
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
             />
             
             <button className="Playlist-save" onClick={this.props.onSave}>
                SAVE TO SPOTIFY
             </button>
            </div>
        );
    }
}

export default Playlist;