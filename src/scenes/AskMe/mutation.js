import { HttpStatusCodes, callExpressServerEndpointSync, getToken } from "../../utils";

export const chatLlmResponse = async ({ summaryAdd, checkbox, askmeSettings, preset = null, file = null }) => {

  try {
    const llm_selection = !checkbox ? "kc" : "dev";

    let headers = {
      "jwt-token": await getToken(),
    };

    const end_point = "orchestrator/gateway";
    let response ;

    if (file) {
      // Use multipart form data when file is present
      const formData = new FormData();
      formData.append('query', summaryAdd);
      formData.append('detail', llm_selection);
      formData.append('options', JSON.stringify(askmeSettings));
      if (preset) formData.append('preset', preset);
      formData.append('file', file);
      headers['Content-Type'] = "multipart/form-data";
      response = await callExpressServerEndpointSync("POST", end_point, formData, headers);
    } else {
      // Use JSON when no file is present
      headers["Content-Type"] = "application/json";
      const input = JSON.stringify({
        query: summaryAdd,
        detail: llm_selection,
        options: askmeSettings,
        preset: preset,
      });

      response = await callExpressServerEndpointSync("POST", end_point, input, headers);
    }

    if (response.status !== HttpStatusCodes.OK) {
      throw new Error(`Something went wrong with error code ${response.status}, Refresh the page and try again`);
    }

    return {
      data: response.data,
      correlationId: response.headers['x-correlation-id'],
    };
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const executeChatCommand = async ({ commandAction, commandParams }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "jwt-token": await getToken(),
    };
    const end_point = "orchestrator/executeCommand";
    const input = JSON.stringify({
      command_name: commandAction,
      payload: commandParams,
    });

    const response = await callExpressServerEndpointSync("POST", end_point, input, headers);
    
    return {
      data: response.data,
      correlationId: response.headers['x-correlation-id'],
    };
  } catch (error) {
    throw new Error(error.response);
  }
};

export const addPredictionScore = async (payload) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "jwt-token": await getToken(),
    };
    const end_point = "orchestrator/predictionScore";

    const response = await callExpressServerEndpointSync("POST", end_point, payload, headers);
    
    return {
      data: response.data,
      correlationId: response.headers['x-correlation-id'],
      status: response.status,
    };
  } catch (error) {
    throw new Error(error.response);
  }
};
