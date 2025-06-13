import {React, useState, useMemo} from "react";
import { IconButton, InputAdornment, Link, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { handleOrderSort, compareHours } from "../../../../utils";
import * as S from './styles.js';
import { getStyles, getRowStyle } from './styles.js';


const ExpandableRow = ({ rowMeta, input, theme }) => {
  const stories = input[rowMeta.dataIndex].issues.map(({ user, ...data }) => data);

  const [ searchQuery, setSearchQuery ] = useState("");
  const [ orderEstimateHrs, setOrderEstimateHrs ] = useState('normal');
  const [ orderLoggingHrs, setOrderLoggingHrs ] = useState('normal');
  const [ orderRemainingHrs, setOrderRemainingHrs ] = useState('normal');
  const [ orderByEstimateHrs, setOrderByEstimateHrs ] = useState('');
  const [ orderByLoggingHrs, setOrderByLoggingHrs ] = useState('');
  const [ orderByRemainingHrs, setOrderByRemainingHrs ] = useState('');
  const colBorder = getStyles(theme.palette.mode);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const createSortHandler = (property) => (event) => {
    const newEstimateHrs = handleOrderSort(property, orderByEstimateHrs, orderEstimateHrs);
    setOrderEstimateHrs(newEstimateHrs);
    setOrderByEstimateHrs(property);
        
    const newLoggingHrs = handleOrderSort(property, orderByLoggingHrs, orderLoggingHrs);
    setOrderLoggingHrs(newLoggingHrs);
    setOrderByLoggingHrs(property);
        
    const newRemainHrs = handleOrderSort(property, orderByRemainingHrs, orderRemainingHrs);
    setOrderRemainingHrs(newRemainHrs);
    setOrderByRemainingHrs(property);
  };

  const sortedStories = useMemo(() => {
    let sorted = [...stories];

    sorted.sort((a, b) => {
      let comparison = 0;
      if (orderByEstimateHrs === 'Estimated Hours' && orderEstimateHrs !== 'normal') {
        comparison = compareHours(a.originalEstimate, b.originalEstimate, orderEstimateHrs);
      }
      if (orderByLoggingHrs === 'Logged Hours' && orderLoggingHrs !== 'normal' && comparison === 0) {
        comparison = compareHours(a.timeSpent, b.timeSpent, orderLoggingHrs);
      }
      if (orderByRemainingHrs === 'Remaining Hours' && orderRemainingHrs !== 'normal' && comparison === 0) {
        comparison = compareHours(a.remainingEstimate, b.remainingEstimate, orderRemainingHrs);
      }
      return comparison;
    });

    if (searchQuery) {
      sorted = sorted.filter(story => {
        return Object.values(story).some(val =>
          String(val).trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
      });
    };

    return sorted;
  }, [stories, searchQuery, orderByEstimateHrs, orderEstimateHrs, orderByLoggingHrs, orderLoggingHrs, orderByRemainingHrs, orderRemainingHrs]);

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
            <tr style={{ ...colBorder, textAlign: 'center' }}>
              <th> Issue Number </th>
              <th> Issue Type </th>
              <th> Component </th>
              <th> Status </th>
              <th>
                <S.TableSort
                  active={ orderByEstimateHrs === 'Estimated Hours' && orderEstimateHrs !== 'normal' }
                  direction={ orderEstimateHrs === 'normal' ? 'asc' : orderEstimateHrs }
                  onClick={ createSortHandler('Estimated Hours') }
                >
                  Estimated Hours
                </S.TableSort>
              </th>
              <th>
                <S.TableSort
                  active={ orderByLoggingHrs === 'Logged Hours' && orderLoggingHrs !== 'normal' }
                  direction={ orderLoggingHrs === 'normal' ? 'asc' : orderLoggingHrs }
                  onClick={ createSortHandler('Logged Hours') }
                >
                  Logged Hours
                </S.TableSort>
              </th>
              <th>
                <S.TableSort
                  active={ orderByRemainingHrs === 'Remaining Hours' && orderRemainingHrs !== 'normal' }
                  direction={ orderRemainingHrs === 'normal' ? 'asc' : orderRemainingHrs }
                  onClick={ createSortHandler('Remaining Hours') }
                >
                  Remaining Hours
                </S.TableSort>
              </th>
              <th> PRs </th>
              <th> Total PRs</th>
              <th> Commits </th>
              <th> Additions </th>
              <th> Deletions </th>
            </tr>
          </thead>
          <tbody>
            {sortedStories.map((story, index) => {
              const rowStyle = getRowStyle(theme.palette.mode, index);

              return (
                <tr key={index} style={{ ...rowStyle, textAlign: 'center' }}>
                  <td>
                    <Link underline="hover" target="_blank" rel="noopener noreferrer" href={`https://jira.safeway.com/browse/${story.key}`}>
                      {story.key}
                    </Link>
                  </td>
                  <td> {story.issue_type} </td>
                  <td> {story.components.length > 0 && story.components.join(", ")} </td>
                  <td> {story.status} </td>
                  <td> {story.originalEstimate} </td>
                  <td> {story.timeSpent} </td>
                  <td> {story.remainingEstimate} </td>
                  <td> {story.pr_html_urls !== null && 
                    story.pr_html_urls.map((url, idx) => {
                      const linkText = url.split("github.albertsons.com/albertsons/")[1];
                      return (
                        <Link key={idx} underline="hover" target="_blank" rel="noopener noreferrer" href={url} style={{ display: 'block' }}>
                          {linkText}
                        </Link>
                    )})}
                  </td>
                  <td> {story.total_story_prs} </td>
                  <td> {story.total_commits_in_pr} </td>
                  <td> {story.total_additions_in_pr} </td>
                  <td> {story.total_deletions_in_pr} </td>
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
