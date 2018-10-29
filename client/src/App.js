import React, { Component } from "react";

import Form from "./components/Form";
import Weather from "./components/Weather";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  weatherAPIcall = async e => {
    e.preventDefault();
    console.log("CURRENT STATE : ", this.state);
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    ).catch(error => {
      console.log("Error : ", error.message);
    });

    const data = await api_call.json();
    console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  };

  render() {
    return (
      <div className="App">
        <Form weatherAPIcall={this.weatherAPIcall} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );

    //five day forcast
  }
}

export default App;
