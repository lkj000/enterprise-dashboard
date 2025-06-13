import _raw from "../../data-json/xray_cve_summaries.txt";

export const textData = _raw;

export const getSummaryData = (data) => {
  if (!data) return [];

  return data.split("\n").map((line) => {
    const [cve_id, summary] = line.split(": ");
    return { cve_id, summary };
  });
};

export const getCveNames = (data) => {
  return data.map(item => item.cve_id).filter(n => n).sort();
};