import { Exemptions } from "../../data/exemptions-runners";
import { ComplianceRepo } from "../../data/complianceRepo";

const updateString = (str) => {
  return str.replace(/-\s+/g, ', ').replace(/-\s*$/g, '').replace(/,\s*$/g, '').replace(/\s*,\s*/g, ', ').replace(/#\S+/g, '').trim();
};

export const ExemptionData = Exemptions.map((item, i) => ({ ...item, sNo: i+1 }));
export const RunsonData = ComplianceRepo[1]?.runson?.map((data, i) => ({
    sNo: i+1,
    name: data.name,
    fileName: updateString(data.fileName),
    label: updateString(data.label),
})) || [];