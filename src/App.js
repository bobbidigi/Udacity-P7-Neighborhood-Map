import React, { Component } from 'react';
import FilterComponent from './components/FilterComponent'
import ListComponent from './components/ListComponent'
import BottomListToggle from './components/BottomListToggle'
import Map from './components/Map'
import showMapIcon from './imgs/icons/maps_grey600_24dp.png'
import showListIcon from './imgs/icons/list_grey600_24dp.png'
import openListImage from './imgs/icons/open_arrow.png'
import closeListImage from './imgs/icons/close_arrow.png'
import * as FS from './utils/FSAPI'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        showList: true,
        showPane: true,
        meta: [],
        venue_ids: [],
        allRestaurants: [], // api only loads locations once to increase speed and reduce quotas
        query: '',
        filterResults: [] // copy of restaurants data to filter
      }
      this.handleClickBottomToggler = this.handleClickBottomToggler.bind(this)
      this.handleClickPaneToggler = this.handleClickPaneToggler.bind(this)
      this.updateQuery = this.updateQuery.bind(this)
      this.clearQuery = this.clearQuery.bind(this)

  }

  componentDidMount() {

    FS.getRestaurants()
    .then(restaurants=> {
      this.setState({
        meta: restaurants.meta
      })
      return restaurants.response.groups[0].items
    })
    .then(restaurants => {

      let ids = []

      restaurants.map(restaurant =>
        ids.push(restaurant.venue.id)
      )

      this.setState({
        venue_ids: ids
      })

      return ids
    })
    .then(ids => {

      let venueDetails = []
      ids.map(venueID =>

        FS.getRestaurantDetails(venueID)
        .then(details =>{
          venueDetails.push(details.response.venue)
          return venueDetails
        })
        .then(venueDetails => venueDetails)
        .then(venueDetails =>
          this.setState({
            allRestaurants: venueDetails,
            filterResults: venueDetails
          })

        )
        .catch(err => console.log('FSgetDetails() Promise: '+ err))

        )

    })
    .catch(err => console.log('FS.getRestaurants() Promise: '+ err))


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
    let pane = document.getElementById('toggle-pane')
    if (this.state.showPane && list) {
      list.className= 'listbox hide-pane'
      e.target.style.backgroundImage= 'url('+openListImage+')';
      e.target.setAttribute('alt', 'open pane')
      pane.setAttribute('aria-label', 'Expand side panel')
      pane.setAttribute('alt', 'Expand side panel')
    } else {
      list.className= 'listbox show-pane'
      e.target.style.backgroundImage= 'url('+closeListImage+')';
      e.target.setAttribute('alt', 'close pane')
      pane.setAttribute('aria-label', 'Close side panel')
      pane.setAttribute('alt', 'Close side panel')
    }

    this.setState({
      showPane: !this.state.showPane
    })
  }

  // clear our query and searchResults
  clearQuery = () => {
   this.setState({
     query: '',
     filterResults: [...this.state.allRestaurants]
    })
  }

  // take the user input and set it in our state, then call search to look for restaurants that match our query
updateQuery = (query) => {
  this.setState({
    query: query
  });
  this.search(query);
}

search = (query) => {

  // if the searchBar is empty clear/ed clear the searchResults too
  if (query === '') {
    this.setState({
      filterResults: [...this.state.allRestaurants]
    });
    return;
  }
  this.setState({
    filterResults: [...this.state.allRestaurants].filter(restaurant =>
      // convert the input into lowercase by using toLowerCase() then use indexOf the query converted to lowercase to catch both upper and lower case queries
      restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1)

  })
}


  render() {


    return (
      <div className="App">

        <main>

          <FilterComponent
            updateQuery={this.updateQuery}
            query={this.state.query}
            clearQuery={this.clearQuery}
          />

          <ListComponent
            toggleClassName={ this.handleClickPaneToggler }
            listData={this.state.filterResults}
          />

          <BottomListToggle
            toggleClassName={ this.handleClickBottomToggler }
           />

          <Map />

        </main>

      </div>
    );
  }
}

export default App;
