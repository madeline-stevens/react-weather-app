import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.city && <p>city: {this.props.city}</p>}
        {this.props.country && <p>country: {this.props.country}</p>}
        {this.props.temperature && (
          <p>current temp: {this.props.temperature}</p>
        )}
        {this.props.humidityTwo && <p>humidity: {this.props.humidityTwo}</p>}
        {this.props.description && <p>description: {this.props.description}</p>}
      </div>
    );
  }
}

export default Weather;
