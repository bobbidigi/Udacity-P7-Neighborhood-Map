import React from 'react'

class ListComponent extends React.Component {
  render() {
    return (
      <section id="listComponent">
        <div id="listbox" className="listbox show-list">
          <button id="toggle-pane"></button>
          <div className="list-top-spacer">Powered by FourSquare Logo</div>
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
          <div className="list-bottom-spacer">Powered by FourSquare Logo</div>
        </div>
      </section>
    )
  }
}

export default ListComponent
