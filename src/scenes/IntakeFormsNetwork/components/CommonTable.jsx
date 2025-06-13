import React from "react";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { parseHtml } from "../utils";

import "../../global/custom-table.css";

const customBodyRender = (value) => {
  return parseHtml(value);

};

const CommonTable = ({ input }) => {

  const columns = [
    {
      name: "requestType",
      label: "Request Type",
      options: {
        customBodyRender,
        setCellProps: () => ({
          style: {
            whiteSpace: "normal",
            verticalAlign: "top",
            textAlign: "left",
            paddingTop: "16px",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "normal",
            textAlign: "left",
            minWidth: "105px",
            maxWidth: "105px",
          },
        }),
      },
    },
    {
      name: "scenario",
      label: "Scenario",
      options: {
        customBodyRender,
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
      },
    },
    {
      name: "featureStoryPersona",
      label: "Feature Story - Persona",
      options: {
        customBodyRender,
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
      },
    },
    {
      name: "opportunityStatement",
      label: "Opportunity Statement",
      options: {
        customBodyRender,
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
    print: false,
    viewColumns: false,
    pagination: false,
  };

  return (
    <Box
      className="table"
      marginTop={2}
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <MUIDataTable
        title="Request Categories/Examples"
        data={input}
        columns={columns}
        options={options}
        className="custom-table-perform"
      />
    </Box>
  );
};

export default React.memo(CommonTable);
