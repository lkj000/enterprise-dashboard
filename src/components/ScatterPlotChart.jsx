import { React } from "react";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";


const ScatterPlotChart = ({ data, legendData, colors }) => {


  const colorMap = data.reduce((acc, d) => {
    acc[d.id] = d.color;
    return acc;
  }, {});

  const allXValues = data.map(d => d.id);
  const minX = Math.min(...allXValues);
  const maxX = Math.max(...allXValues);


  return(
    <div style={{height: 500, width: '100%', position: 'relative', marginTop: '-30px' }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        xScale={{
          type: 'linear',
          min: minX,
          max: maxX
        }}
        yScale={{ type:'log', base:10, min:10, max:500000 }}
        axisLeft={{
          legend: 'Duration (Log Scale)',
          legendPosition: 'middle',
          legendOffset: -55,
          tickValues: [10, 100, 1000, 10000, 100000, 500000]
        }}
        axisBottom={null}
        margin={{ top: 40, right: 110, bottom: 70, left: 60 }}
        symbolSize={6}
        nodeSize={5}
        useMesh={true}
        enableZoom={true}
        colors={d => colorMap[d.serieId]}
        tooltip={({ node }) => (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent black background
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)'
          }}>
            Run Id: {node.data.x}<br />
            Duration: {node.data.y}<br />
            Date: {node.data.z}
          </div>
        )}
        theme={{
          axis: {
            legend: {
              text: {
                fill: colors.grey[100],
                fontSize: 11
              }
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
                fontSize: 10
              },
            }
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          }
        }}
      />

      {/* LEGEND */}
      <div style={{ position: 'absolute', bottom: "60px", right: "-25px"}}>
        {Object.keys(legendData).map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '5px'}}>
          <div style={{ 
            width: '13px', 
            height: '13px', 
            marginRight: '5px',
            backgroundColor: legendData[item]
          }}>
          </div>
          <span style={{color: colors.grey[100], fontSize: '12px', wordWrap: 'break-word', width: '100px'}}>{item}</span>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ScatterPlotChart;