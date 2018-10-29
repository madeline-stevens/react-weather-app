import React, { Component } from "react";

class Forecast extends Component {
  render() {
    return (
      <div>
        {this.props.temp_min &&
          this.props.temp_max && <h1>Five Day Forecast</h1>}
        {this.props.temp_min && <p> min-temp: {this.props.temp_min}</p>}
        {this.props.temp_max && <p> max-temp: {this.props.temp_max}</p>}
        {this.props.descriptionTwo && (
          <p> forcasted weather: {this.props.descriptionTwo}</p>
        )}
      </div>
    );
  }
}

export default Forecast;
