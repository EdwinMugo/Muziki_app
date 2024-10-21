import axios from "axios";

// spoify client credentials
const Client_Id = "b043c6ada9ef402696775dbcc9c52b1d";
const Client_Secret = "30c4f801afac4042a446a23729ed8efb";

// Base URL for Spotify API
const API_URL = "https://api.spotify.com/v1";

// function fetches the access token from spotify using the Client Credential flow
export const fetchAccessToken = async () => {
  //encode the access token in base64
  const encodedCredentials = btoa(`${Client_Id}:${Client_Secret}`);

  //  Make the Post request to spotify API endpoint
  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data.access_token;
  } catch (e) {
    console.error("Error fetching access token:", e);
    throw new e("failed to fetch access token");
  }
};
