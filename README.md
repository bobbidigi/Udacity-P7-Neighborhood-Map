# (FEND) Project 7: Neighborhood Map w/ REACT
*by **Tony Boswell***


# Project Overview

In this Capstone project for the Udacity Grow with Google Front End Developer Nanodegree, I was tasked to develop a single page application from scratch featuring a map of my favorite neighborhood locations or a neighborhood I would like to visit. I then had to add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.
The project was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app) and I chose to utilize the [Google Maps API](https://cloud.google.com/maps-platform/) and [Foursquare API](https://developer.foursquare.com/) to deliver content.

I tried very hard to mimic the layout, design and functionality that Google Maps utilizes because it is so darn easy for anyone to just pick up and understand how to use. I also chose not to hard code any of my initial data. All location data is retrieved by API requests to Foursquare.

You can take a quick peek at the **live demo** [here](https://shylmysten.github.io/Udacity-P7-Neighborhood-Map/)

## Specifications

-   Write code required to add a full-screen map to the page using the  [Google Maps API](https://developers.google.com/maps/). For sake of efficiency, the map API should be called only once.
-   Write code required to display map markers identifying at least 5 locations that I was interested in within this neighborhood. (*That would be BAR - B - Q for me!*)  Your app should display those locations by default when the page is loaded.
-   Implement a list view of the set of locations defined in step 5.
-   Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time. Providing a search function through a third-party API is not enough to meet specifications. This filter can be a text input or a dropdown menu.
-   Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex: Yelp reviews, Wikipedia, Flickr images, etc). Note that StreetView and Places don't count as an additional 3rd party API because they are libraries included in the Google Maps API.
-   The app's interface should be intuitive to use. For example, the input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered. Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above the map marker with additional information.

## TL;DR

### Development Mode

To get started developing right away and run the project in Develepment mode, clone this [repository](https://github.com/Shylmysten/Udacity-P7-Neighborhood-Map.git)
* install all project dependencies with `npm install`
* start the development server with `npm start`


### Deployment
 * `$ yarn build`
 * `$ serve -s build`


### Need a Production Build
 *  `$ npm run build`

Builds the app for production to the  `build`  folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about  [deployment](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts/template#deployment)  for more information.
Further information about Deployment can be found [here](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts/template#making-a-progressive-web-app)

### Backend Server

To simplify the development process, I have included a npm module called [json-server](https://www.npmjs.com/package/json-server) to provide a backend server to develop against. The provided file [db.json](https://github.com/Shylmysten/Udacity-P7-Neighborhood-Map/blob/master/src/utils/db.json) contains the data needed to perform necessary operations without making any calls to an API.

You will however need to load the server from within bash or Node:

* `$ npm install -g json-server`
* `$ json-server --watch db.json --port 3001`

# *Important*
The backend data uses a fixed set of cached search results and is limited to the details of just 5 restaurants. You must uncomment the code block in the App.js file just below componentDidMount() and then comment out the code immediately following it with the heading that includes '**fetches live data from Foursquare'**.

## Functionality
### Desktop View
In desktop view, the list sits in a panel that opens and closes left to allow a full screen map view.
![enter image description here](http://gdurl.com/WUiZ)

### Mobile View
![Mobile View](http://gdurl.com/Xumm)
**Note at the bottom of the screen in Mobile view the button.**
![Toggle Button to toggle list view and map view in mobile](http://gdurl.com/o8Pe)
When the list is in view, the button says show map, and when the map is in view the button says show list.
### Markers
![Markers](http://gdurl.com/TM8f)
**In Desktop view**, when a marker is clicked on, the marker is magenta. When hovered, the marker is blue and will also bobble then stop.

**In Mobile view**, the markers will turn magenta and continuously bounce when you click on a list item. It allows you to close the list view and see which marker you clicked on.

 - You can then click on a marker and an infowindow will appear with further information about the marker.
 - To close the infowindow, click   on the marker again, or click on the map.
 - To deselect the marker, ( and make it stop bouncing) simply click on the same list item again, or select another list item.

## Error Handling
### Offline Error Handling
![Offline Error Handling](http://gdurl.com/8thN)
### Handling Fetch Errors
![Handling Fetch Errors](http://gdurl.com/Z4eM)
### Handling Google API Errors
![enter image description here](http://gdurl.com/iQZU)

## A11y

 - Focus is appropriately managed allowing users to noticeably tab
   through each of the important elements of the page. Modal or
   interstitial windows appropriately lock focus.
 - Elements on the page use the appropriate semantic elements. For those
   elements in which a semantic element is not available, appropriate
   `ARIA roles`  are defined.
 - All content-related images include appropriate alternate text that
   clearly describes the content of the image.
## Service Worker
CRA comes stock with a service worker. I utilized this service worker in my project to cache images, html and css.  So when available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Attributions

 - [Astrovegan font](https://www.dafont.com/astrovegan.font):
> this font is partial and free for personal use.   commercial licenses
> and complete set available @ billyargel.com   more info contact:  
> [billyargel@gmail.com](mailto:billyargel@gmail.com)   visit
> www.billyargel.com  
> [http://www.facebook.com/billyargelfonts](http://www.facebook.com/billyargelfonts)

 - [google-maps-react](https://github.com/fullstackreact/google-maps-react)
 - [json-server](https://www.npmjs.com/package/json-server)
