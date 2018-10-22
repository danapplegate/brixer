import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './App.css';

import ClipList from './ClipList';

const stateKey = "__sound-mixer__state";
const initialState = localStorage.getItem(stateKey);

class App extends Component {

  state = {
    clips: []
  }

  constructor(props) {
    super(props);
    if (initialState) {
      this.state = JSON.parse(initialState);
    }
  }

  addClips = (clips) => {
    const prevState = this.state;
    this.saveState({
      clips: [
        ...prevState.clips,
        ...clips
      ]
    });
  }

  saveState = (newState) => {
    // localStorage.setItem(stateKey, JSON.stringify(newState));
    this.setState(newState);
  }

  render = () => {
    const { clips } = this.state;
    return (
      <div className="App">
        <ClipList clips={clips} addClips={this.addClips} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
