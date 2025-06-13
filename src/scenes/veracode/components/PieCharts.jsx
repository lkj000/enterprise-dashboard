import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import SinglePie from './SinglePie';

const PieCharts = ({ veracodeData, states }) => {
  const theme = useTheme();
  //VERACODE TABLE-BODY (SIZE)
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  let piechart4Size = 3;
  if (isLargeScreen) {
    piechart4Size = 2.4;
  }

  const handleDataPie = (data) => {
    //center value
    if (typeof (data) === "string") {
      if (data === "All") {
        states.setSelectedPortfolio("All");
        states.setSelectedVeracodeConclusion("All");
      } else if (data === "COG") {
        states.setSelectedPortfolio("COG (Jim Saber)");
        states.setSelectedVeracodeConclusion("All");
      } else if (data === "Digital") {
        states.setSelectedPortfolio("Digital (Ramiya Iyer)");
        states.setSelectedVeracodeConclusion("All");
      } else if (data === "Retail") {
        states.setSelectedPortfolio("Retail & Supply Chain (Maria Latushkin)");
        states.setSelectedVeracodeConclusion("All");
      } else if (data === "Platform") {
        states.setSelectedPortfolio(["Not Available", "Information Security (Aaron Hughes)"]);
        states.setSelectedVeracodeConclusion("All");
      }
    }
    //Pie chart-values
    else if (typeof (data) === "object") {
      if (data.filterName === "All") {
        states.setSelectedPortfolio("All");
        if (data.id === "Total Veracode Success") {
          states.setSelectedVeracodeConclusion("Success");
        } else if (data.id === "Total Veracode Failure") {
          states.setSelectedVeracodeConclusion("Failure");
        } else if (data.id === "Total Veracode CI-Failed") {
          states.setSelectedVeracodeConclusion("CI-FAILED");
        } else if (data.id === "Total Veracode - Not Present") {
          states.setSelectedVeracodeConclusion("Not present");
        } else if (data.id === "Total Veracode - Not Applicable") {
          states.setSelectedVeracodeConclusion("Not Applicable");
        } else if (data.id === "Total Veracode - Profile Missing") {
          states.setSelectedVeracodeConclusion("Profile Missing");
        }
      } else {
        if (data.filterName === "COG") {
          states.setSelectedPortfolio("COG (Jim Saber)");
        } else if (data.filterName === "Digital") {
          states.setSelectedPortfolio("Digital (Ramiya Iyer)");
        } else if (data.filterName === "Retail") {
          states.setSelectedPortfolio("Retail & Supply Chain (Maria Latushkin)");
        } else if (data.filterName === "Platform") {
          states.setSelectedPortfolio(["Not Available", "Information Security (Aaron Hughes)"]);
        }
        //Conclusion
        if (data.id === "Veracode Success")
          states.setSelectedVeracodeConclusion("Success");
        else if (data.id === "Veracode Failure")
          states.setSelectedVeracodeConclusion("Failure");
        else if (data.id === "Veracode CI-Failed")
          states.setSelectedVeracodeConclusion("CI-FAILED");
        else if (data.id === "Veracode - Not Present")
          states.setSelectedVeracodeConclusion("Not present");
        else if (data.id === "Veracode - Not Applicable")
          states.setSelectedVeracodeConclusion("Not Applicable");
        else if (data.id === "Veracode - Profile Missing")
          states.setSelectedVeracodeConclusion("Profile Missing");
      }
    }
  }
  // FILTER DATA (BASED ON DEPLOYMENT STRATEGY)
  let data = [];

  data = veracodeData.map(item => {
    return {
      ...item,
      VeracodeConclusion: item.VeracodeConclusion || item.VeracodeConclusion === " " ? item.VeracodeConclusion : "Not present"
    }
  })

  // PORTFOLIO
  let cog_portfolio = [], digital_portfolio = [], retail_portfolio = [], platform_portfolio = [], total_Common = 0;  //initialize

  for (let i = 0; i < data.length; i++) {
    if (data[i].Portfolio === "COG (Jim Saber)") {
      cog_portfolio.push(data[i]);
    }
    else if (data[i].Portfolio === "Digital (Ramiya Iyer)") {
      digital_portfolio.push(data[i]);
    }
    else if (data[i].Portfolio === "Retail & Supply Chain (Maria Latushkin)") {
      retail_portfolio.push(data[i]);
    }
    else {
      platform_portfolio.push(data[i]);
    }
  }
  // Platform
  let platform_success = 0, platform_failure = 0, total_platform = 0, platform_ciFailed = 0, platform_notApplicable = 0, platform_notPresent = 0, platform_profilemissing = 0;

  for (let i = 0; i < platform_portfolio.length; i++) {
    // Veracode - Success/ Failure
    if (platform_portfolio[i].VeracodeConclusion === "success" || platform_portfolio[i].VeracodeConclusion === "Success")
      platform_success++;
    else if (platform_portfolio[i].VeracodeConclusion === "failure" || platform_portfolio[i].VeracodeConclusion === "Failure")
      platform_failure++;
    else if (platform_portfolio[i].VeracodeConclusion === "CI-FAILED" || platform_portfolio[i].VeracodeConclusion === "startup_failure" || platform_portfolio[i].VeracodeConclusion === "cancelled")
      platform_ciFailed++;
    else if (platform_portfolio[i].VeracodeConclusion === "Not Applicable")
      platform_notApplicable++;
    else if (platform_portfolio[i].VeracodeConclusion === "Profile Missing")
      platform_profilemissing++;
    else
      platform_notPresent++;
  }
  let platformPortfolio = [
    { id: "Veracode Success", value: platform_success, label: `Veracode Success (${platform_success})` },
    { id: "Veracode Failure", value: platform_failure, label: `Veracode Failure (${platform_failure})` },
    { id: "Veracode CI-Failed", value: platform_ciFailed, label: `Veracode CI-Failed (${platform_ciFailed})` },
    { id: "Veracode - Not Present", value: platform_notPresent, label: `Veracode- Not Present (${platform_notPresent})` },
    { id: "Veracode - Not Applicable", value: platform_notApplicable, label: `Veracode- Not Applicable (${platform_notApplicable})` },
    { id: "Veracode - Profile Missing", value: platform_profilemissing, label: `Veracode- Profile Missing (${platform_profilemissing})` }
  ]
  total_platform = platform_success + platform_failure + platform_ciFailed + platform_notApplicable + platform_notPresent + platform_profilemissing;

  // COG PORTFOLIO
  let cog_success = 0, cog_failure = 0, total_COGPortfolio = 0, cog_ciFailed = 0, cog_notApplicable = 0, cog_notPresent = 0, cog_profilemissing = 0;

  for (let i = 0; i < cog_portfolio.length; i++) {
    // Veracode - Success/ Failure
    if (cog_portfolio[i].VeracodeConclusion === "success" || cog_portfolio[i].VeracodeConclusion === "Success")
      cog_success++;
    else if (cog_portfolio[i].VeracodeConclusion === "failure" || cog_portfolio[i].VeracodeConclusion === "Failure")
      cog_failure++;
    else if (cog_portfolio[i].VeracodeConclusion === "CI-FAILED" || cog_portfolio[i].VeracodeConclusion === "startup_failure" || cog_portfolio[i].VeracodeConclusion === "cancelled")
      cog_ciFailed++;
    else if (cog_portfolio[i].VeracodeConclusion === "Not Applicable")
      cog_notApplicable++;
    else if (cog_portfolio[i].VeracodeConclusion === "Profile Missing")
      cog_profilemissing++;
    else
      cog_notPresent++;
  }
  let COGPortfolio = [
    { id: "Veracode Success", value: cog_success, label: `Veracode Success (${cog_success})` },
    { id: "Veracode Failure", value: cog_failure, label: `Veracode Failure (${cog_failure})` },
    { id: "Veracode CI-Failed", value: cog_ciFailed, label: `Veracode CI-Failed (${cog_ciFailed})` },
    { id: "Veracode - Not Present", value: cog_notPresent, label: `Veracode- Not Present (${cog_notPresent})` },
    { id: "Veracode - Not Applicable", value: cog_notApplicable, label: `Veracode- Not Applicable (${cog_notApplicable})` },
    { id: "Veracode - Profile Missing", value: cog_profilemissing, label: `Veracode- Profile Missing (${cog_profilemissing})` }
  ]
  total_COGPortfolio = cog_success + cog_failure + cog_ciFailed + cog_notPresent + cog_notApplicable + cog_profilemissing;

  // DIGITAL PORTFOLIO
  let digital_notPresent = 0, digital_success = 0, digital_failure = 0, total_DigitalPortfolio = 0, digital_ciFailed = 0, digital_notApplicable = 0, digital_profilemissing = 0;

  for (let i = 0; i < digital_portfolio.length; i++) {
    // Veracode - Success/ Failure
    if (digital_portfolio[i].VeracodeConclusion === "success" || digital_portfolio[i].VeracodeConclusion === "Success")
      digital_success++;
    else if (digital_portfolio[i].VeracodeConclusion === "failure" || digital_portfolio[i].VeracodeConclusion === "Failure")
      digital_failure++;
    else if (digital_portfolio[i].VeracodeConclusion === "CI-FAILED" || digital_portfolio[i].VeracodeConclusion === "startup_failure" || digital_portfolio[i].VeracodeConclusion === "cancelled")
      digital_ciFailed++;
    else if (digital_portfolio[i].VeracodeConclusion === "Not Applicable")
      digital_notApplicable++;
    else if (digital_portfolio[i].VeracodeConclusion === "Profile Missing")
      digital_profilemissing++;
    else
      digital_notPresent++;
  }
  let DIGITALPortfolio = [
    { id: "Veracode Success", value: digital_success, label: `Veracode Success (${digital_success})` },
    { id: "Veracode Failure", value: digital_failure, label: `Veracode Failure (${digital_failure})` },
    { id: "Veracode CI-Failed", value: digital_ciFailed, label: `Veracode CI-Failed (${digital_ciFailed})` },
    { id: "Veracode - Not Present", value: digital_notPresent, label: `Veracode- Not Present (${digital_notPresent})` },
    { id: "Veracode - Not Applicable", value: digital_notApplicable, label: `Veracode- Not Applicable (${digital_notApplicable})` },
    { id: "Veracode - Profile Missing", value: digital_profilemissing, label: `Veracode- Profile Missing (${digital_profilemissing})` }
  ]
  total_DigitalPortfolio = digital_success + digital_failure + digital_ciFailed + digital_notPresent + digital_notApplicable + digital_profilemissing;

  // RETAIL PORTFOLIO
  let retail_notPresent = 0, retail_success = 0, retail_failure = 0, total_RetailPortfolio = 0, retail_ciFailed = 0, retail_notApplicable = 0, retail_profilemissing = 0;

  for (let i = 0; i < retail_portfolio.length; i++) {
    // Veracode - Success/ Failure
    if (retail_portfolio[i].VeracodeConclusion === "success" || retail_portfolio[i].VeracodeConclusion === "Success")
      retail_success++;
    else if (retail_portfolio[i].VeracodeConclusion === "failure" || retail_portfolio[i].VeracodeConclusion === "Failure")
      retail_failure++;
    else if (retail_portfolio[i].VeracodeConclusion === "CI-FAILED" || retail_portfolio[i].VeracodeConclusion === "startup_failure" || retail_portfolio[i].VeracodeConclusion === "cancelled")
      retail_ciFailed++;
    else if (retail_portfolio[i].VeracodeConclusion === "Not Applicable")
      retail_notApplicable++;
    else if (retail_portfolio[i].VeracodeConclusion === "Profile Missing")
      retail_profilemissing++;
    else
      retail_notPresent++;
  }
  let RETAILPortfolio = [
    { id: "Veracode Success", value: retail_success, label: `Veracode Success (${retail_success})` },
    { id: "Veracode Failure", value: retail_failure, label: `Veracode Failure (${retail_failure})` },
    { id: "Veracode CI-Failed", value: retail_ciFailed, label: `Veracode CI-Failed (${retail_ciFailed})` },
    { id: "Veracode - Not Present", value: retail_notPresent, label: `Veracode- Not Present (${retail_notPresent})` },
    { id: "Veracode - Not Applicable", value: retail_notApplicable, label: `Veracode- Not Applicable (${retail_notApplicable})` },
    { id: "Veracode - Profile Missing", value: retail_profilemissing, label: `Veracode- Profile Missing (${retail_profilemissing})` }
  ]
  total_RetailPortfolio = retail_success + retail_failure + retail_ciFailed + retail_notPresent + retail_notApplicable + retail_profilemissing;

  // REPO & VERACODE COUNT
  let veracodeNotPresentCount = 0, successCount = 0, failureCount = 0, ciFailedCount = 0, notApplicableCount = 0, profileMissingCount = 0;

  veracodeNotPresentCount = cog_notPresent + digital_notPresent + retail_notPresent + platform_notPresent; //Veracode Not present (Total-P)
  successCount = cog_success + digital_success + retail_success + platform_success; //Veracode Success (Total-P)
  failureCount = cog_failure + digital_failure + retail_failure + platform_failure; //Veracode Failure (Total-P)
  ciFailedCount = cog_ciFailed + digital_ciFailed + retail_ciFailed + platform_ciFailed; //Veracode CI-Failed (Total-P)
  notApplicableCount = cog_notApplicable + digital_notApplicable + retail_notApplicable + platform_notApplicable; //Veracode Not Applicable (Total-P)
  profileMissingCount = cog_profilemissing + digital_profilemissing + retail_profilemissing + platform_profilemissing;

  // TOTAL (ALL PORTFOLIO'S)
  let Common = [
    { id: "Total Veracode Success", value: successCount, label: `Total Veracode Success (${successCount})` },
    { id: "Total Veracode Failure", value: failureCount, label: `Total Veracode Failure (${failureCount})` },
    { id: "Total Veracode CI-Failed", value: ciFailedCount, label: `Total Veracode CI-Failed (${ciFailedCount})` },
    { id: "Total Veracode - Not Present", value: veracodeNotPresentCount, label: `Total Veracode - Not Present (${veracodeNotPresentCount})` },
    { id: "Total Veracode - Not Applicable", value: notApplicableCount, label: `Total Veracode - Not Applicable (${notApplicableCount})` },
    { id: "Total Veracode - Profile Missing", value: profileMissingCount, label: `Total Veracode - Profile Missing (${profileMissingCount})` }
  ]
  total_Common = veracodeData.length;

  let chartsData = [
    { id: "All", title: "All Repositories", data: Common, total: total_Common, filterName: "All", legendX: -56 },
    { id: "COG", title: "COG (Jim Saber) Portfolio", data: COGPortfolio, total: total_COGPortfolio, filterName: "COG", legendX: -42 },
    { id: "Digital", title: "Digital (Ramiya Iyer) Portfolio", data: DIGITALPortfolio, total: total_DigitalPortfolio, filterName: "Digital", legendX: -42 },
    { id: "Retail", title: "Retail & Supply Chain (Maria Latushkin) Portfolio", data: RETAILPortfolio, total: total_RetailPortfolio, filterName: "Retail", legendX: -42 },
    { id: "Platform", title: "Other Portfolio", data: platformPortfolio, total: total_platform, filterName: "Platform", legendX: -42 },
  ]

  return (
    <Grid container>
      {/* Your pie charts go here */}
      {chartsData.map((data) => (
        <Grid item xs={12} sm={6} md={6} lg={piechart4Size} sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}>
          <SinglePie key={data.id}
            title={data.title}
            data={data.data}
            total={data.total}
            filterName={data.id}
            sendDataPie={handleDataPie}
            legendX={data.legendX}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PieCharts;