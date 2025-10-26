import TelegramBot from "node-telegram-bot-api";
import { storage } from "./storage";
import type { InsertProduct } from "@shared/schema";

interface UserSession {
  step: string;
  data: Partial<InsertProduct>;
}

const sessions = new Map<number, UserSession>();

export function initTelegramBot(token: string) {
  const bot = new TelegramBot(token, { polling: true });

  const categories = [
    "Subscriptions",
    "Combo Pack",
    "Adult",
    "Music",
    "Software",
    "Other Items"
  ];

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Welcome to SubFlix Product Manager! 🎬\n\nUse /newpost to add a new subscription product."
    );
  });

  bot.onText(/\/newpost/, (msg) => {
    const chatId = msg.chat.id;
    
    sessions.set(chatId, {
      step: "category",
      data: {}
    });

    const keyboard = {
      reply_markup: {
        inline_keyboard: categories.map(cat => [{
          text: cat,
          callback_data: `cat_${cat}`
        }])
      }
    };

    bot.sendMessage(
      chatId,
      "Please select a category for the product:",
      keyboard
    );
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.message!.chat.id;
    const messageId = query.message!.message_id;
    const data = query.data;

    if (!data) return;

    const session = sessions.get(chatId);
    if (!session) return;

    if (data.startsWith("cat_") && session.step === "category") {
      const category = data.replace("cat_", "");
      session.data.category = category;
      session.step = "name";

      await bot.editMessageText(
        `Category selected: ${category}`,
        {
          chat_id: chatId,
          message_id: messageId
        }
      );

      bot.sendMessage(chatId, "Please enter the product name:");
    }

    await bot.answerCallbackQuery(query.id);
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text || text.startsWith("/")) return;

    const session = sessions.get(chatId);
    if (!session) return;

    switch (session.step) {
      case "name":
        session.data.name = text;
        session.step = "description";
        bot.sendMessage(chatId, "Please enter the product description:");
        break;

      case "description":
        session.data.description = text;
        session.step = "image";
        bot.sendMessage(
          chatId,
          "Please send the product image URL (or send a photo):"
        );
        break;

      case "image":
        session.data.image = text;
        session.step = "price_1_month";
        bot.sendMessage(
          chatId,
          "Enter 1 month pricing (format: actualPrice_sellingPrice, e.g., 649_149):"
        );
        break;

      case "price_1_month":
        if (text.toLowerCase() === "skip") {
          session.data.price1MonthActual = 0;
          session.data.price1MonthSelling = 0;
          session.step = "price_3_month";
          bot.sendMessage(
            chatId,
            "Enter 3 months pricing (format: actualPrice_sellingPrice, e.g., 1947_399) or type 'skip':"
          );
          return;
        }
        const [actual1, selling1] = text.split("_").map(Number);
        if (isNaN(actual1) || isNaN(selling1)) {
          bot.sendMessage(
            chatId,
            "Invalid format. Please use format: actualPrice_sellingPrice (e.g., 649_149) or type 'skip'"
          );
          return;
        }
        session.data.price1MonthActual = actual1;
        session.data.price1MonthSelling = selling1;
        session.step = "price_3_month";
        bot.sendMessage(
          chatId,
          "Enter 3 months pricing (format: actualPrice_sellingPrice, e.g., 1947_399) or type 'skip':"
        );
        break;

      case "price_3_month":
        if (text.toLowerCase() === "skip") {
          session.data.price3MonthActual = 0;
          session.data.price3MonthSelling = 0;
          session.step = "price_6_month";
          bot.sendMessage(
            chatId,
            "Enter 6 months pricing (format: actualPrice_sellingPrice, e.g., 3894_699) or type 'skip':"
          );
          return;
        }
        const [actual3, selling3] = text.split("_").map(Number);
        if (isNaN(actual3) || isNaN(selling3)) {
          bot.sendMessage(
            chatId,
            "Invalid format. Please use format: actualPrice_sellingPrice or type 'skip'"
          );
          return;
        }
        session.data.price3MonthActual = actual3;
        session.data.price3MonthSelling = selling3;
        session.step = "price_6_month";
        bot.sendMessage(
          chatId,
          "Enter 6 months pricing (format: actualPrice_sellingPrice, e.g., 3894_699) or type 'skip':"
        );
        break;

      case "price_6_month":
        if (text.toLowerCase() === "skip") {
          session.data.price6MonthActual = 0;
          session.data.price6MonthSelling = 0;
          session.step = "price_12_month";
          bot.sendMessage(
            chatId,
            "Enter 12 months pricing (format: actualPrice_sellingPrice, e.g., 7788_999) or type 'skip':"
          );
          return;
        }
        const [actual6, selling6] = text.split("_").map(Number);
        if (isNaN(actual6) || isNaN(selling6)) {
          bot.sendMessage(
            chatId,
            "Invalid format. Please use format: actualPrice_sellingPrice or type 'skip'"
          );
          return;
        }
        session.data.price6MonthActual = actual6;
        session.data.price6MonthSelling = selling6;
        session.step = "price_12_month";
        bot.sendMessage(
          chatId,
          "Enter 12 months pricing (format: actualPrice_sellingPrice, e.g., 7788_999) or type 'skip':"
        );
        break;

      case "price_12_month":
        if (text.toLowerCase() === "skip") {
          session.data.price12MonthActual = 0;
          session.data.price12MonthSelling = 0;
        } else {
          const [actual12, selling12] = text.split("_").map(Number);
          if (isNaN(actual12) || isNaN(selling12)) {
            bot.sendMessage(
              chatId,
              "Invalid format. Please use format: actualPrice_sellingPrice or type 'skip'"
            );
            return;
          }
          session.data.price12MonthActual = actual12;
          session.data.price12MonthSelling = selling12;
        }

        try {
          const product = await storage.createProduct(session.data as InsertProduct);
          
          const pricingLines = [];
          if (product.price1MonthActual > 0 && product.price1MonthSelling > 0) {
            pricingLines.push(`• 1 Month: ₹${product.price1MonthActual} → ₹${product.price1MonthSelling}`);
          }
          if (product.price3MonthActual > 0 && product.price3MonthSelling > 0) {
            pricingLines.push(`• 3 Months: ₹${product.price3MonthActual} → ₹${product.price3MonthSelling}`);
          }
          if (product.price6MonthActual > 0 && product.price6MonthSelling > 0) {
            pricingLines.push(`• 6 Months: ₹${product.price6MonthActual} → ₹${product.price6MonthSelling}`);
          }
          if (product.price12MonthActual > 0 && product.price12MonthSelling > 0) {
            pricingLines.push(`• 12 Months: ₹${product.price12MonthActual} → ₹${product.price12MonthSelling}`);
          }
          
          const summary = `
✅ Product created successfully!

📦 Product Details:
• Category: ${product.category}
• Name: ${product.name}
• Description: ${product.description}

💰 Pricing:
${pricingLines.join('\n')}

Product ID: ${product.id}
          `;

          bot.sendMessage(chatId, summary);
          sessions.delete(chatId);
        } catch (error) {
          bot.sendMessage(
            chatId,
            "❌ Error creating product. Please try again with /newpost"
          );
          sessions.delete(chatId);
        }
        break;
    }
  });

  bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const session = sessions.get(chatId);

    if (!session || session.step !== "image") return;

    const photo = msg.photo?.[msg.photo.length - 1];
    if (!photo) return;

    const fileId = photo.file_id;
    const file = await bot.getFile(fileId);
    const imageUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    session.data.image = imageUrl;
    session.step = "price_1_month";
    bot.sendMessage(
      chatId,
      "Enter 1 month pricing (format: actualPrice_sellingPrice, e.g., 649_149):"
    );
  });

  console.log("Telegram bot initialized successfully!");
  return bot;
}
