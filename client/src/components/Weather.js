import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.city && <p>city: {this.props.city}</p>}
        {this.props.country && <p>country: {this.props.country}</p>}
        {this.props.temperature && (
          <p>
            current temp: {this.props.temperature}
            &deg;F
          </p>
        )}
        {this.props.humidity && (
          <p>
            humidity: {this.props.humidity}
            &#37;
          </p>
        )}
        {this.props.description && <p>description: {this.props.description}</p>}
      </div>
    );
  }
}

export default Weather;
