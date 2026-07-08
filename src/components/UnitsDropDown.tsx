import { DropDown } from "./CustomElements/Dropdown";
import { useSelector, useDispatch } from "react-redux";

export const UnitsDropDown = () => {
  const unitsFromStore = useSelector((state: any) => state.weather.units);

  const units = [
    { label: "Temperature", options: ["Celsius", "Fahrenheit"] },
    { label: "Wind speed", options: ["kmph", "mph"] },
    { label: "Precipitation", options: ["mm", "inch"] },
  ];

  return <DropDown hasSettings options={units} dropDownTitle={"Units"} />;
};
