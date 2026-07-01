import { fetchWeatherApi } from "openmeteo";

export const getWeatherData = async (
  latitude: string | number,
  longitude: string | number,
) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "is_day",
    ],
    minutely_15: "temperature_2m",
    forecast_minutely_15: 4,
    past_minutely_15: 4,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location

  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const minutely15 = response.minutely15()!;
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    minutely15: {
      time: Array.from(
        {
          length:
            (Number(minutely15.timeEnd()) - Number(minutely15.time())) /
            minutely15.interval(),
        },
        (_, i) =>
          new Date(
            (Number(minutely15.time()) +
              i * minutely15.interval() +
              utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: minutely15.variables(0)!.valuesArray(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      wind_speed_10m: hourly.variables(2)!.valuesArray(),
      precipitation: hourly.variables(3)!.valuesArray(),
      is_day: hourly.variables(4)!.valuesArray(),
    },
  };

  // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
  console.log("\nMinutely15 data:\n", weatherData.minutely15);
  console.log("\nHourly data:\n", weatherData.hourly);
};
