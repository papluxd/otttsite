import TelegramBot from "node-telegram-bot-api";
import { storage } from "./storage";
import type { InsertProduct } from "@shared/schema";

interface UserSession {
  step: string;
  data: Partial<InsertProduct>;
  editingProductId?: string;
  currentDuration?: string;
}

const sessions = new Map<number, UserSession>();

export function initTelegramBot(token: string) {
  const bot = new TelegramBot(token, { 
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10
      }
    }
  });

  bot.on('polling_error', (error: any) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409')) {
      console.log('Warning: Another bot instance is running. Stop other instances to use this bot.');
    } else {
      console.error('Polling error:', error);
    }
  });

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
      "Welcome to SubFlix Product Manager! 🎬\n\nCommands:\n/newpost - Add a new product\n/showall - View and edit all products"
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

  bot.onText(/\/showall/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      const products = await storage.getProducts();
      
      if (products.length === 0) {
        bot.sendMessage(chatId, "No products found. Use /newpost to add a product.");
        return;
      }

      const keyboard = {
        reply_markup: {
          inline_keyboard: products.map(product => [{
            text: `${product.name} (${product.category})`,
            callback_data: `view_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "Select a product to view and edit pricing:",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.message!.chat.id;
    const messageId = query.message!.message_id;
    const data = query.data;

    if (!data) {
      await bot.answerCallbackQuery(query.id);
      return;
    }

    const session = sessions.get(chatId);

    if (data.startsWith("cat_") && session?.step === "category") {
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
      await bot.answerCallbackQuery(query.id);
      return;
    }
    
    if (data.startsWith("duration_") && session?.step === "pricing") {
      const duration = data.replace("duration_", "");
      session.currentDuration = duration;
      session.step = `price_${duration}`;
      
      await bot.answerCallbackQuery(query.id);
      bot.sendMessage(
        chatId,
        `Enter pricing for ${duration.replace("_", " ")} in format:\n${duration.replace("_", " ")}_actualPrice_sellingPrice\n\nExample: 1 Month_649_149`
      );
      return;
    }
    
    if (data.startsWith("view_")) {
      const productId = data.replace("view_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      const priceOptions = [];
      
      if (product.price1MonthActual > 0 && product.price1MonthSelling > 0) {
        priceOptions.push([
          {
            text: `1 Month: ₹${product.price1MonthActual} → ₹${product.price1MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_1_month_${productId}`
          },
          {
            text: product.inStock1Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_1_month_${productId}`
          }
        ]);
      }
      
      if (product.price3MonthActual > 0 && product.price3MonthSelling > 0) {
        priceOptions.push([
          {
            text: `3 Months: ₹${product.price3MonthActual} → ₹${product.price3MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_3_months_${productId}`
          },
          {
            text: product.inStock3Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_3_months_${productId}`
          }
        ]);
      }
      
      if (product.price6MonthActual > 0 && product.price6MonthSelling > 0) {
        priceOptions.push([
          {
            text: `6 Months: ₹${product.price6MonthActual} → ₹${product.price6MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_6_months_${productId}`
          },
          {
            text: product.inStock6Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_6_months_${productId}`
          }
        ]);
      }
      
      if (product.price12MonthActual > 0 && product.price12MonthSelling > 0) {
        priceOptions.push([
          {
            text: `12 Months: ₹${product.price12MonthActual} → ₹${product.price12MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_12_months_${productId}`
          },
          {
            text: product.inStock12Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_12_months_${productId}`
          }
        ]);
      }

      await bot.editMessageText(
        `📦 ${product.name}\n\nCategory: ${product.category}\nDescription: ${product.description}\n\nClick ✏️ to edit price or stock icon to toggle availability:`,
        {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: priceOptions
          }
        }
      );
      await bot.answerCallbackQuery(query.id);
      return;
    }
    
    if (data.startsWith("edit_")) {
      const parts = data.replace("edit_", "").split("_");
      const productId = parts.pop()!;
      const duration = parts.join("_");
      
      sessions.set(chatId, {
        step: `editing_${duration}`,
        data: {},
        editingProductId: productId,
        currentDuration: duration
      });
      
      await bot.answerCallbackQuery(query.id);
      bot.sendMessage(
        chatId,
        `Enter new pricing for ${duration.replace("_", " ")} in format:\n${duration.replace("_", " ")}_actualPrice_sellingPrice\n\nExample: 1 Month_649_149`
      );
      return;
    }
    
    if (data.startsWith("toggle_")) {
      const parts = data.replace("toggle_", "").split("_");
      const productId = parts.pop()!;
      const duration = parts.join("_");
      
      const product = await storage.getProduct(productId);
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      let updateData: Partial<InsertProduct> = {};
      
      if (duration === "1_month") {
        updateData.inStock1Month = !product.inStock1Month;
      } else if (duration === "3_months") {
        updateData.inStock3Month = !product.inStock3Month;
      } else if (duration === "6_months") {
        updateData.inStock6Month = !product.inStock6Month;
      } else if (duration === "12_months") {
        updateData.inStock12Month = !product.inStock12Month;
      }

      await storage.updateProduct(productId, updateData);
      
      const updatedProduct = await storage.getProduct(productId);
      if (!updatedProduct) {
        await bot.answerCallbackQuery(query.id, { text: "Error updating" });
        return;
      }

      const priceOptions = [];
      
      if (updatedProduct.price1MonthActual > 0 && updatedProduct.price1MonthSelling > 0) {
        priceOptions.push([
          {
            text: `1 Month: ₹${updatedProduct.price1MonthActual} → ₹${updatedProduct.price1MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_1_month_${productId}`
          },
          {
            text: updatedProduct.inStock1Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_1_month_${productId}`
          }
        ]);
      }
      
      if (updatedProduct.price3MonthActual > 0 && updatedProduct.price3MonthSelling > 0) {
        priceOptions.push([
          {
            text: `3 Months: ₹${updatedProduct.price3MonthActual} → ₹${updatedProduct.price3MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_3_months_${productId}`
          },
          {
            text: updatedProduct.inStock3Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_3_months_${productId}`
          }
        ]);
      }
      
      if (updatedProduct.price6MonthActual > 0 && updatedProduct.price6MonthSelling > 0) {
        priceOptions.push([
          {
            text: `6 Months: ₹${updatedProduct.price6MonthActual} → ₹${updatedProduct.price6MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_6_months_${productId}`
          },
          {
            text: updatedProduct.inStock6Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_6_months_${productId}`
          }
        ]);
      }
      
      if (updatedProduct.price12MonthActual > 0 && updatedProduct.price12MonthSelling > 0) {
        priceOptions.push([
          {
            text: `12 Months: ₹${updatedProduct.price12MonthActual} → ₹${updatedProduct.price12MonthSelling}`,
            callback_data: `noop`
          },
          {
            text: "✏️",
            callback_data: `edit_12_months_${productId}`
          },
          {
            text: updatedProduct.inStock12Month ? "✅" : "🙅🏻‍♂️",
            callback_data: `toggle_12_months_${productId}`
          }
        ]);
      }

      await bot.editMessageReplyMarkup(
        {
          inline_keyboard: priceOptions
        },
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      
      await bot.answerCallbackQuery(query.id, { 
        text: `Stock status updated!` 
      });
      return;
    }

    if (data === "create_product") {
      const session = sessions.get(chatId);
      if (!session) {
        await bot.answerCallbackQuery(query.id);
        return;
      }

      session.data.price1MonthActual = session.data.price1MonthActual || 0;
      session.data.price1MonthSelling = session.data.price1MonthSelling || 0;
      session.data.price3MonthActual = session.data.price3MonthActual || 0;
      session.data.price3MonthSelling = session.data.price3MonthSelling || 0;
      session.data.price6MonthActual = session.data.price6MonthActual || 0;
      session.data.price6MonthSelling = session.data.price6MonthSelling || 0;
      session.data.price12MonthActual = session.data.price12MonthActual || 0;
      session.data.price12MonthSelling = session.data.price12MonthSelling || 0;

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
      
      await bot.answerCallbackQuery(query.id);
      return;
    }

    if (data === "noop") {
      await bot.answerCallbackQuery(query.id);
      return;
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
        session.step = "pricing";
        
        const durationKeyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "1 Month", callback_data: "duration_1_month" }],
              [{ text: "3 Months", callback_data: "duration_3_months" }],
              [{ text: "6 Months", callback_data: "duration_6_months" }],
              [{ text: "12 Months", callback_data: "duration_12_months" }]
            ]
          }
        };
        
        bot.sendMessage(
          chatId,
          "Select duration to add pricing (you can add multiple):",
          durationKeyboard
        );
        break;

      case "price_1_month":
      case "price_3_months":
      case "price_6_months":
      case "price_12_months":
        const expectedDuration = session.step.replace("price_", "").replace("_", " ");
        const parts = text.split("_");
        
        if (parts.length !== 3) {
          bot.sendMessage(
            chatId,
            `Invalid format. Please use format:\n${expectedDuration}_actualPrice_sellingPrice\n\nExample: 1 Month_649_149`
          );
          return;
        }

        const durationPart = parts[0].toLowerCase().trim();
        const actualPrice = Number(parts[1]);
        const sellingPrice = Number(parts[2]);
        
        const expectedLower = expectedDuration.toLowerCase().trim();
        const normalizedInput = durationPart.replace(/\s+/g, " ");
        const normalizedExpected = expectedLower.replace(/\s+/g, " ");
        
        if (normalizedInput !== normalizedExpected) {
          bot.sendMessage(
            chatId,
            `Please enter pricing for ${expectedDuration}.\nFormat: ${expectedDuration}_actualPrice_sellingPrice\n\nExample: ${expectedDuration}_649_149`
          );
          return;
        }

        if (isNaN(actualPrice) || isNaN(sellingPrice)) {
          bot.sendMessage(
            chatId,
            `Invalid prices. Please use format:\n${expectedDuration}_actualPrice_sellingPrice\n\nExample: ${expectedDuration}_649_149`
          );
          return;
        }

        const duration = session.step.replace("price_", "");
        if (duration === "1_month") {
          session.data.price1MonthActual = actualPrice;
          session.data.price1MonthSelling = sellingPrice;
        } else if (duration === "3_months") {
          session.data.price3MonthActual = actualPrice;
          session.data.price3MonthSelling = sellingPrice;
        } else if (duration === "6_months") {
          session.data.price6MonthActual = actualPrice;
          session.data.price6MonthSelling = sellingPrice;
        } else if (duration === "12_months") {
          session.data.price12MonthActual = actualPrice;
          session.data.price12MonthSelling = sellingPrice;
        }

        session.step = "pricing";
        
        const continueKeyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "1 Month", callback_data: "duration_1_month" }],
              [{ text: "3 Months", callback_data: "duration_3_months" }],
              [{ text: "6 Months", callback_data: "duration_6_months" }],
              [{ text: "12 Months", callback_data: "duration_12_months" }],
              [{ text: "✅ Done - Create Product", callback_data: "create_product" }]
            ]
          }
        };
        
        bot.sendMessage(
          chatId,
          `✅ Pricing added for ${duration.replace("_", " ")}!\n\nAdd more durations or click Done to create the product:`,
          continueKeyboard
        );
        break;

      default:
        if (session.step.startsWith("editing_")) {
          const duration = session.currentDuration;
          const productId = session.editingProductId;
          
          if (!duration || !productId) return;

          const expectedDur = duration.replace("_", " ");
          const editParts = text.split("_");
          
          if (editParts.length !== 3) {
            bot.sendMessage(
              chatId,
              `Invalid format. Please use format:\n${expectedDur}_actualPrice_sellingPrice\n\nExample: ${expectedDur}_649_149`
            );
            return;
          }

          const editDurationPart = editParts[0].toLowerCase().trim();
          const editActualPrice = Number(editParts[1]);
          const editSellingPrice = Number(editParts[2]);
          
          const expectedEditLower = expectedDur.toLowerCase().trim();
          const normalizedEditInput = editDurationPart.replace(/\s+/g, " ");
          const normalizedEditExpected = expectedEditLower.replace(/\s+/g, " ");
          
          if (normalizedEditInput !== normalizedEditExpected) {
            bot.sendMessage(
              chatId,
              `Please enter pricing for ${expectedDur}.\nFormat: ${expectedDur}_actualPrice_sellingPrice\n\nExample: ${expectedDur}_649_149`
            );
            return;
          }

          if (isNaN(editActualPrice) || isNaN(editSellingPrice)) {
            bot.sendMessage(
              chatId,
              `Invalid prices. Please use format:\n${expectedDur}_actualPrice_sellingPrice\n\nExample: ${expectedDur}_649_149`
            );
            return;
          }

          let updateData: Partial<InsertProduct> = {};
          
          if (duration === "1_month") {
            updateData.price1MonthActual = editActualPrice;
            updateData.price1MonthSelling = editSellingPrice;
          } else if (duration === "3_months") {
            updateData.price3MonthActual = editActualPrice;
            updateData.price3MonthSelling = editSellingPrice;
          } else if (duration === "6_months") {
            updateData.price6MonthActual = editActualPrice;
            updateData.price6MonthSelling = editSellingPrice;
          } else if (duration === "12_months") {
            updateData.price12MonthActual = editActualPrice;
            updateData.price12MonthSelling = editSellingPrice;
          }

          await storage.updateProduct(productId, updateData);
          
          bot.sendMessage(
            chatId,
            `✅ Pricing updated successfully for ${duration.replace("_", " ")}!\n\nUse /showall to view all products.`
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
    session.step = "pricing";
    
    const durationKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "1 Month", callback_data: "duration_1_month" }],
          [{ text: "3 Months", callback_data: "duration_3_months" }],
          [{ text: "6 Months", callback_data: "duration_6_months" }],
          [{ text: "12 Months", callback_data: "duration_12_months" }]
        ]
      }
    };
    
    bot.sendMessage(
      chatId,
      "Select duration to add pricing (you can add multiple):",
      durationKeyboard
    );
  });

  console.log("Telegram bot initialized successfully!");
  return bot;
}
