import { API } from "@/utils/AxiosInstance";
import { useEffect, useState } from "react";
import {
  Pie,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Direct", value: 400 },
  { name: "Referal", value: 300 },
  { name: "Organic", value: 300 },
];
const COLORS = ["#f44336", "#e91e63", "#9c27b0", "#673ab7","#3f51b5","#2196f3", "#b388ff", "#8c9eff", "#82b1ff","#009688"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };


const PieChartComponent = () => {
  const [questionsetCount, setQuestionsetCount] = useState([]);
  useEffect(() => { 
    async function getQuestionsetCount() {
      const {data} = await API.get("api/questionset/count/used");
      console.log(data);
      setQuestionsetCount(data);
    }
    getQuestionsetCount();
  }, [])
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={350} height={350}>
        <Pie
          dataKey="count"
          isAnimationActive={false}
          data={questionsetCount}
          // label={renderCustomizedLabel}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={75}
          labelLine={false}
           fill="#8884d8"
          >
            
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartComponent;
