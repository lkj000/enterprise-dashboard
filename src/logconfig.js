import axios from 'axios';
import { callExpressServerEndpoint } from "./utils";

export const captureData = async (Path) => {
    try {
      const Timestamp = new Date().toISOString();

      const ipResponse = await axios.get('https://api.ipify.org?format=json')
      const IPAddress = ipResponse.data.ip || '';

      const logData = { Timestamp, IPAddress, Path };
      callExpressServerEndpoint("POST", "log", logData, () => {});
    } catch (error) {
      console.error('Error capturing data:', error);
    }
};
