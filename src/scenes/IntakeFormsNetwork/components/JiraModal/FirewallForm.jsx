import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";

import "../../../global/custom-table.css";
import { Box, Button, TextField } from '@mui/material';

const FirewallForm = ({setRulesData}) => {
  const [data, setData] = useState([    
    { rules: 1, type: "", action: "", sourceHost: "", destinationHost: "" },
  ]);

  useEffect(() => {
    setRulesData(data);
  }, [data, setRulesData]);

  const handleAddRow = () => {
    const newRow = { rules: data.length + 1, type: "", action: "", sourceHost: "", destinationHost: "" };
    setData([...data, newRow]);
  };
  const handleEdit = (value, index, column) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [column]: value };
    setData(updatedData);
  };

  const handleDeleteRow = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const columns = [
    {
      name: "rules",
      label: "Rules",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "middle",
            textAlign: "left",
            paddingTop: "16px",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "normal",
            textAlign: "left",
            verticalAlign: "top",
          },
        }),
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal", textAlign: "left" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            value={value}
            onChange={(e) => handleEdit(e.target.value, tableMeta.rowIndex, "type")}
          />
        ),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal", textAlign: "left" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            value={value}
            onChange={(e) => handleEdit(e.target.value, tableMeta.rowIndex, "action")}
          />
        ),
      },
    },
    {
      name: "sourceHost",
      label: "Source Host",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            value={value}
            onChange={(e) => handleEdit(e.target.value, tableMeta.rowIndex, "sourceHost")}
          />
        ),
      },
    },
    {
      name: "destinationHost",
      label: "Destination Host",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            textAlign: "left",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <TextField
            value={value}
            onChange={(e) => handleEdit(e.target.value, tableMeta.rowIndex, "destinationHost")}
          />
        ),
      },
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "middle",
            textAlign: "center",
          },
        }),
        setCellHeaderProps: () => ({
          style: { whiteSpace: "normal", textAlign: "center" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteRow(tableMeta.rowIndex)}
          >
            Delete
          </Button>
        ),
      },
    },
  ];

  const options = {
    selectableRowsHeader: false,
    selectableRows: "none",
    fixedHeader: true,
    responsive: "standard",
    filter: false,
    download: false,
    sort: false,
    search: false,
    print: false,
    viewColumns: false,
    pagination: false,
  };

  return (
    <>
    <MUIDataTable
        title="Firewall Request Form"
        data={data}
        columns={columns}
        options={options}
        className="custom-table-perform"
      />
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" onClick={handleAddRow}>
          Add Row
        </Button>
      </Box>
    </>
  );
};

export default FirewallForm;