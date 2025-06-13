export const handleFullScreen = (chartRef) => {
  if (chartRef.current) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      chartRef.current.requestFullscreen();
    }
  }
};

export const handleRenderChart = (chartRef, svg) => {
  if (chartRef.current) {
    chartRef.current.innerHTML = svg;
    const svgElement = chartRef.current.querySelector('svg');

    if (svgElement) {
      svgElement.querySelectorAll('rect').forEach((task) => {
      const taskId = task.getAttribute('id');
      if (taskId) {
        const taskLabel = svgElement.querySelector(`#${CSS.escape(taskId)}-text`);
        if (taskLabel) {
          const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          titleElement.textContent = taskLabel.textContent;
          task.appendChild(titleElement);
        }
      }})
    }
  };
};

export const ganttStyle = {
  titleTopMargin: 35, 
  barHeight: 35, 
  barGap: 0, 
  topPadding: 150, 
  rightPadding: 20, 
  leftPadding: 200, 
  gridLineStartPadding: 150, 
  fontSize: 15, 
  sectionFontSize: 24, 
  numberSectionStyles: 2, 
  axisFormat: '%m/%y',
  tickInterval: '1 month', 
  topAxis: true
};


export const colorCode =  {
  "Ready" : "#8a90dd",
  "In Progress" : "#bfc7ff",
  "Done" : "lightgrey",
  "Blocked": "red"
};