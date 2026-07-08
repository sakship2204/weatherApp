import { useSelector } from "react-redux";
import { UnitsDropDown } from "./UnitsDropDown";

export const NavBar = () => {
  const units = useSelector((state: any) => state.weather.units);
  return (
    <>
      <nav className="h-[4rem]  font-[Open_Sans] text-2xl p-[1rem] flex justify-between text-white">
        <span>Weather now</span>
        <div className=" flex items-center gap-[1rem]">
          <span className="text-base">
            Temperature is in: "{units.temperatureUnit}"
          </span>
          <UnitsDropDown />
        </div>
      </nav>
    </>
  );
};
