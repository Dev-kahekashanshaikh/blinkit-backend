import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
//we are using OpenRouter API to access OpenAI's GPT-4 model. The baseURL is set to the OpenRouter API endpoint, and the apiKey is retrieved from the environment variables.
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const askAI = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: `
You are a product search assistant for an e-commerce application.

Analyze the user's message and extract product search information.

Return ONLY valid JSON.

Use exactly this structure:

{
  "reply": "short response to the user",
  "searchText": null,
  "maxPrice": null,
  "minPrice": null,
  "category": null,
  "minRating": null
}

Rules:

1. searchText:
   Extract the actual product/item/brand the user is looking for.

   Examples:
   "show me laptops" -> "laptop"
   "I need shoes" -> "shoes"
   "find Nike products" -> "Nike"
   "show me a red dress" -> "red dress"

   If the user only asks for products without specifying an item,
   return null.

2. category:
   Extract the category if the user mentions one.

3. maxPrice:
   Extract maximum price.

4. minPrice:
   Extract minimum price.

5. minRating:
   Extract minimum rating.

6. If something is not mentioned, return null.

7. Prices and ratings must be numbers.

8. Do not invent information.

9. Keep the reply short.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    
    });

    //shows the older/standard Chat Completions API, which remains supported


    // const content = response.choices[0].message.content;
//response.output_text
    // return JSON.parse(content);

    // to solve the issue of the AI returning non-JSON content, we extract the JSON part from the response and parse it. This ensures that we only get valid JSON data.
const content = response.choices?.[0]?.message?.content;

console.log("Raw AI response:", content);

if (!content || typeof content !== "string") {
  throw new Error("AI returned an empty response");
}

const start = content.indexOf("{");
const end = content.lastIndexOf("}");

if (start === -1 || end === -1 || end < start) {
  throw new Error("AI did not return valid JSON: " + content);
}

const result = JSON.parse(content.slice(start, end + 1));

return result;


  } catch (error) {
    console.log("OpenRouter Error:", error);
    throw error;
  }
};

//here we integrated the openai api with our backend to analyze user messages and extract product search information. The extracted information is then used to query the MongoDB database for relevant products.


//  a user authentication service with five reusable helper or business functions:
// - generateOTP() — creates a six-digit email verification code.
// - hashOTP() — creates a SHA-256 hash of the OTP.
// - signupUser() — creates a user account and prepares the OTP for delivery.
// - verifyEmailOtp() — checks the OTP and marks the email as verified.
// - loginUser() — checks the email, password, and verification status.
// - forgotPasswordUser() — generates a temporary password-reset token.
// - resetPasswordUser() — validates that token, saves a new password hash, and invalidates the token.