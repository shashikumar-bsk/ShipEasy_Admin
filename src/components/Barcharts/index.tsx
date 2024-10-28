import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Users", "Drivers", "Orders"],
  ["2021", 1000, 400, 200],
  ["2022", 1170, 460, 250],
  ["2023", 660, 1120, 300],
  ["2024", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "ShipEase Performance",
    subtitle: "Users, Drivers, and Orders: 2021-2024",
  },
  colors:["rgb(53,138,148)","rgb(37,11,165)","#188310"]
};

export default function Barcharts() {
  return (
    <Chart
      chartType="Bar"
      width="90%"
      height="280px"
      data={data}
      options={options}
    />
  );
}
