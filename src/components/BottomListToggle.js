import React from 'react'

class BottomListToggle extends React.Component {
  render() {
    return (
      <section id="list-toggler">
        <div className="toggle-container">
          <div className="toggle-list">
            <div className="button-wrapper">
              <button id="list-toggle" className="list-toggle">
                show map
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BottomListToggle
