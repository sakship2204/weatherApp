type AdditionalMetricType = {
  title: string;
  value: string;
  unit: string;
};

export const AdditionalMetricCard = ({
  title,
  value,
  unit,
}: AdditionalMetricType) => {
  return (
    <div className="metric-card flex flex-col gap-[1rem] bg-custom-gray app-wide-border-radius  my-[1rem] px-[1.2rem] py-[1rem] grow ">
      <span className="text-lg text-gray-300">{title}</span>
      <span className="text-2xl">
        {value}
        <span className="ms-[0.2rem]">{unit}</span>
      </span>
    </div>
  );
};
