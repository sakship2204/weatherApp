import { DropDown } from "./CustomElements/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setUnits } from "../stores/weatherSlice";

export const UnitsDropDown = () => {
  const unitsFromStore = useSelector((state: any) => state.weather.units);
  const dispatch = useDispatch();

  const units = [
    {
      label: "Temperature",
      options: ["Celsius", "Fahrenheit"],
      parameter: "temperatureUnit",
    },
    {
      label: "Wind speed",
      options: ["Km/h", "mph"],
      parameter: "windUnit",
    },
    {
      label: "Precipitation",
      options: ["mm", "inch"],
      parameter: "precipitation",
    },
  ];

  const applySettings = (settings: Record<string, string>) => {
    dispatch(setUnits(settings));
  };

  return (
    <DropDown
      hasSettings
      options={units}
      dropDownTitle="Units"
      currentSettings={unitsFromStore}
      applySettings={applySettings}
    />
  );
};
