import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import MUIDataTable from "mui-datatables";
import cveData from "../../data-json/twistlock_cve_summary.json";
import Dropdown from "../../components/Dropdown";
import { useSearchParams, useNavigate } from "react-router-dom";
import '../global/custom-table.css';

const PrismaCVESummary = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cveParam = searchParams.get("cve");
  const [cve, setCve] = useState(cveParam || "all");

  const columns = [
    {
      name: "cve",
      label: "CVE ID",
      options: {
        filterList: cve !== "all" ? [cve] : [],
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Summary",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options = {
    fixedHeader: true,
    filter: true,
    responsive: "vertical",
    tableBodyHeight: "auto",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    downloadOptions: {
      filename: "Prisma CVE Summary.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
  };

  useEffect(() => {
    if (!cve || cve === "all") {
      navigate(``);
      return;
    }
    const params = new URLSearchParams();
    params.append("cve", cve);
    navigate(`?${params.toString()}`);
  }, [cve, navigate]);

  useEffect(() => {
    if (cveParam) {
      setCve(cveParam);
    }
  }, [cveParam]);

  const optionsCve = cveData.map((item) => item.cve);
  return (
    <Box m="25px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Prisma CVE Summary" />
      </Box>
      <Dropdown
        setState={setCve}
        state={cve}
        options={optionsCve}
        title="CVE ID"
      />
      <MUIDataTable
        data={cveData}
        columns={columns}
        options={options}
        className="custom-table"
      />
    </Box>
  );
};

export default PrismaCVESummary;
