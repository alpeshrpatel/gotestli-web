// import React from "react";
// import {
//   LineChart,
//   Tooltip,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";

// // const data = [
// //   { name: "Jan", value: 148 },
// //   { name: "Feb", value: 100 },
// //   { name: "Marc", value: 205 },
// //   { name: "April", value: 110 },
// //   { name: "May", value: 165 },
// //   { name: "Jun", value: 145 },
// //   { name: "July", value: 180 },
// //   { name: "Agust", value: 156 },
// //   { name: "Sept", value: 148 },
// //   { name: "Oct", value: 220 },
// //   { name: "Now", value: 180 },
// //   { name: "Dec", value: 245 },
// // ];

// const Charts = ({data, type}) => {
//   let datakey=''
//   if(type == 'attempt'){
//     datakey = 'Quiz_Attempt'
//   }else{
//     datakey = 'QuestionSet_created'
//   }
//   const chart = (interval) => (
//     <ResponsiveContainer height={250} width="100%">
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="" />
//         <XAxis tick={{ fontSize: 12 }} dataKey="month" interval={interval} />
//         <YAxis
//           tick={{ fontSize: 12 }}
//           domain={[0, 50]}
//           tickCount={7}
//           interval={interval}
//         />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey={datakey}
//           strokeWidth={2}
//           stroke="#336CFB"
//           fill="#336CFB"
//           activeDot={{ r: 8 }}
//         />
//         {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
//       </LineChart>
//     </ResponsiveContainer>
//   );

//   return (
//     <>
//       {chart("preserveEnd")}
//       {/* {chart('preserveStart')}
//       {chart('preserveStartEnd')}
//       {chart('equidistantPreserveStart')}
//       {chart(1)} */}
//     </>
//   );
// };

// export default Charts;


import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Charts = ({ data, type }) => {
  // If no data is provided, use sample data similar to the image
  const sampleData = [
    { month: "Jan", value: 150 },
    { month: "Feb", value: 350 },
    { month: "Mar", value: 180 },
    { month: "Apr", value: 280 },
    { month: "May", value: 170 },
    { month: "Jun", value: 170 },
    { month: "Jul", value: 270 },
    { month: "Aug", value: 100 },
    { month: "Sep", value: 190 },
    { month: "Oct", value: 360 },
    { month: "Nov", value: 260 },
    { month: "Dec", value: 100 }
  ];

  const chartData = data || sampleData;
  console.log(data)
  let dataKey = type === 'attempt' ? 'Quiz_Attempt' : (type === 'QuestionSet_created' ? 'QuestionSet_created' : (type == 'Completed_Quiz' ? 'Completed_Quiz' : 'value'));

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-200">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Monthly Sales</h2>
        <div className="text-gray-400">···</div>
      </div> */}
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Bar 
            dataKey={dataKey} 
            fill="#4F46E5" 
            radius={[4, 4, 0, 0]} 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;