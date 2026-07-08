import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import styles from "./Dropdown.module.css";

export const DropDown = ({
  dropDownTitle,
  options,
  hasSettings = false,
  applySettings,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={`cursor-pointer bg-custom-gray app-wide-border-radius py-[0.5rem] px-[1rem] flex items-center ${showDropdown ? "border border-blue-300" : ""} ${styles.unitsDropdownBtn}`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {hasSettings && <FaGear className="pe-[0.5rem]" />}
        {dropDownTitle}
        {showDropdown ? (
          <FaAngleUp className={` text-gray-100 ps-[0.4rem]`} />
        ) : (
          <FaAngleDown className={` text-gray-100 ps-[0.4rem] `} />
        )}
      </button>
      {showDropdown && (
        <div className="units-dropdown absolute bg-custom-gray ps-[1rem] pe-[0.5rem] border border-blue-300 mt-[0.1rem]">
          {options.map((unitType) => {
            return (
              <label
                key={unitType.label}
                className="temperature flex text-base py-[1rem] items-center"
              >
                {unitType.label}:
                <select className="text-sm bg-gray-600 border border-gray-400 ms-[1.5rem]">
                  {unitType.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            );
          })}

          <button
            className="app-wide-border-radius bg-blue-300 p-[0.5rem] text-base mb-[0.7rem] ms-[8rem] cursor-pointer"
            onClick={applySettings}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
