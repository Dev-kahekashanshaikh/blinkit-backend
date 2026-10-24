import { getChatResponse } from "../services/chatService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await getChatResponse(message);

    return res.status(200).json({
      success: true,
      reply: result.reply,
      products: result.products,
    });

  } catch (error) {
    console.log("Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};