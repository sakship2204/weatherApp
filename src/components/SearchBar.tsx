import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../stores/weatherSlice";

type SearchBarProps = {
  searchWeather: () => void;
};

type RootState = {
  weather: {
    city: string;
  };
};

function SearchBar({ searchWeather }: SearchBarProps) {
  const [draftCity, setDraftCity] = useState("");
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.weather.city);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraftCity(e.currentTarget.value);
  };

  const commitCity = () => {
    dispatch(setCity(draftCity.trim()));
  };

  const handleCityEntered = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setCity(e.currentTarget.value.trim()));
    }
  };

  const handleClearCity = () => {
    dispatch(setCity(""));
    setDraftCity("");
  };

  return (
    <>
      <section className="flex  items-center justify-center  mt-[2rem]">
        <span className={` relative `}>
          <input
            id="searchBar"
            name="searchBar"
            className="bg-custom-gray ps-[3.2rem] pe-[1rem] py-[0.7rem] w-sm ms-[1rem] app-wide-border-radius text-white text-lg"
            placeholder="Search for a place..."
            value={draftCity}
            onKeyDown={handleCityEntered}
            onChange={handleCityChange}
            onBlur={commitCity}
          />
          <FaSearch className={`${styles.searchIcon} text-gray-300 `} />
          {currentCity && (
            <FaRegCircleXmark
              className={`${styles.clearIcon} text-gray-300 `}
              onClick={handleClearCity}
            />
          )}
        </span>
        <button
          className="bg-blue-500 ms-[1rem] px-[1.3rem]  py-[0.7rem] cursor-pointer app-wide-border-radius text-white"
          onClick={searchWeather}
        >
          Search
        </button>
      </section>
    </>
  );
}

export default SearchBar;
