import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import HistoryAccordion from './historyAccordion';

const History = ({ input }) => {
  const [dateValue, setDateValue] = useState(null);
  const [filterDate, setFilterDate] = useState(input);
  const [testDateField, setTestDateField] = useState(1);
  const [loading, setLoading] = useState(true);


  const handleDateValue = (date) => {
    if (date != null) {
      let day = (date.$D).toString();
      day = day.length > 1 ? day : '0' + day;
      let month = (1 + (date.$M)).toString();
      month = month.length > 1 ? month : '0' + month;
      let year = date.$y;
      let finalDate = month + '-' + day + '-' + year;

      //check date
      let check = finalDate ? input.filter((item) => item.date === finalDate) : input;
      setDateValue(finalDate);

      if (check.length >= 1) {
        setFilterDate(check); setTestDateField(1);
      }
      else {
        setFilterDate(input); setTestDateField(null);
      };

    } else {
      setDateValue(null);
      setFilterDate(input);
      setTestDateField(1);
    }
  }
  const handleReset = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false) }, 210);
    setDateValue(null);
    setTestDateField(1);
    setFilterDate(input);
  }
  useEffect(() => {
    const timerLoad = () => {
      setTimeout(() => { setLoading(false) }, 200)
    }
    timerLoad();
  }, []);



  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: '100%', height: '90vh' }}>
      <>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline'
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={dayjs(dateValue)}
              onChange={handleDateValue}
              format="MM-DD-YYYY"
              views={['year', 'month', 'day']}
              slotProps={{
                textField: {
                  color: 'secondary',
                  error: false
                }
              }}
              sx={{
                paddingBottom: '30px',
                width: '300px',
                paddingRight: '20px'
              }}
            />
          </LocalizationProvider>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{
              width: '40px'
            }}>
            RESET
          </Button>
        </Box>
        {testDateField !== null ? "" :
          <Typography fontSize="16px">
            No Artifact cleaned on this day
          </Typography>}
        <Box display="flex" alignItems="center" justifyContent="center">
          {loading && <CircularProgress color="inherit" style={{ marginTop: 120 }} />}
        </Box>
      </>
      {(!loading && testDateField !== null) ?
        <Box
          display="flex"
          flexDirection="column"
          height="70vh"
        >
          {filterDate.map((data, i) => {
            return (
              <HistoryAccordion key={i} data={data} i={i} />
            )
          })}
        </Box> : ""}
    </Box>
  );
};

export default History;