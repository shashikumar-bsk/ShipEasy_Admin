import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Drivers", 25],
  ["Users", 39],
  ["Orders", 20],

];

export const options = {
  title: "ShipEase Daily Activities",
  is3D: true,
  colors:["rgb(53,138,148)","rgb(37,11,165)","#188310"]
};

export default function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}