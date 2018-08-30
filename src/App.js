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
      isListOpen: true, // default restaurant list open on mobile view - used in BottomListToggle
      isPanelOpen: true, // is the panel open in tablet and desktop view - ListComponent
      wasLIClicked: false, // if LI in list is clicked, state is true
      meta: [], // response meta data from all fetches
      bounds: [], // suggestBounds returned from foursquare used to set google map bounds Object{ne: lat, lng, sw: lat, lng}
      venue_ids: [], // ids of all restaurants returned from our "area" fetch
      allRestaurants: [], // api only loads locations once to increase speed and reduce quotas
      query: '', // user's input into our filter
      filterResults: [], // copy of restaurants data to filter and hand out to our list and map
      userSelectedLI: '', // the LI that was clicked on by the user
      onMobile: false, // default desktop view - true if user is viewing on a small screen
      isMarkerActive: false, // is a marker currently highlighted or have animation
      isOnline: true // false if connection is lost and app is served from cache
    }

    this.toggleMobileListView = this
      .toggleMobileListView
      .bind(this)

    this.toggleListPanel = this
      .toggleListPanel
      .bind(this)

    this.filterInput = this
      .filterInput
      .bind(this)

    this.clearFilterInput = this
      .clearFilterInput
      .bind(this)

    this.getListId = this
      .getListId
      .bind(this)
    this.wasMarkerClicked = this
      .wasMarkerClicked
      .bind(this)

  }

  componentWillMount() {
    // check initial screen orientation the user is viewing our app in
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

    // set an event listener to determine if the user flips screen orientation while viewing our app
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
    // monitor connection status
    window.addEventListener('online',  this.updateConnectionStatus);
    window.addEventListener('offline', this.updateConnectionStatus);

  }

  componentDidMount() {

    this.setState({venue_ids: []})

    ///////////////////////////////////////////////////////////////////////////
    //@@ Set up back-end server to fetch and process requests for development
    //@@ So that I don't keep hitting the wall of reaching my quota limits
    //@@ every day while testing Marker animations
    //@@ to run this server you must have the npm package server-json
    //@@ installed and have your data in json format inside db.json
    //## add this line to your package.json file under scripts:
    //## "proxy": "http://localhost:3001"
    //## npm install -g json-server
    //## type in your console json-server --watch db.json --port anyport#
    ///////////////////////////////////////////////////////////////////////////

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

        // we need to get the details for each restaurant that was returned above
        ids.map(venueID =>

        // mock fetches foursquare venue details request
        fetch(`http://localhost:3001/${venueID}`).then(response => response.json()).then(details => details).then(details => {
          // push the details into an array to use later
          venueDetails.push(details.response.venue)
          return venueDetails
        })
        .then(venueDetails =>
          this.setState({
            allRestaurants: venueDetails,
            filterResults: venueDetails
          }))
        .catch(err => console.log('FSgetDetails() Promise: ' + err)))

      })
      .catch(err => console.log('FS.getRestaurants() Promise: ' + err))

      ///////////////////////////////////////////////////////////////////////////
      //@ FS.getRestaurants fetches live data from Foursquare
      //@ the suggested bounds returned are stored in state for google map bounds
      ///////////////////////////////////////////////////////////////////////////

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

  updateConnectionStatus = (e) => {
    e.type === 'offline'?
      this.setState({
        isOnline: false,
      }) :
      this.setState({
        isOnline: true
      })
  }

  // isListOpen = true
  toggleMobileListView(e) {
    this.setState({
      isListOpen: !this.state.isListOpen
    })
  }

  // isPanelOpen = true
  toggleListPanel(e) {
    this.setState({
      isPanelOpen: !this.state.isPanelOpen
    })
  }

  // clear our user's filter input when user clicks X button
  clearFilterInput = () => {
    // if the input is empty we don't want the map to rerender if we click the button
    if (this.state.query === '')
      return
    // if its not empty, set it back to our original state
    this.setState({
      query: '',
      filterResults: [...this.state.allRestaurants]
    })
  }

  // take the user input and set it in our state, then call userDefinedFilter
  filterInput = (query) => {
    this.setState({query: query});
    this.userDefinedFilter(query);
  }

  // function to find restaurants whose names match our user's input
  userDefinedFilter = (query) => {

    // if the input clear/ed through delete or backspace then set our app back to its original state
    if (query === '') {
      this.setState({
        filterResults: [...this.state.allRestaurants]
      });
      return;
    }

    // find restaurants whose names match our user's input
    this.setState({
      filterResults: [...this.state.allRestaurants].filter(restaurant => new RegExp(query, 'i').exec(restaurant.name))
    })
  }

  //@@ Used when LI is clicked
  //@@ typeof ID = string
  //@@ typeof isMarkerActive = boolean
  getListId = (id, isMarkerActive) => {

    if (this.state.userSelectedLI === id && this.state.wasLIClicked && this.state.userSelectedLI !== '') {
      this.setState({wasLIClicked: false, userSelectedLI: ''})
      return
    }
    this.setState({
      wasLIClicked: true, userSelectedLI: id
    })
  }

  // was a marker clicked on our map?
  wasMarkerClicked = (isMarkerActive) => {
    this.setState({
      isMarkerActive: !isMarkerActive
    })
  }

  render() {

    return (<div className='App'>

      <header className='header' role="banner">
        <h2 className='header-title'>Kansas City Barbecue</h2>
      </header>
      <main>
        <section>
          <FilterComponent filterInput={this.filterInput} query={this.state.query} clearFilterInput={this.clearFilterInput} role="region" aria-label="filter restaurants by name"/>
          <ListComponent toggleClassName={this.toggleListPanel} listData={this.state.filterResults} getListId={this.getListId} onMobile={this.state.onMobile} isPanelOpen={this.state.isPanelOpen} isListOpen={this.state.isListOpen} wasLIClicked={this.state.wasLIClicked} isMarkerActive={this.state.isMarkerActive} userSelectedLI={this.state.userSelectedLI}
            isOnline={this.state.isOnline}
          />
          <BottomListToggle toggleClassName={this.toggleMobileListView} isListOpen={this.state.isListOpen}/>
        </section>

        <section id='googleMap'>
          <MapContainer role="application" aria-label="Google Map" bounds={this.state.bounds} points={this.state.filterResults} userSelectedLI={this.state.userSelectedLI} isPanelOpen={this.state.isPanelOpen} onMobile={this.state.onMobile} getListId={this.getListId} wasMarkerClicked={this.wasMarkerClicked}/>
        </section>
      </main>
      <footer className='footer'></footer>

    </div>);
  }
}

export default App;
