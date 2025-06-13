import { Alert, AlertTitle, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const networkConnectionError = {
  title: "Network Connection Error",
  message: "Please reconnect to the ACI network or VPN to resume."
}

const fetchData = async () => {
  try {
    const response = await axios.get(
      "/health"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const NetworkConnection = () => {
  const [isNetworkError, setIsNetworkError] = useState(false);

  useEffect(() => {
    let isFetching = false;

    const fetchHealth = async () => {
      try {
        await fetchData();
        if (isNetworkError) {
          setIsNetworkError(false);
        }
      } catch (error) {
        console.error(error);
        if (error.code === "ERR_NETWORK") {
          setIsNetworkError(true);
        }
      } finally {
        isFetching = false;
      }
    };

    const interval = setInterval(() => {
      if (!isFetching) {
        isFetching = true;
        fetchHealth();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isNetworkError]);

  return (
    <Snackbar open={isNetworkError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert
        severity="error"
        variant="filled"
        sx={{
          width: '100%'
        }}
      >
        <AlertTitle>{networkConnectionError.title}</AlertTitle>
        {networkConnectionError.message}
      </Alert>
    </Snackbar>
  );
}

export default NetworkConnection;
