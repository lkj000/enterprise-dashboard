import { VeracodeList } from "../../data/veracodeContinueListExemption";
import { getSortDataForDropdown } from "../../utils";

export const ExempData = VeracodeList[0].filter(item => item.Description.toLowerCase() !== 'not applicable')
  .map((item, index) => ({ sNo: index + 1, ...item }));

export const objDefaultFilter = getSortDataForDropdown(ExempData, ["Portfolio", "Department", "appOwner", "appCode", "Description"]);


//-----------------------------------------------------------------------------------------------------


// PIE CHART DATA
function getPieData ( portName ) {
  const exempCount = portName === "All" ? ExempData.map(item => item.Description) : ExempData.filter(item => item.Portfolio === portName)
    .map(item => item.Description);
  const uniqueTotal = [...new Set(exempCount)];
  const ExempList = uniqueTotal.map(item => {
    const count = exempCount.filter(exemp => exemp === item).length;
    return { id: item, value: count, label: `${item} (${count})` };
  });
  return [ portName, ExempList, exempCount.length ];
};

export const pieData = ["All", ...objDefaultFilter["Portfolio"]].map((portName, index) => {
  const data = getPieData(portName);
  return {
    title: `${data[0]} Portfolio${index === 0 ? "'s" : ""}`, data: data[1], total: data[2], filterName: data[0],
    legendY: index === 0 ? 83 : index === 1 ? 5 : -15
  };
});


//-----------------------------------------------------------------------------------------------------


// BAR CHART DATA
export const barInfo = objDefaultFilter['Portfolio'].reduce((acc, port) => {
  const data = ExempData.filter(item => item.Portfolio === port && item.Department !== 'Not Available').reduce((acc, {Department}) => {
    if (!acc[Department]) {
      acc[Department] = { Portfolio: Department, exemptions: 0 };
    }
    acc[Department].exemptions += 1;
    return acc;
  }, {});
  acc[port] = Object.values(data).sort((a, b) => b.exemptions - a.exemptions);
  return acc;
}, {});
export const barCommon = Object.values(barInfo).flat().sort((a, b) => b.exemptions - a.exemptions);