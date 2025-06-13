import {React, useState, useMemo} from "react";
import { IconButton, InputAdornment, Link, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { handleOrderSort, compareDates, compareLeadTime } from "../../../utils";
import * as S from './styles.js';
import { getStyles, getRowStyle } from './styles.js';


const ExpandableRow = ({ rowMeta, input, theme }) => {
    const stories = input[rowMeta.dataIndex].issues.map(({ user, ...data }) => data);

    const [searchQuery, setSearchQuery] = useState("");
    const [orderCreatedDate, setOrderCreatedDate] = useState('normal');
    const [orderResolvedDate, setOrderResolvedDate] = useState('normal');
    const [orderLeadTime, setOrderLeadTime] = useState('normal');
    const [orderByCreatedDate, setOrderByCreatedDate] = useState('');
    const [orderByResolvedDate, setOrderByResolvedDate] = useState('');
    const [orderByLeadTime, setOrderByLeadTime] = useState('');
    const colBorder = getStyles(theme.palette.mode);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const createSortHandler = (property) => (event) => {
        const newCreatedDate = handleOrderSort(property, orderByCreatedDate, orderCreatedDate);
        setOrderCreatedDate(newCreatedDate);
        setOrderByCreatedDate(property);
        
        const newResolvedDate = handleOrderSort(property, orderByResolvedDate, orderResolvedDate);
        setOrderResolvedDate(newResolvedDate);
        setOrderByResolvedDate(property);
        
        const newLeadTime = handleOrderSort(property, orderByLeadTime, orderLeadTime);
        setOrderLeadTime(newLeadTime);
        setOrderByLeadTime(property);
    };

    const sortedStories = useMemo(() => {
        let sorted = [...stories];

        sorted.sort((a, b) => {
            let comparison = 0;
            if (orderByCreatedDate === 'Created Date' && orderCreatedDate !== 'normal') {
                comparison = compareDates(a.dateCreated, b.dateCreated, orderCreatedDate);
            }
            if (orderByResolvedDate === 'Resolved Date' && orderResolvedDate !== 'normal' && comparison === 0) {
                comparison = compareDates(a.resolutionDate, b.resolutionDate, orderResolvedDate);
            }
            if (orderByLeadTime === 'Lead Time' && orderLeadTime !== 'normal' && comparison === 0) {
                comparison = compareLeadTime(a.leadDays, b.leadDays, orderLeadTime);
            }
            return comparison;
        });

        if (searchQuery) {
            sorted = sorted.filter(story => {
                return Object.values(story).some(val =>
                    String(val).trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
                );
            });
        }
        return sorted;
    }, [stories, searchQuery, orderByCreatedDate, orderCreatedDate, orderByResolvedDate, orderResolvedDate, orderByLeadTime, orderLeadTime]);

    return (
        <tr>
          <td colSpan={24}>
            <S.SearchInput
              autoFocus
              element={TextField}
              placeholder="Search"
              type="text"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={handleSearch}
              value={searchQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <IconButton onClick={ () => { setSearchQuery("")} }>
                    <CloseOutlinedIcon/>
                  </IconButton>
                )
              }}
            />
            <S.ExpandableTable>
              <thead>
                <tr>
                  <th style={colBorder}> Issue Number </th>
                  <th style={colBorder}> Issue Type </th>
                  <th style={colBorder}> Description </th>
                  <th style={colBorder}> Status </th>
                  <th style={colBorder}> Story Point </th>
                  <th style={colBorder}> Reporter Name </th>
                  <th style={colBorder}>
                    <S.TableSort
                      active={ orderByCreatedDate === 'Created Date' && orderCreatedDate !== 'normal' }
                      direction={ orderCreatedDate === 'normal' ? 'asc' : orderCreatedDate }
                      onClick={ createSortHandler('Created Date') }
                    >
                      Created Date
                    </S.TableSort>
                  </th>
                  <th style={colBorder}>
                    <S.TableSort
                      active={ orderByResolvedDate === 'Resolved Date' && orderResolvedDate !== 'normal' }
                      direction={ orderResolvedDate === 'normal' ? 'asc' : orderResolvedDate }
                      onClick={ createSortHandler('Resolved Date') }
                    >
                      Resolved Date
                    </S.TableSort>
                  </th>
                
                  <th style={colBorder}>
                    <S.TableSort
                      active={ orderByLeadTime === 'Lead Time' && orderLeadTime !== 'normal' }
                      direction={ orderLeadTime === 'normal' ? 'asc' : orderLeadTime }
                      onClick={ createSortHandler('Lead Time') }
                    >
                      Lead Time <br /> (Issue Created - Issue Closed) 
                    </S.TableSort>
                  </th>
                  <th style={colBorder}>
                    Cycle Time <br /> (Issue In Progress - Issue Closed)
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStories.map((story, index) => {
                  const rowStyle = getRowStyle(theme.palette.mode, index);

                    return (
                      <tr key={index} style={rowStyle}>
                        <td>
                          <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${story.storyNumber}`}>
                            {story.storyNumber}
                          </Link>
                        </td>
                        <td> {story.issuetype} </td>
                        <td> {story.description} </td>
                        <td> {story.status} </td>
                        <td> {story.storypoint} </td>
                        <td> {story.reporterName} </td>
                        <td> {story.dateCreated} </td>
                        <td> {story.resolutionDate} </td>
                     
                        <td> {story.leadDays} </td>
                        <td> {story.cycleTime} </td>
                      </tr>
                    )
                })}
              </tbody>
            </S.ExpandableTable>
          </td>
        </tr>
        );
    };

export default ExpandableRow;