# react-weather-app

1. npm init
2. npm i express body-parser jsonwebtoken
3. npm i -D nodemon
4. npm i concurrently to be able to run server and client with- npm run dev
5. Basic server setup

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
app.listen(port, () => console.log(`Server running on ${port}`));
```

5. node server to test localhost:5000
6. added package.json script for nodemon- "server": "nodemon server.js"
7. Now the terminal script to start the server is just- npm run server
8. npm i -g create-react-app
9. create-react-app client
10. Wed, 6:15pm-- Still having issues with my components not rendering, only server.js, moved on to work with API.
11. working in app.js...doing things...adding things....
12. Downloaded the city.list.json list of city ids to find the Seattle id. Might not need this!

```js
{
    "id": 5809844,
    "name": "Seattle",
    "country": "US",
    "coord": {
      "lon": -122.332069,
      "lat": 47.606209
    }
  },
```

Examples of API calls:

https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22

12. Making call to API, hopefully getting data but then what do I do with that data, how do I call that weatherAPIcall function? Now I need PROPS.

````js
class App extends Component {
  weatherAPIcall = async () => {
    const api_call = await fetch(
      `https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`
    );

    const data = await api_call.json();

    ```
````

13. I need to make sure the weatherAPIcall function gets called when the user clicks on the Search button.
14. I was getting a CORS error in chrome and all clues seemed to point to something being wrong with how i was fetching from the API with the sample API call I was using. I changed the url to this:
    `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`

15. And now i'm getting an object of data:

```js
{coord: {…}, weather: Array(2), base: "stations", main: {…}, visibility: 4828, …}
base: "stations"
clouds: {all: 90}
cod: 200
coord: {lon: -96.8, lat: 32.78}
dt: 1540436100
id: 4684888
main: {temp: 284.86, pressure: 1017, humidity: 100, temp_min: 284.15, temp_max: 285.15}
name: "Dallas"
sys: {type: 1, id: 2592, message: 0.0044, country: "US", sunrise: 1540471154, …}
visibility: 4828
weather: Array(2)
0: {id: 501, main: "Rain", description: "moderate rain", icon: "10n"}
1: {id: 701, main: "Mist", description: "mist", icon: "50n"}
length: 2
__proto__: Array(0)
wind: {speed: 4.1, deg: 100, gust: 8.2}
__proto__: Object
```

16. Now i'll change the hardcoded sample location of london to dynamic values in app.js:

```js
class App extends Component {
  weatherAPIcall = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
```

17. Now i'll create state within the the App component in app.js.
18. Wed, 8:45pm- Rendering data through state: < insert screenshot here >
19. To ensure that when someone clicks on the search button WITHOUT entering a city the app doesn't break I added:

```js
if (city) {
  console.log(data);
  this.setState({
    temperature: data.main.temp,
    city: data.name,
    country: data.sys.country,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    error: ""
  });
}
```

20. But it's also so important to include some feedback to the user with an human generated error message within App.js:

```js
const data = await api_call.json();
    if (city) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city in the search field"
      });
    }
  };
```

21. Now to actually get that to show within the weather component by including this - {this.props.error && <p> {this.props.error} </p>}in weather.js in the list with the other conditions.
22. Before I go any further I need to create a config folder to house my API key. I got carried away and needed to do that before my first commit. I know better.
23. installing webpack-- npm install --save-dev webpack-dev-server
24. Removed this above, now installing npm i webpack --save-dev AND npm i webpack-cli --save-dev
25. running npm run dev and still getting this error:
    The react-scripts package provided by Create React App requires a dependency:
    [1][1] "webpack": "4.19.1" but ALSO that my nodemodules webpack version is higher than my package.json. I keep following the directions in terminal but continue to get this error so.....
26. I'm going to try this suggestion also provided in the temrinal directions:
    If prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
    [1] That will permanently disable this message but you might encounter other issues.
