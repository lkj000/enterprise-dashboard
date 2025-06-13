import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from "../../components/Header";
import MUIDataTable from "mui-datatables";
import _raw from "../../data-json/cve_id_summaries.txt";
import Dropdown from "../../components/Dropdown";
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../global/custom-table.css';


const VeracodeCVESummary = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cveParam = searchParams.get('cve');
  
  const [summary, setSummary] = useState("");
  const [cve, setCve] = useState(cveParam || 'all');
  
  const columns = [
    {
      name: "cve_id",
      label: "CVE ID",
      options: {
        filterList: cve !== 'all' ? [cve] : [],
        filter: true,
        sort: true,
      }
    },
    {
      name: "summary",
      label: "Summary",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  const options = {
    fixedHeader: true,
    filter: true,
    responsive: 'vertical',
    tableBodyHeight: 'auto',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50, 100],
    sort: true,
    downloadOptions: {
      filename: "Veracode CVE Summary.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    }
  };

  useEffect(() => {
    fetch(_raw)
      .then((r) => r.text())
      .then((text) => {
        setSummary(text);
      });
  }, []);

  useEffect(() => {
    if (!cve || cve === 'all') {
      navigate(``);
      return 
    }
    const params = new URLSearchParams();
    params.append('cve', cve);
    navigate(`?${params.toString()}`);
  }, [cve, navigate]);

  useEffect(() => {
    if (cveParam) {
      setCve(cveParam);
    }
  }, [cveParam]);

  const summary_formatted = summary.split("\n").map((line) => {
    const [cve_id, summary] = line.split(": ");
    return { cve_id, summary };
  });
  const optionsCve = summary_formatted.map((item) => item.cve_id).filter(n => n);

  return (
    <Box m="25px">
      {/* Your component JSX here */}

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Veracode CVE Summary" />
      </Box>
      <Dropdown
        setState={setCve}
        state={cve}
        options={optionsCve}
        title="CVE ID" />
      <MUIDataTable
        data={summary_formatted}
        columns={columns}
        options={options}
        className="custom-table"
      />
    </Box>
  );
};

export default VeracodeCVESummary;
