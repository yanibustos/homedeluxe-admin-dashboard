import axios from "axios";

const axiosConfig = {
  method: "GET",
  baseURL: import.meta.env.VITE_API_URL,
  headers: {},
};

async function fetchApi(apiParams) {
  try {
    if (apiParams.accessToken) {
      axiosConfig.headers.Authorization = "Bearer " + apiParams.accessToken;
    }

    const result = await axios({
      ...axiosConfig,
      ...apiParams,
    });

    return result.data;
  } catch (error) {
    // Handle multiple error cases
    let errorMessage = "Something went wrong";

    if (error.response) {
      // If  API returns a 404 error or similar
      errorMessage =
        error.response.data.msg ||
        error.response.data.message ||
        error.response.data.err ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      // If no response is given
      errorMessage = "No response from server. Please try again.";
    } else {
      // If other error happens while trying to make the request
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}

export default fetchApi;
