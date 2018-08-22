import React from 'react'

class FilterComponent extends React.Component {

  render() {
    return (
      <section id="filterComponent">
        <div className="filterContainer">
          <div className="filterIcon"></div>
          <input className="filterText" type="text" placeholder="barbecue restaurants"/>
          <button className="close"></button>
        </div>
      </section>
    );
  }
}

export default FilterComponent
