
import "dotenv/config";
import axios from "axios";

async function testBrevo() {
  try {
    const response = await axios.get(
      "https://api.brevo.com/v3/account",
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY?.trim(),
          accept: "application/json",
        },
      }
    );

    console.log("API key works!");
    console.log("Account email:", response.data.email);
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Error:", error.response?.data);
  }
}

testBrevo();
