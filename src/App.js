import React, { Component } from 'react';
import FilterComponent from './components/FilterComponent'
import ListComponent from './components/ListComponent'
import BottomListToggle from './components/BottomListToggle'
import showMapIcon from './imgs/maps_grey600_24dp.png'
import showListIcon from './imgs/list_grey600_24dp.png'
import openListImage from './imgs/open_arrow.png'
import closeListImage from './imgs/close_arrow.png'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        showList: true,
        showPane: true
      }
      this.handleClickBottomToggler = this.handleClickBottomToggler.bind(this)
      this.handleClickPaneToggler = this.handleClickPaneToggler.bind(this)

  }

  componentDidMount() {

    window.addEventListener('resize', () => {

      let list = document.getElementById('listbox')

      if (window.matchMedia('(min-width: 750px)').matches) {
          console.log('Screen width is at least 750px');
          if (list.classList.contains('hide-list')) {
            list.classList.toggle('hide-list');
            list.classList.toggle('show-pane');
          }
      } else {
          console.log('Screen less than 750px');
          if (list.classList.contains('hide-pane')) {
            list.classList.toggle('hide-pane');
            list.classList.toggle('show-list');
            document.getElementById('list-toggle').innerHTML = 'show map'
          } else {
            list.classList.toggle('show-pane');
            list.classList.toggle('show-list');
            document.getElementById('list-toggle').innerHTML = 'show map'
          }
      }
      this.setState({
        showList: true,
        showPane: true
      })
    });

  }



  handleClickBottomToggler(e) {
    let list = document.getElementById('listbox')
    if (this.state.showList) {
      list.className= 'listbox hide-list'
      e.target.style.backgroundImage= 'url('+showListIcon+')'
      e.target.innerHTML = 'show list'
    } else {
      list.className= 'listbox show-list'
      e.target.style.backgroundImage= 'url('+showMapIcon+')'
      e.target.innerHTML = 'show map'
    }
    this.setState({
      showList: !this.state.showList
    })

  }

  handleClickPaneToggler(e) {
    let list = document.getElementById('listbox')
    if (this.state.showPane && list) {
      list.className= 'listbox hide-pane'
      e.target.style.backgroundImage= 'url('+openListImage+')';
      e.target.setAttribute('alt', 'open pane')
    } else {
      list.className= 'listbox show-pane'
      e.target.style.backgroundImage= 'url('+closeListImage+')';
      e.target.setAttribute('alt', 'close pane')
    }

    this.setState({
      showPane: !this.state.showPane
    })
  }


  render() {


    return (
      <div className="App">

        <main>

          <FilterComponent/>
          <ListComponent
            toggleClassName={ this.handleClickPaneToggler }
          />
          <BottomListToggle
            toggleClassName={ this.handleClickBottomToggler }
           />

          <section id="googleMap">
            <div id="map"></div>
          </section>

        </main>

      </div>
    );
  }
}

export default App;
