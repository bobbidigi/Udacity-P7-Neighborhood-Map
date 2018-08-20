import React, { Component } from 'react';
import FilterComponent from './components/FilterComponent'
import ListComponent from './components/ListComponent'
import BottomListToggle from './components/BottomListToggle'
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">

        <main>

          <FilterComponent/>
          <ListComponent/>
          <BottomListToggle/>

          <section id="googleMap">
            <div id="map"></div>
          </section>

        </main>

      </div>
    );
  }
}

export default App;
