import { fetchWeatherApi } from "openmeteo";

const buildTimeRange = (
  start: number,
  end: number,
  interval: number,
  utcOffsetSeconds: number,
) =>
  Array.from(
    {
      length: (end - start) / interval,
    },
    (_, index) =>
      new Date(
        (start + index * interval + utcOffsetSeconds) * 1000,
      ).toISOString(),
  );

const valuesToArray = (values: Float32Array | null | undefined) =>
  values ? Array.from(values) : [];

export const getWeatherData = async (
  latitude: string | number,
  longitude: string | number,
) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code"],
    minutely_15: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "wind_speed_10m",
      "weather_code",
    ],
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
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    minutely15: {
      time: buildTimeRange(
        Number(minutely15.time()),
        Number(minutely15.timeEnd()),
        minutely15.interval(),
        utcOffsetSeconds,
      ),
      temperature_2m: valuesToArray(minutely15.variables(0)?.valuesArray()),
      relative_humidity_2m: valuesToArray(
        minutely15.variables(1)?.valuesArray(),
      ),
      apparent_temperature: valuesToArray(
        minutely15.variables(2)?.valuesArray(),
      ),
      precipitation: valuesToArray(minutely15.variables(3)?.valuesArray()),
      wind_speed_10m: valuesToArray(minutely15.variables(4)?.valuesArray()),
      weather_code: valuesToArray(minutely15.variables(5)?.valuesArray()),
    },
    hourly: {
      time: buildTimeRange(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
        utcOffsetSeconds,
      ),
      temperature_2m: valuesToArray(hourly.variables(0)?.valuesArray()),
      weather_code: valuesToArray(hourly.variables(1)?.valuesArray()),
    },
    daily: {
      time: buildTimeRange(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
        utcOffsetSeconds,
      ),
      weather_code: valuesToArray(daily.variables(0)?.valuesArray()),
      temperature_2m_max: valuesToArray(daily.variables(1)?.valuesArray()),
      temperature_2m_min: valuesToArray(daily.variables(2)?.valuesArray()),
    },
  };

  // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
  console.log("\nMinutely15 data:\n", weatherData.minutely15);
  console.log("\nHourly data:\n", weatherData.hourly);
  console.log("\nDaily data:\n", weatherData.daily);
  return weatherData;
};
