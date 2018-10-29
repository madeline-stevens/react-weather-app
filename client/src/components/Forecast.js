import React, { Component } from "react";

class Forecast extends Component {
  render() {
    return (
      <div>
        {this.props.temp_min}
        {this.props.temp_max}
        {this.props.description}
      </div>
    );
  }
}

export default Forecast;
