export const CurrentWeatherCard = () => {
  return (
    <>
      <div
        className={` app-wide-border-radius flex items-center py-[7rem] px-[2rem]  bg-blue-500 justify-between`}
      >
        <div className="current-city-time text-white">
          <div className="text-4xl">Berlin</div>
          <div className="text-gray-300 text-lg">Tues,</div>
        </div>
        <div>
          Icon
          <span className="ps-[0.5rem]">Temp</span>
        </div>
      </div>
    </>
  );
};
