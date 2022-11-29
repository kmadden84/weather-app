import React, { Component } from 'react'
import { days } from '../constants/days';
import { Circles } from 'react-loader-spinner'

export default class WeatherDisplay extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  render() {

    const filteredForecast = this.props?.forecastedWeather?.list?.filter((value, index, self) => {
      return self.findIndex(v => new Date(v.dt_txt).toDateString() === new Date(value.dt_txt).toDateString()) === index;
    })

    return (
      <div className="weather-display">
        {
          (this.props.loader) ?
            <Circles
              height="80"
              width="80"
              className="loader"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : ''
        }
        <div className="weather-display_top">
          <h2>Today</h2>
          <div className="weather-display_top--inner">
            {this.props?.currentWeather?.weather?.[0]?.icon && <img src={`http://openweathermap.org/img/wn/${this.props?.currentWeather?.weather?.[0]?.icon}@2x.png`} className="weather-display_top--icon" alt={`${this.props?.currentWeather?.weather?.[0]?.main}`} />}
            <span><span className="weather-display_top--inner_temp">
              {this.props?.currentWeather?.main?.temp}°</span><br />
              <span className="weather-display_top--inner_weather">{this.props?.currentWeather?.weather?.[0]?.main}</span></span>

          </div>

          {/* <FontAwesomeIcon icon={faCloud} className="weather-display_icon" /> */}
        </div>
        <div className="weather-display_bottom">
          {filteredForecast?.map((forecast, index) => {
            const day = days[`${new Date(forecast.dt_txt).getDay()}`]
            if (index <= 3)
              return (
                <div className="weather-display_bottom--weather_box" key={index}>
                  <span className="weather-display_bottom--inner_day">{day}</span>
                  {forecast?.weather?.[0]?.icon && <img src={`http://openweathermap.org/img/wn/${forecast?.weather?.[0]?.icon}@2x.png`} className="weather-display_top--icon" alt={`${forecast?.weather?.[0]?.main}`} />}
                  <span className="weather-display_bottom--inner_temp">{forecast?.main?.temp}°</span>
                </div>
              )
          })
          }
        </div>
      </div >
    )
  }
}
