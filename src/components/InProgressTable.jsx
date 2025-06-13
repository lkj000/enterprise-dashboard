import {React} from "react";
import { Box, Link } from '@mui/material';
import MUIDataTable from "mui-datatables";
import '../scenes/global/custom-table.css';

const InProgressTable = ({input, tableStatusFilter, value}) => {


    var columns = [], options = {};


    //COLUMNS (Runners)
    if(value === "1"){

        columns = [
            { 
                name: "sNo", label: "S.No",
                options: {
                    filter: false,
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            },
            {
                name: "name",
                label: "Runners",
                options:{
                    filterType: 'textField',
                    customFilterListOptions: {render: v =>  `Runners: ${v}`}, 
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            },
            {
                name: "status",
                label: "Status",
                options:{
                    filter: true,
                    // customBodyRender: (value) => (
                    //     <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
                    // ),
                    filterType: 'dropdown',
                    filterList: tableStatusFilter, 
                    customFilterListOptions: {render: v =>  `Status: ${v}`},
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            }
        ];

        options = {
            fixedHeader: true,
            filter: true,
            responsive: 'vertical',
            tableBodyHeight: 'auto',
            rowsPerPage: 15,
            rowsPerPageOptions: [15,25,50,100],
            sort: true,
            sortOrder: {
                name: 'status',
                direction: 'asc'
            },
            downloadOptions: {
                filename: "Runner Status.csv",
                filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
                }
            }
        }

    }else if(value === "2"){

        columns = [
            { 
                name: "sNo", label: "S.No",
                options: {
                    filter: false,
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            },
            {
                name: "name",
                label: "Repository Name",
                options:{
                    filterType: 'textField',
                    customFilterListOptions: {render: v =>  `Repository Name: ${v}`}, 
                    customBodyRender: (value) => (
                        <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${value}`}>{value}</Link>
                    ),
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            },
            {
                name: "queue",
                label: "Queue Run ID",
                options:{
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        const repoName = tableMeta.rowData[1];
                        return <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://github.albertsons.com/${repoName}/actions/runs/${value}`}>{value}</Link>
                    },
                    filterType: 'textField',
                    customFilterListOptions: {render: v =>  `Queue RunID: ${v}`},
                    setCellProps: () => ({style: {whiteSpace:'nowrap', verticalAlign: 'top', textAlign: 'left'}}),
                    setCellHeaderProps: () => ({style: {whiteSpace:'nowrap'}})
                }
            }
        ];

        options = {
            fixedHeader: true,
            filter: true,
            responsive: 'vertical',
            tableBodyHeight: 'auto',
            rowsPerPage: 15,
            rowsPerPageOptions: [15,25,50,100],
            sort: true,
            // sortOrder: {
            //     name: 'status',
            //     direction: 'asc'
            // },
            downloadOptions: {
                filename: "Queue Status.csv",
                filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
                }
            }
        }

    }



    return (
    <Box m="25px">

        {/* TABLE */}
        <Box className="table" style={{
            width: '100%', 
            height: 'auto'
        }}>
            <MUIDataTable
                // title={<span className="custom-table-title"></span>}
                data={input}
                columns={columns}
                options={options}
                className="custom-table"
            />
        </Box>
    </Box>
    );
};

export default InProgressTable;