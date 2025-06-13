import { ComplianceRepo } from "../../data/complianceRepo";

export const lastRun = ComplianceRepo[0]?.updated_date || "";
export const dockerData = ComplianceRepo[1].docker;