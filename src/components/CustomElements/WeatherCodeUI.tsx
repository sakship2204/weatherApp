import type { IconType } from "react-icons";
import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiNa,
  WiRain,
  WiRainMix,
  WiShowers,
  WiSnow,
  WiSnowflakeCold,
  WiSprinkle,
  WiThunderstorm,
} from "react-icons/wi";

export const weatherCodeMap: Record<
  number,
  {
    label: string;
    Icon: IconType;
  }
> = {
  0: { label: "Clear sky", Icon: WiDaySunny },
  1: { label: "Mainly clear", Icon: WiDayCloudy },
  2: { label: "Partly cloudy", Icon: WiDayCloudy },
  3: { label: "Overcast", Icon: WiCloudy },
  45: { label: "Fog", Icon: WiFog },
  48: { label: "Depositing rime fog", Icon: WiFog },
  51: { label: "Light drizzle", Icon: WiSprinkle },
  53: { label: "Moderate drizzle", Icon: WiSprinkle },
  55: { label: "Dense drizzle", Icon: WiSprinkle },
  56: { label: "Light freezing drizzle", Icon: WiRainMix },
  57: { label: "Dense freezing drizzle", Icon: WiRainMix },
  61: { label: "Slight rain", Icon: WiRain },
  63: { label: "Moderate rain", Icon: WiRain },
  65: { label: "Heavy rain", Icon: WiRain },
  66: { label: "Light freezing rain", Icon: WiRainMix },
  67: { label: "Heavy freezing rain", Icon: WiRainMix },
  71: { label: "Slight snow fall", Icon: WiSnow },
  73: { label: "Moderate snow fall", Icon: WiSnow },
  75: { label: "Heavy snow fall", Icon: WiSnow },
  77: { label: "Snow grains", Icon: WiSnowflakeCold },
  80: { label: "Slight rain showers", Icon: WiShowers },
  81: { label: "Moderate rain showers", Icon: WiShowers },
  82: { label: "Violent rain showers", Icon: WiShowers },
  85: { label: "Slight snow showers", Icon: WiSnow },
  86: { label: "Heavy snow showers", Icon: WiSnow },
  95: { label: "Thunderstorm", Icon: WiThunderstorm },
  96: { label: "Thunderstorm with slight hail", Icon: WiThunderstorm },
  99: { label: "Thunderstorm with heavy hail", Icon: WiThunderstorm },
};

export const getWeatherCodeMeta = (
  code: number | string | null | undefined,
) => {
  const numericCode = Number(code);

  if (!Number.isFinite(numericCode)) {
    return {
      label: "Unknown weather",
      Icon: WiNa,
    };
  }

  return (
    weatherCodeMap[numericCode] ?? {
      label: "Unknown weather",
      Icon: WiNa,
    }
  );
};

type WeatherCodeUIProps = {
  code: number | string | null | undefined;
  showLabel?: boolean;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
};

export const WeatherCodeUI = ({
  code,
  showLabel = false,
  className = "",
  iconClassName = "text-5xl",
  labelClassName = "",
}: WeatherCodeUIProps) => {
  const { Icon, label } = getWeatherCodeMeta(code);

  return (
    <span
      className={`inline-flex items-center gap-[0.3rem] ${className}`}
      title={label}
    >
      <Icon className={iconClassName} aria-hidden="true" />
      {showLabel && <span className={labelClassName}>{label}</span>}
    </span>
  );
};
