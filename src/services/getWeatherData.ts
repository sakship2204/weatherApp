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
  units: Record<string, any>,
) => {
  try {
    const params: Record<string, string | number | string[]> = {
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

    if (units.windUnit != "Km/h") {
      params.wind_speed_unit = "mph";
    }

    if (units.temperatureUnit != "Celsius") {
      params.temperature_unit = "fahrenheit";
    }
    if (units.precipitationUnit != "mm") {
      params.precipitation_unit = "inch";
    }

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

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

    return weatherData;
  } catch (e) {
    throw new Error(e);
  }
};
