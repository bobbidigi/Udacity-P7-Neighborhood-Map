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
            value={this.props.query}
            className="filterText"
            type="text"
            placeholder="enter text to filter results"
            onChange={this.handleChange.bind(this)}
            tabIndex='0'
            aria-label='filter restaurants by name'
          />
          <button
            className="clearQuery"
            onClick={()=> this.props.clearQuery()}
            aria-label="clear query"
          ></button>
        </div>
      </section>
    );
  }
}

export default FilterComponent
