export const HourlyForecastCard = ({ time, temp, weatherType }) => {
  return (
    <div className="flex items-center justify-between bg-custom-gray-2 app-wide-border-radius m-[1.1rem] py-[1.2rem] px-[1rem] border border-gray-400">
      <div>
        {weatherType}
        <span className="ms-[0.3rem]">{time}</span>
      </div>
      <span>{temp}&deg;</span>
    </div>
  );
};
