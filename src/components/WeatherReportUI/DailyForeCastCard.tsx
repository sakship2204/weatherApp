import { WeatherCodeUI } from "../CustomElements/WeatherCodeUI";

export const DailyForeCastCard = ({ data }: Record<string, any>) => {
  const { title, min, max, code } = data;
  return (
    <div className="metric-card flex flex-col gap-[1rem] bg-custom-gray app-wide-border-radius  my-[1rem] px-[1rem] py-[1rem] grow ">
      <div className="text-lg mx-auto">{title}</div>
      <WeatherCodeUI code={code} className="mx-auto" />
      <div className="text-base flex justify-between">
        <span>{min}&deg;</span>
        <span>{max}&deg;</span>
      </div>
    </div>
  );
};
