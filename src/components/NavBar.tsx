import { UnitsDropDown } from "./UnitsDropDown";

export const NavBar = () => {
  return (
    <>
      <nav className="h-[4rem]  font-[Open_Sans] text-2xl p-[1rem] flex justify-between text-white">
        <span>Weather now</span>

        <UnitsDropDown />
      </nav>
    </>
  );
};
