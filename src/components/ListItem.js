import React from 'react'
import noImage from '../imgs/restaurantImages/noImage.png'

class ListItem extends React.Component {
  render() {
    const [...restaurants] = this.props.listData
    return (
      <ul>
      {restaurants.map(place => {
        return (
          <li
            className="restaurant-list-item"
            key={place.id}>

            <img
              aria-hidden="true"
              className="list-image"
              src={!place.bestPhoto.prefix ? noImage : place.bestPhoto.prefix +'80x80'+ place.bestPhoto.suffix}
              alt={!place.description ? place.name : place.description}
            />

            <div className="list-info-wrapper">

              <h5 className="list-title">{place.name}</h5>

              <p className="rating">Rating: {place.rating} out of 10<span className="review-count">{place.likes.count} reviews</span></p>

              <p className="cuisines">Barbecue Restaurant</p>

              <p className="address">{place.location.address+', '+ place.location.formattedAddress[1]}</p>

              <p className="hours-status">{place.hours.status}</p>

            </div>
          </li>

        )
    })}
    </ul>
    )
  }
}

export default ListItem
