import React from 'react';
import PBFS from '../imgs/Powered-by-Foursquare-black-300.png';
import ListItem from './ListItem'

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

              <ListItem/>

            </ul>
          <div className="list-bottom-spacer"><img src={PBFS} alt="Powered by Foursquare"/></div>
        </div>
      </section>
    )
  }
}

export default ListComponent
