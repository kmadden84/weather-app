import React, { Component } from 'react'

export default class SelectionMenu extends Component {

  render() {
    return (
      <div className="selection-menu">
        <button data-rel="Ottawa" className="selection-menu_button selected" onClick={() => this.props.toggleCity("Ottawa")}>Ottawa</button>
        <button data-rel="Moscow" className="selection-menu_button" onClick={() => this.props.toggleCity("Moscow")}>Moscow</button>
        <button data-rel="Tokyo" className="selection-menu_button" onClick={() => this.props.toggleCity("Tokyo")}>Tokyo</button>
      </div>
    )
  }
}
