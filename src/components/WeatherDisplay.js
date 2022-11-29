import React, { Component } from 'react'
import { Circles } from 'react-loader-spinner'

export default class WeatherDisplay extends Component {
  constructor(props) {
    super(props)
    this.props = props;
  }

  render() {
    
    const filteredForecast = this.props?.forecastedWeather?.list?.filter((forecast) => forecast?.dt_txt?.indexOf("12:00:00") > -1);
    
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
        </div>
        <div className="weather-display_bottom">
          {filteredForecast?.map((forecast, index) => {
            let date = new Date(forecast.dt_txt);
            let day = date?.toString().slice(0, 3);
            if (index <= 3)
              return (
                <div className="weather-display_bottom--weather_box" key={index}>
                  <span className="weather-display_bottom--inner_day">{day}</span>
                  <img src={`http://openweathermap.org/img/wn/${forecast?.weather?.[0]?.icon}@2x.png`} className="weather-display_top--icon" alt={`${forecast?.weather?.[0]?.main}`} />
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
