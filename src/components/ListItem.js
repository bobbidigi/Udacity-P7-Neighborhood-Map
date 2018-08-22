import React from 'react'
import noImage from '../imgs/restaurantImages/noImage.png'

class ListItem extends React.Component {
  render() {
    const [...restaurants] = this.props.listData

    return (
      <ul>
      {restaurants.map(restaurant => {
        let place = restaurant.venue;
        return (
          <li className="restaurant-list-item" key={place.id}>
            <img aria-hidden="true" className="list-image" src={noImage} alt="A Great restaurant"/>

            <div className="list-info-wrapper">
              <h5 className="list-title">{place.name}</h5>
              <p className="rating">4.0 - AWESOME!!!<span className="review-count">342 reviews</span></p>
              <p className="cuisines">Barbecue Restaurant</p>
              <p className="address">{place.location.address+', '+ place.location.formattedAddress[1]}</p>
              <p className="hours-status">Open until 9:00 PM</p>

            </div>
          </li>

        )
    })}
    </ul>
    )
  }
}

export default ListItem
