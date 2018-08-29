import React, {Component} from 'react';
import FilterComponent from './components/FilterComponent'
import ListComponent from './components/ListComponent'
import BottomListToggle from './components/BottomListToggle'
import MapContainer from './components/MapContainer'
// eslint-disable-next-line
import * as FS from './utils/FSAPI'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: true,
      isPanelOpen: true,
      wasLIClicked: false,
      meta: [],
      bounds: [],
      venue_ids: [],
      allRestaurants: [], // api only loads locations once to increase speed and reduce quotas
      query: '',
      filterResults: [], // copy of restaurants data to filter
      userSelectedLI: '',
      onMobile: false,
      isMarkerActive: false
    }
    this.toggleMobileListView = this
      .toggleMobileListView
      .bind(this)
    this.toggleListPanel = this
      .toggleListPanel
      .bind(this)
    this.updateQuery = this
      .updateQuery
      .bind(this)
    this.clearQuery = this
      .clearQuery
      .bind(this)
    this.getListId = this.getListId.bind(this)
    this.wasMarkerClicked = this.wasMarkerClicked.bind(this)

  }

  componentWillMount() {

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 750px)').matches) {
        console.log('Screen width is at least 750px');
        this.setState({
          onMobile: false,
          isListOpen: true,
          isPanelOpen: true,
          userSelectedLI: ''
        })

      } else {
        console.log('Screen less than 750px');
        this.setState({
          onMobile: true,
          isListOpen: true,
          isPanelOpen: true,
          userSelectedLI: ''
        })
      }

    });
  }

  componentDidMount() {

    this.setState({venue_ids: []})

    //@@ Set up fetch for back-end server to process request for development
    //@@ So that I don't keep hitting the wall of reaching my quota limits
    //@@ every day while testing Marker animations
    //@@ to run this server you must have the npm package server-json
    //@@ installed and have your data in json format inside db.json
    //## add this line to your package.json file under scripts:
    //## "proxy": "http://localhost:3001"
    //## npm install -g json-server
    //## type in your console json-server --watch db.json --port anyport#

    //  mock fetches foursquare explore? request
    fetch('http://localhost:3001/response')
      .then(res => res.json())
      .then(restaurants => {
        this.setState({
          meta: restaurants.meta,
          bounds: [restaurants.response.suggestedBounds.sw, restaurants.response.suggestedBounds.ne]
        })
        return restaurants
          .response
          .groups[0]
          .items
      })
      .then(restaurants => {

        let ids = []

        restaurants.map(restaurant => ids.push(restaurant.venue.id))

        this.setState({venue_ids: ids})

        return ids
      })
      .then(ids => {

        let venueDetails = []
        ids.map(venueID =>
        // mock fetches foursquare venue details request
        fetch(`http://localhost:3001/${venueID}`)
          .then(response => response.json())
          .then(details => details)
          .then(details => {
            venueDetails.push(details.response.venue)
            return venueDetails
          })
          // .then(venueDetails => venueDetails)
          .then(venueDetails => this.setState({allRestaurants: venueDetails, filterResults: venueDetails}))
          .catch(err => console.log('FSgetDetails() Promise: ' + err)))

      })
      .catch(err => console.log('FS.getRestaurants() Promise: ' + err))

      // FS.getRestaurants()
      // .then(restaurants=> {
      //   this.setState({
      //     meta: restaurants.meta,
      //     bounds: [restaurants.response.suggestedBounds.sw, restaurants.response.suggestedBounds.ne]
      //   })
      //   return restaurants.response.groups[0].items
      // })
      // .then(restaurants => {
      //
      //   let ids = []
      //
      //   restaurants.map(restaurant =>
      //     ids.push(restaurant.venue.id)
      //   )
      //
      //   this.setState({
      //     venue_ids: ids
      //   })
      //
      //   return ids
      // })
      // .then(ids => {
      //
      //   let venueDetails = []
      //   ids.map(venueID =>
      //
      //     FS.getRestaurantDetails(venueID)
      //     .then(details =>{
      //       venueDetails.push(details.response.venue)
      //       return venueDetails
      //     })
      //     .then(venueDetails => venueDetails)
      //     .then(venueDetails =>
      //       this.setState({
      //         allRestaurants: venueDetails,
      //         filterResults: venueDetails
      //       })
      //
      //     )
      //     .catch(err => console.log('FSgetDetails() Promise: '+ err))
      //
      //     )
      //
      // })
      // .catch(err => console.log('FS.getRestaurants() Promise: '+ err))

    }


// isListOpen = true
  toggleMobileListView(e) {
    this.setState({
      isListOpen: !this.state.isListOpen
    })
  }

// isPanelOpen
  toggleListPanel(e) {
    this.setState({
      isPanelOpen: !this.state.isPanelOpen
    })
  }

  // clear our query and searchResults
  clearQuery = () => {
    // if the query is empty we don't want the map to rerender if we click the button
    if (this.state.query === '')
      return

    this.setState({
      query: '',
      filterResults: [...this.state.allRestaurants]
    })
  }

  // take the user input and set it in our state, then call search to look for restaurants that match our query
  updateQuery = (query) => {
    this.setState({query: query});
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
      new RegExp(query, 'i').exec(restaurant.name))
    })
  }

  getListId = (id, isMarkerActive) => {
    if (this.state.userSelectedLI === id && this.state.wasLIClicked && this.state.userSelectedLI !== '') {
      this.setState({
        wasLIClicked: false,
        userSelectedLI: '',
      })
      return
    }
    this.setState({
      wasLIClicked: true,
      userSelectedLI: id,
      // iwInfo: this.state.filterResults.filter(item => item.id === id)
    })
  }

  wasMarkerClicked = (isMarkerActive) => {
      this.setState({
        isMarkerActive: !isMarkerActive
      })
  }


  render() {

    return (<div className='App'>

      <header
        className='header'
        role="banner"
        >
        <h2 className='header-title'>Kansas City Barbecue</h2>
      </header>
      <main>
        <section>
          <FilterComponent
            updateQuery={this.updateQuery}
            query={this.state.query}
            clearQuery={this.clearQuery}
            role="region"
            aria-label="filter restaurants by name"
          />
          <ListComponent
            toggleClassName={this.toggleListPanel}
            listData={this.state.filterResults}
            getListId={this.getListId}
            onMobile={this.state.onMobile}
            isPanelOpen={this.state.isPanelOpen}
            isListOpen={this.state.isListOpen}
            wasLIClicked={this.state.wasLIClicked}
            isMarkerActive={this.state.isMarkerActive}
          />
          <BottomListToggle toggleClassName={this.toggleMobileListView}
            isListOpen={this.state.isListOpen}
          />
        </section>

        <section id='googleMap'>
          <MapContainer
            role="application"
            aria-label="Google Map"
            bounds={this.state.bounds}
            points={this.state.filterResults}
            userSelectedLI={this.state.userSelectedLI}
            isPanelOpen={this.state.isPanelOpen}
            onMobile={this.state.onMobile}
            getListId={this.getListId}
            wasMarkerClicked={this.wasMarkerClicked}
          />
        </section>
      </main>
      <footer className='footer'></footer>

    </div>);
  }
}

export default App;
