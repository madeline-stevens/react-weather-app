# react-weather-app

## How to get started:

1. I am using the openweathermap API (https://openweathermap.org) to generate a free API key to store in my .env file. You will need to create a .env file as well. Create your .env file at the root level of this project. Inside you'll type something like this- REACT_APP_API_KEY='< your key gets pasted here >'. Don't include the angle brackets.

### My steps:

1. npm init
2. npm i express body-parser
3. npm i -D nodemon
4. npm i concurrently to be able to run server and client with- npm run dev
5. Basic server setup

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("hello"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
```

6. added package.json script for nodemon- "server": "nodemon server.js"
7. Now the terminal script to start the server is just- npm run server
8. npm i -g create-react-app
9. create-react-app client
10. Wed, 6:15pm-- Still having issues with my components not rendering, only server.js, moved on to work with API.
11. working in app.js...doing things...adding things....

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

20. But it's also so important to include some feedback to the user with a human generated error message within App.js--> error: "Please enter a city in the search field":

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
22. Before I go any further I need to create a config folder to house my API key. I got carried away and needed to do that before my first commit. I've changed my key since those commits.
23. installing webpack-- npm install --save-dev webpack-dev-server
24. Removed this above, now installing npm i webpack --save-dev AND npm i webpack-cli --save-dev
25. running npm run dev and still getting this error:
    The react-scripts package provided by Create React App requires a dependency:
    [1][1] "webpack": "4.19.1" but ALSO that my nodemodules webpack version is higher than my package.json. I keep following the directions in terminal but continue to get this error so.....
26. I'm going to try this suggestion also provided in the temrinal directions:
    If prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project. (Now, looking back, probably not needed.)
    [1] That will permanently disable this message but you might encounter other issues.
27. I had to manually and specifically install version 4.19.1 of webpack, and that has solved many problems/errors I was getting in terminal.
28. Now I'm reading all of this great tutorial on webpack 4- https://www.valentinog.com/blog/webpack-tutorial/
29. I added the development and production scripts to package.json:

```js
scripts:
"dev": "webpack --mode development",
"build": "webpack --mode production"
```

After running 'npm run build' now getting this error message in terminal which apparently IS SUPPOSED TO HAPPEN YAY :) :

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/maddys87/Documents/code_projects/react-weather-app'

30. I'm about to install the latest version of webpack (npm i webpack --save-dev) which i'm assuming will cause the same problems as before, conflicting with something else I have.
31. yay! getting the correct error message, same as before-
    ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/maddys87/Documents/code_projects/react-weather-app'

32. On a whim i tried creating a src folder/index.js outside of client folder and it worked! Running npm run build created a dist folder and the main.js content inside it and it didn't error out! huzzah!
33. The next step would be to add these additions to package.json.
    "scripts": {
    "dev": "webpack --mode development ./foo/src/js/index.js --output ./foo/main.js",
    "build": "webpack --mode production ./foo/src/js/index.js --output ./foo/main.js"
    }
34. I'm a little concerned that I have two src folders. I may have to get rid of my client folder altogether. I'll ask friend and mentor, Eddie, about that.
35. Added a .babelrc file and pasted this into it:
    {
    "presets": [
    "@babel/preset-env"
    ]
    }

36. creating webpack.config.js....turns out 0 config still means a config file. :)
37. copied some scripts from my resource into the config file
38. copied some JSX into my index.js file
39. Running npm run build again to bundle.
40. installed react-dom-- npm i react react-dom --save-dev
41. I did NOT INSTALL the html webpack plugin-- npm i html-webpack-plugin html-loader --save-dev
42. installing npm i webpack-dev-server --save-dev. Becuase running 'npm run dev' whenever you make changes to your code? Far from ideal.
43. And changes scripts in package.json from this:

"scripts": {
"start": "node server.js",
"server": "nodemon server.js",
"client": "npm start --prefix client",
"con": "concurrently \"npm run server\" \"npm run client\"",
"dev": "webpack --mode development ./src/index.js --output ./dist/main.js",
"build": "webpack --mode production ./src/index.js --output ./dist/main.js"
},

To adjusting to this:
"start": "webpack-dev-server --mode development --open",
"build": "webpack --mode production"

44. installing npm i @babel/plugin-proposal-class-properties
45. After talking with Gavin it sounds like I don't need a config file to help support my .env file, despite being adivsed to do that by others. So, this is good news. So I'm going to checkout a new branch, revert to my PRE-webpack code and console.log my api key.
46. commit message- After introducing a complete from scratch webpack the npm runstart script does launch localhost:8080 but the site can't be reached which is not surprising so i'm going to push and create a new branch so I can revert to a previous commit.

### Resources:

1. Webpack4 walk through-- https://www.valentinog.com/blog/webpack-tutorial/
2. This youtube tutorial-- https://www.youtube.com/watch?v=204C9yNeOYI
3. This react weather app for inspiration-- https://github.com/pixelsinprogress/weather-app-2/tree/master/react-ui
