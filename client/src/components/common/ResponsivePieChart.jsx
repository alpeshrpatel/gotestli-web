import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ResponsivePieChart = ({complexityCounterPieChartData}) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 500 });

  // Sample data with some zero values to demonstrate the solution
//   const complexityCounterPieChartData = [
//     { name: 'Easy', value: 25, color: '#22c55e' },
//     { name: 'Medium', value: 45, color: '#f59e0b' },
//     { name: 'Hard', value: 30, color: '#ef4444' },
//     { name: 'Expert', value: 0, color: '#8b5cf6' }, // Zero value example
//   ];

  // Filter out zero values for the pie chart, but keep them for labels
  const nonZeroData = complexityCounterPieChartData.filter(item => item.value > 0);
  const hasZeroData = complexityCounterPieChartData.some(item => item.value === 0);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('chart-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: Math.max(300, rect.width),
          height: Math.max(300, rect.height)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    
    // Calculate position inside the pie slice (between inner and outer radius)
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Get the actual data item (from nonZeroData since that's what's being rendered)
    const dataItem = nonZeroData[index];
    const complexityName = dataItem?.name || "";
    const actualValue = dataItem?.value || 0;
    
    // Calculate total for percentage
    const total = complexityCounterPieChartData.reduce((sum, item) => sum + item.value, 0);
    const actualPercent = total > 0 ? (actualValue / total) * 100 : 0;
    
    // Only show label if the slice is large enough (more than 5% to avoid cramped text)
    if (actualPercent < 5) {
      return null;
    }

    // Calculate responsive font size based on slice size and container
    const fontSize = Math.max(12, Math.min(16, (actualPercent / 100) * dimensions.width * 0.05));

    return (
      <g>
        {/* Name label */}
        <text
          x={x}
          y={y - 8}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fontWeight="600"
          style={{ 
            userSelect: 'none',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
        >
          {complexityName}
        </text>
        {/* Percentage label */}
        <text
          x={x}
          y={y + 8}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize - 2}
          fontWeight="500"
          style={{ 
            userSelect: 'none',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
        >
          {`${actualPercent.toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const CustomLegend = () => {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '16px'
      }}>
        {complexityCounterPieChartData.map((item, index) => {
          const total = complexityCounterPieChartData.reduce((sum, dataItem) => sum + dataItem.value, 0);
          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
          
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: item.color
              }} />
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                {item.name}: {percentage}% ({item.value})
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#1f2937'
      }}>
        Distribution
      </h2>
      
      <div id="chart-container" style={{
        width: '100%',
        height: '20vh'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={nonZeroData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={Math.min(dimensions.width, dimensions.height) * 0.25}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {nonZeroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend that shows all data including zeros */}
      {/* <CustomLegend /> */}
      
      {hasZeroData && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#eff6ff',
          borderRadius: '8px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#1d4ed8',
            textAlign: 'center',
            margin: '0'
          }}>
            <span style={{ fontWeight: '600' }}>Note:</span> Categories with 0 questions are shown in the legend but not in the chart.
          </p>
        </div>
      )}

      {/* Statistics Summary */}
      <div style={{
        marginTop: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gap: '16px'
      }}>
        {complexityCounterPieChartData.map((item, index) => {
          const total = complexityCounterPieChartData.reduce((sum, dataItem) => sum + dataItem.value, 0);
          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
          
          return (
            <div key={index} style={{
              textAlign: 'center',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: item.color,
                margin: '0 auto 8px auto'
              }} />
              <div style={{
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                {item.name}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '2px'
              }}>
                {item.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResponsivePieChart;