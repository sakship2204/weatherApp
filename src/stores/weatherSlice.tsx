import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    currentWeather: {
      location: "",
      currentDateTime: "",
      code: "",
      temperature: "",
      feelsLike: "",
      humidity: "",
      precipitation: "",
      windSpeed: "",
    },
    units: {
      temperatureUnit: "Celsius",
      windUnit: "Km/h",
      precipitation: "mm",
    },
    dailyForecast: [],
    hourlyForecastFor7Days: [],
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setLocationAndDate: (state, action) => {
      const data = action.payload;
      state.currentWeather.location = data.location;
    },
    setWeatherData: (state, action) => {
      const weatherData = action.payload;
      const firstValue = (values: ArrayLike<number> | null | undefined) =>
        values?.[0]?.toFixed(2) ?? "";

      state.currentWeather.temperature = firstValue(
        weatherData.minutely15.temperature_2m,
      );
      state.currentWeather.feelsLike = firstValue(
        weatherData.minutely15.apparent_temperature,
      );
      state.currentWeather.humidity = firstValue(
        weatherData.minutely15.relative_humidity_2m,
      );
      state.currentWeather.precipitation = firstValue(
        weatherData.minutely15.precipitation,
      );
      state.currentWeather.windSpeed = firstValue(
        weatherData.minutely15.wind_speed_10m,
      );

      state.currentWeather.currentDateTime = new Date(
        weatherData.daily.time[0],
      ).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      state.dailyForecast = [...Array(7).keys()].map((index) => {
        const daily = weatherData.daily;
        return {
          day: new Date(daily.time[index]).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          max: daily.temperature_2m_max[index].toFixed(0),
          min: daily.temperature_2m_min[index].toFixed(0),
          code: daily.weather_code[index],
        };
      });

      state.hourlyForecastFor7Days = [...Array(7).keys()].map((index) => {
        const hourly = weatherData.hourly;
        const date = new Date(
          weatherData.daily.time[index],
        ).toLocaleDateString();
        let daysHourlyForecast = [];
        hourly.time.forEach((item: string, index: number) => {
          const hourlyDate = new Date(item);

          if (hourlyDate.toLocaleDateString() === date) {
            daysHourlyForecast.push({
              time: hourlyDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              }),
              temperature: hourly.temperature_2m[index].toFixed(0),
              code: hourly.weather_code[index],
            });
          }
        });

        return {
          day: new Date(weatherData.daily.time[index]).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            },
          ),
          HourlyForecast: daysHourlyForecast,
        };
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCity, setWeatherData, setLocationAndDate } =
  weatherSlice.actions;

export default weatherSlice.reducer;
