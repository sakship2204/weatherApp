export const HourlyForecastCard = ({ time, temp, weatherType }) => {
  return (
    <div className="flex items-center justify-between bg-custom-gray-2 app-wide-border-radius m-[1.1rem] p-[1.1rem] border border-gray-400">
      <span>
        {weatherType}
        {time}
      </span>
      <span>{temp}</span>
    </div>
  );
};
