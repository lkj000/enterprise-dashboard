import styled from 'styled-components';
import { TableSortLabel } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';

export const SearchInput = styled(DebounceInput)`
    width: 400px;
    margin: 20px;
`;

export const ExpandableTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    thead {
        background-color: #e0e0e0;
        color: black;

        tr th:last-child, tr th:nth-last-child(2) {
            width: 10%;
        }
    }

    tbody {
        tr td:nth-child(1), tr td:nth-child(2), tr td:nth-child(4), tr td:nth-child(5), tr td:nth-child(6) {
            text-align: center;
        }
    }
`;

export const TableSort = styled(TableSortLabel)`
    color: black !important;
    & .MuiTableSortLabel-iconDirectionDesc, & .MuiTableSortLabel-iconDirectionAsc {
        color: black !important;
    }
`;

export const getStyles = (mode) => ({
    borderLeft: mode === "dark" ? "2px solid #000" : "2px solid #fff",
});

export const getRowStyle = (mode, index) => ({
    backgroundColor: mode === "dark" ? (index % 2 === 0 ? '#333333' : '#444444') 
        : (index % 2 === 0 ? '#ffffff' : '#f5f5f5')
});