import React from 'react';
import PBFS from '../imgs/Powered-by-Foursquare-black-300.png';
import ListItem from './ListItem'


class ListComponent extends React.Component {
  render() {
    return (
      <section id="listComponent">
        <aside
          className={'listbox '+ (this.props.onMobile? (this.props.isListOpen? 'show-list' : 'hide-list') : (this.props.isPanelOpen ? 'show-panel' : 'hide-panel'))}
          id="listbox"
        >

          <button
            id="toggle-panel"
            className={this.props.isPanelOpen ? 'panel-open' : 'panel-closed'}
            onClick={ (e) => this.props.toggleClassName(e)  }
            aria-label={this.props.isPanelOpen? 'Collapse side panel': 'Expand side panel'}
            aria-expanded={this.props.isPanelOpen? 'true' : 'false'}
            alt={this.props.isPanelOpen? 'Collapse side panel': 'Expand side panel'}
            title={this.props.isPanelOpen? 'Collapse side panel': 'Expand side panel'}
          >
          </button>

          <div className="list-overflow">
            <div className="list-top-spacer"></div>

            <ListItem
              listData={this.props.listData}
              getListId={this.props.getListId}
              onMobile={this.props.onMobile}
              isMarkerActive={this.props.isMarkerActive}
              userSelectedLI={this.props.userSelectedLI}
            />

            <div className="list-bottom-spacer">
              <img
                src={PBFS}
                alt="Powered by Foursquare"
                title='Powered by Foursquare'
              />
            </div>

          </div>
        </aside>
      </section>
    )
  }
}

export default ListComponent
