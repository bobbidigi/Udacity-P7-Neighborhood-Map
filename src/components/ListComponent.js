import React from 'react';
import PBFS from '../imgs/Powered-by-Foursquare-black-300.png';

class ListComponent extends React.Component {
  render() {
    return (
      <section id="listComponent">
        <div id="listbox" className="listbox">
          <button id="toggle-pane"
            onClick={ (e) => this.props.toggleClassName(e)  }>
            ></button>
          <div className="list-top-spacer"></div>
            <ul>

              <li className="restaurant-list-item">
                <img aria-hidden="true" className="list-image" src="https://lh4.googleusercontent.com/-9f4Vp0wMENA/WXCuIIFyABI/AAAAAAAAAME/QtKJtspF7qcQVGxiZpHRrsVRx73qLpENwCLIBGAYYCw/w240-h240-p-k-no/" alt="A Great restaurant"/>
                <div className="list-info-wrapper">
                  <h5 className="list-title">Smokehouse Barbecue - Kansas City, Missouri</h5>
                  <p className="rating">4.0 - AWESOME!!!<span className="review-count">  342 reviews</span></p>
                  <p className="cuisines">Barbecue Restaurant</p>
                  <p className="address">8451 NW Prairie View Rd, Kansas City, MO 64152</p>
                  <p className="hours-status">Open until 9:00 PM</p>

                </div>
              </li>

            </ul>
          <div className="list-bottom-spacer"><img src={PBFS} alt="Powered by Foursquare"/></div>
        </div>
      </section>
    )
  }
}

export default ListComponent
