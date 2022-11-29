import React, { Component } from 'react'
import WeatherDisplay from './components/WeatherDisplay'
import SelectionMenu from './components/SelectionMenu'
import { returnCoordinates } from './helpers/returnCoordinates'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWeather: {
      },
      forecastedWeather: {
      },
      loader: true
    }
    this.handleCityChange.bind(this)
    this.fetchCurrentWeather.bind(this)
    this.fetchCityForecast.bind(this)
  }

  async componentDidMount() {
    await this.fetchCurrentWeather("Ottawa").then(currentWeather => this.setState({ currentWeather }))
    await this.fetchCityForecast("Ottawa").then(forecastedWeather => this.setState({ forecastedWeather, loader: false }))
  }

  async fetchCurrentWeather(city = "") {
    const [lat, lon] = returnCoordinates(city);
    const fetchedData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`);
    const parsedData = await fetchedData.json()
    return parsedData;
  }

  async fetchCityForecast(city = "") {
    const [lat, lon] = returnCoordinates(city);
    const fetchedData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`);
    const parsedData = await fetchedData.json()
    return parsedData;
  }

  async handleCityChange(city) {
    this.setState({ loader: true })
    const allButtons = document.querySelectorAll('.selection-menu_button');
    const selectedButton = document.querySelector(`[data-rel="${city}"]`);
    allButtons?.forEach(button => button.classList.remove("selected"));
    selectedButton.classList.add("selected");
    await this.fetchCurrentWeather(city).then(currentWeather => this.setState({ currentWeather }));
    await this.fetchCityForecast(city).then(forecastedWeather => this.setState({ forecastedWeather, loader: false }));
  }

  render() {
    return (
      <>
        <SelectionMenu key="selection-menu" toggleCity={(city) => this.handleCityChange(city)} />
        <WeatherDisplay key="weather-display" currentWeather={this.state.currentWeather} forecastedWeather={this.state.forecastedWeather} loader={this.state.loader} />
      </>
    )
  }
}

export default App
