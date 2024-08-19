require('dotenv').config();

const axios = require("axios");

async function fetchFlag() {
  const url = "https://flag-gilt.vercel.app/api/challenge";

  let data1 = {};
  let nextCursor = ""

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

// console.log("TOKEN:", process.env.TOKEN)

do {
    try {
      const response = await axios.post(url, data1, { headers });

      console.log("STARTING NEXT CURSOR:", response.data.nextCursor);

      data1 = {
        cursor: response.data.nextCursor,
      };
      nextCursor = response.data.nextCursor

      console.log("Response data: ", response.data)
      
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  } while (nextCursor);
}

fetchFlag();