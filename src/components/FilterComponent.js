import React from 'react'

class FilterComponent extends React.Component {
  handleChange(e) {
    const query = e.target.value;
    this.props.updateQuery(query);
  }

  render() {
    return (
      <section id="filterComponent">
        <div className="filterContainer">
          <div className="filterIcon"></div>
          <input
            className="filterText"
            type="text"
            placeholder="barbecue restaurants"
            onChange={this.handleChange.bind(this)}
          />
          <button className="close"></button>
        </div>
      </section>
    );
  }
}

export default FilterComponent
