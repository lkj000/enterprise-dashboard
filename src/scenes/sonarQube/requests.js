import { Defaultqualitygates } from "../../data/sonardefaultqa";
import { SonarMetric } from "../../data/sonarprojectmetric";
import { getSortDataForDropdown } from "../../utils";


// TILES DATA
const metricNames = {
  coverage: "Code Coverage",
  duplicated_lines_density: "Duplicated Lines Density",
  reliability_rating: "Reliability Rating",
  security_hotspots_reviewed: "Security Hotspots Reviewed",
  security_rating: "Security Rating",
  sqale_rating: "Maintainability Rating"
};

export const qualityCheck = Defaultqualitygates.metric_values.slice().sort((a, b) => a.metric.localeCompare(b.metric)).map(({ operation, metric, value }) => ({
    metric: metricNames[metric] || metric,
    operator: operation === "GT" ? ">" : operation === "LT" ? "<" : operation,
    operation,
    value: Number(value)
}));

// TABLE DATA
export const lastRun = SonarMetric?.update_date ?? "";
export const sonarData = (SonarMetric?.data ?? []).map((item, i) => {
  const metricData = item.Measures.reduce((acc, key) => {
    acc[key.metric] = key.value;
    return acc;
  }, {});
  const { Measures, ...rest } = item;
  return { sNo: i+1, ...rest, ...metricData };
});

export const objDefaultFilter = getSortDataForDropdown(sonarData, [ "Portfolio", "VP", "AppOwner" ]);