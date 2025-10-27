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
      "Welcome to SubFlix Product Manager! 🎬\n\nCommands:\n/newpost - Add a new product\n/showall - View all products with numbers\n/setnewoption - Add new pricing option to product\n/deloption - Delete pricing option from product\n/delpost - Delete a product\n/changeimg - Change product image\n/changedescription - Change product description"
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
          inline_keyboard: products.map((product, index) => [{
            text: `${String(index + 1).padStart(4, '0')} - ${product.name} (${product.category})`,
            callback_data: `view_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "📋 All Products:\n\nSelect a product to view details:",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.onText(/\/delpost/, async (msg) => {
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
            text: `🗑️ ${product.name} (${product.category})`,
            callback_data: `delete_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "⚠️ Select a product to DELETE:\n(This action cannot be undone!)",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.onText(/\/changeimg/, async (msg) => {
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
            text: `🖼️ ${product.name} (${product.category})`,
            callback_data: `changeimg_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "Select a product to change image:",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.onText(/\/changedescription/, async (msg) => {
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
            text: `📝 ${product.name} (${product.category})`,
            callback_data: `changedesc_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "Select a product to change description:",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.onText(/\/setnewoption/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      const products = await storage.getProducts();
      
      if (products.length === 0) {
        bot.sendMessage(chatId, "No products found. Use /newpost to add a product.");
        return;
      }

      const keyboard = {
        reply_markup: {
          inline_keyboard: products.map((product, index) => [{
            text: `${String(index + 1).padStart(4, '0')} - ${product.name}`,
            callback_data: `addoption_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "➕ Select a product to add new pricing option:",
        keyboard
      );
    } catch (error) {
      bot.sendMessage(chatId, "❌ Error fetching products.");
    }
  });

  bot.onText(/\/deloption/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      const products = await storage.getProducts();
      
      if (products.length === 0) {
        bot.sendMessage(chatId, "No products found. Use /newpost to add a product.");
        return;
      }

      const keyboard = {
        reply_markup: {
          inline_keyboard: products.map((product, index) => [{
            text: `${String(index + 1).padStart(4, '0')} - ${product.name}`,
            callback_data: `deloption_${product.id}`
          }])
        }
      };

      bot.sendMessage(
        chatId,
        "🗑️ Select a product to delete pricing option:",
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
    
    if (data === "add_options" && session?.step === "pricing") {
      session.step = "add_pricing";
      
      await bot.answerCallbackQuery(query.id);
      bot.sendMessage(
        chatId,
        "Please enter pricing in format:\nduration_actualPrice_sellingPrice\n\nExample: 1 Month_649_149\nExample: 3 Months (Netflix)_699_99\nExample: 6 Months_2599_149\n\n✨ You can add custom text in brackets!"
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

      if (product.customOptions && product.customOptions.length > 0) {
        product.customOptions.forEach(option => {
          priceOptions.push([
            {
              text: `${option.label}: ₹${option.actualPrice} → ₹${option.sellingPrice}`,
              callback_data: `noop`
            },
            {
              text: option.inStock ? "✅" : "🙅🏻‍♂️",
              callback_data: `toggle_custom_${productId}_${option.id}`
            }
          ]);
        });
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

      if (updatedProduct.customOptions && updatedProduct.customOptions.length > 0) {
        updatedProduct.customOptions.forEach(option => {
          priceOptions.push([
            {
              text: `${option.label}: ₹${option.actualPrice} → ₹${option.sellingPrice}`,
              callback_data: `noop`
            },
            {
              text: option.inStock ? "✅" : "🙅🏻‍♂️",
              callback_data: `toggle_custom_${productId}_${option.id}`
            }
          ]);
        });
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

    if (data.startsWith("toggle_custom_")) {
      const parts = data.replace("toggle_custom_", "").split("_");
      const productId = parts[0];
      const optionId = parts.slice(1).join("_");
      
      const product = await storage.getProduct(productId);
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      const customOptions = (product.customOptions || []).map(option => {
        if (option.id === optionId) {
          return { ...option, inStock: !option.inStock };
        }
        return option;
      });

      await storage.updateProduct(productId, { customOptions });
      
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

      if (updatedProduct.customOptions && updatedProduct.customOptions.length > 0) {
        updatedProduct.customOptions.forEach(option => {
          priceOptions.push([
            {
              text: `${option.label}: ₹${option.actualPrice} → ₹${option.sellingPrice}`,
              callback_data: `noop`
            },
            {
              text: option.inStock ? "✅" : "🙅🏻‍♂️",
              callback_data: `toggle_custom_${productId}_${option.id}`
            }
          ]);
        });
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

    if (data.startsWith("delete_")) {
      const productId = data.replace("delete_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      const confirmKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Yes, Delete", callback_data: `confirm_delete_${productId}` },
              { text: "❌ Cancel", callback_data: "cancel_delete" }
            ]
          ]
        }
      };

      await bot.editMessageText(
        `⚠️ Are you sure you want to DELETE this product?\n\n📦 ${product.name}\nCategory: ${product.category}\n\n⚠️ This action cannot be undone!`,
        {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: confirmKeyboard.reply_markup
        }
      );
      
      await bot.answerCallbackQuery(query.id);
      return;
    }

    if (data.startsWith("confirm_delete_")) {
      const productId = data.replace("confirm_delete_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      const productName = product.name;
      
      try {
        await storage.deleteProduct(productId);
        
        await bot.editMessageText(
          `✅ Product deleted successfully!\n\n🗑️ Deleted: ${productName}`,
          {
            chat_id: chatId,
            message_id: messageId
          }
        );
        
        await bot.answerCallbackQuery(query.id, { text: "Product deleted!" });
      } catch (error) {
        await bot.answerCallbackQuery(query.id, { text: "Error deleting product" });
        bot.sendMessage(chatId, "❌ Error deleting product. Please try again.");
      }
      
      return;
    }

    if (data === "cancel_delete") {
      await bot.editMessageText(
        "❌ Deletion cancelled.",
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      
      await bot.answerCallbackQuery(query.id, { text: "Cancelled" });
      return;
    }

    if (data.startsWith("changeimg_")) {
      const productId = data.replace("changeimg_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      sessions.set(chatId, {
        step: "changing_image",
        data: {},
        editingProductId: productId
      });

      await bot.editMessageText(
        `🖼️ Change image for: ${product.name}\n\nCurrent image: ${product.image}\n\nPlease send new image URL or photo:`,
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      
      await bot.answerCallbackQuery(query.id);
      return;
    }

    if (data.startsWith("changedesc_")) {
      const productId = data.replace("changedesc_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      sessions.set(chatId, {
        step: "changing_description",
        data: {},
        editingProductId: productId
      });

      await bot.editMessageText(
        `📝 Change description for: ${product.name}\n\nCurrent: ${product.description}\n\nPlease enter new description:`,
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      
      await bot.answerCallbackQuery(query.id);
      return;
    }

    if (data.startsWith("addoption_")) {
      const productId = data.replace("addoption_", "");
      const product = await storage.getProduct(productId);
      
      if (!product) {
        await bot.answerCallbackQuery(query.id, { text: "Product not found" });
        return;
      }

      sessions.set(chatId, {
        step: "adding_custom_option",
        data: {},
        editingProductId: productId
      });

      await bot.editMessageText(
        `➕ Add new pricing option for: ${product.name}\n\nFormat: label_(actual_price)_(our_price)\n\nExamples:\n1 Month_649_149\nNetflix Premium_999_199\n3 Months Special_1999_299\n\nNote: Label can be anything you want!`,
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      
      await bot.answerCallbackQuery(query.id);
      return;
    }

    if (data.startsWith("deloption_")) {
      try {
        const productId = data.replace("deloption_", "");
        console.log("deloption_ - productId:", productId);
        
        const product = await storage.getProduct(productId);
        
        if (!product) {
          console.error("Product not found:", productId);
          await bot.answerCallbackQuery(query.id, { text: "Product not found" });
          return;
        }

        const customOptions = product.customOptions || [];
        console.log("Product custom options:", customOptions);
        
        if (customOptions.length === 0) {
          await bot.answerCallbackQuery(query.id, { text: "No custom options to delete" });
          bot.sendMessage(chatId, "❌ This product has no custom pricing options.");
          return;
        }

        const optionButtons = customOptions.map(option => [{
          text: `${option.label}: ₹${option.actualPrice} → ₹${option.sellingPrice}`,
          callback_data: `confirmdeloption_${productId}_${option.id}`
        }]);

        console.log("Creating delete buttons with callback_data:", optionButtons.map(b => b[0].callback_data));

        await bot.editMessageText(
          `🗑️ Select pricing option to delete from: ${product.name}`,
          {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
              inline_keyboard: optionButtons
            }
          }
        );
        
        await bot.answerCallbackQuery(query.id);
      } catch (error) {
        console.error("Error in deloption_ handler:", error);
        await bot.answerCallbackQuery(query.id, { text: "Error loading options" });
        bot.sendMessage(chatId, `❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      }
      return;
    }

    if (data.startsWith("confirmdeloption_")) {
      try {
        const parts = data.replace("confirmdeloption_", "").split("_");
        const productId = parts[0];
        const optionId = parts.slice(1).join("_");
        
        console.log("Deleting option - productId:", productId, "optionId:", optionId);
        
        const product = await storage.getProduct(productId);
        
        if (!product) {
          console.error("Product not found:", productId);
          await bot.answerCallbackQuery(query.id, { text: "Product not found" });
          return;
        }

        console.log("Product found. Current custom options:", product.customOptions);
        
        const customOptions = (product.customOptions || []).filter(
          option => option.id !== optionId
        );

        console.log("Options after filter:", customOptions);
        
        await storage.updateProduct(productId, { customOptions });

        await bot.editMessageText(
          `✅ Pricing option deleted successfully from ${product.name}!`,
          {
            chat_id: chatId,
            message_id: messageId
          }
        );
        
        await bot.answerCallbackQuery(query.id, { text: "Option deleted!" });
      } catch (error) {
        console.error("Error in confirmdeloption handler:", error);
        await bot.answerCallbackQuery(query.id, { text: "Error deleting option" });
        bot.sendMessage(chatId, `❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      }
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
        
        const addOptionsKeyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "+ Add Options", callback_data: "add_options" }]
            ]
          }
        };
        
        bot.sendMessage(
          chatId,
          "Click below to add pricing options:",
          addOptionsKeyboard
        );
        break;

      case "add_pricing": {
        const parts = text.split("_");
        
        if (parts.length !== 3) {
          bot.sendMessage(
            chatId,
            "❌ Invalid format. Please use format:\nduration_actualPrice_sellingPrice\n\nExample: 1 Month_649_149\nExample: 3 Months (Netflix)_699_99"
          );
          return;
        }

        const durationText = parts[0].trim();
        const actualPrice = Number(parts[1]);
        const sellingPrice = Number(parts[2]);

        if (isNaN(actualPrice) || isNaN(sellingPrice)) {
          bot.sendMessage(
            chatId,
            "❌ Invalid prices. Please enter valid numbers.\n\nExample: 1 Month_649_149\nExample: 3 Months (Netflix)_699_99"
          );
          return;
        }

        const durationLower = durationText.toLowerCase();
        if (durationLower.includes("1") && durationLower.includes("month") && !durationLower.includes("12")) {
          session.data.price1MonthActual = actualPrice;
          session.data.price1MonthSelling = sellingPrice;
        } else if (durationLower.includes("3") && durationLower.includes("month")) {
          session.data.price3MonthActual = actualPrice;
          session.data.price3MonthSelling = sellingPrice;
        } else if (durationLower.includes("6") && durationLower.includes("month")) {
          session.data.price6MonthActual = actualPrice;
          session.data.price6MonthSelling = sellingPrice;
        } else if (durationLower.includes("12") && durationLower.includes("month")) {
          session.data.price12MonthActual = actualPrice;
          session.data.price12MonthSelling = sellingPrice;
        } else {
          bot.sendMessage(
            chatId,
            "⚠️ Unrecognized duration. Please use: 1 Month, 3 Months, 6 Months, or 12 Months"
          );
          return;
        }

        session.step = "pricing";
        
        const continueKeyboard = {
          reply_markup: {
            inline_keyboard: [
              [{ text: "+ Add Options", callback_data: "add_options" }],
              [{ text: "✅ Done - Create Product", callback_data: "create_product" }]
            ]
          }
        };
        
        bot.sendMessage(
          chatId,
          `✅ Pricing added for ${durationText}!\n\nAdd more pricing options or click Done to create the product:`,
          continueKeyboard
        );
        break;
      }

      case "changing_image": {
        const productId = session.editingProductId;
        if (!productId) return;

        await storage.updateProduct(productId, { image: text });
        
        bot.sendMessage(
          chatId,
          `✅ Image updated successfully!\n\nNew image URL: ${text}\n\nUse /showall to view the product.`
        );
        
        sessions.delete(chatId);
        break;
      }

      case "changing_description": {
        const productId = session.editingProductId;
        if (!productId) return;

        await storage.updateProduct(productId, { description: text });
        
        bot.sendMessage(
          chatId,
          `✅ Description updated successfully!\n\nNew description: ${text}\n\nUse /showall to view the product.`
        );
        
        sessions.delete(chatId);
        break;
      }

      case "adding_custom_option": {
        const productId = session.editingProductId;
        if (!productId) return;

        const parts = text.split("_");
        
        if (parts.length !== 3) {
          bot.sendMessage(
            chatId,
            "❌ Invalid format. Please use format:\nlabel_(actual_price)_(our_price)\n\nExamples:\n1 Month_649_149\nNetflix Premium_999_199\n3 Months Special_1999_299"
          );
          return;
        }

        const label = parts[0].trim();
        const actualPrice = Number(parts[1]);
        const sellingPrice = Number(parts[2]);

        if (isNaN(actualPrice) || isNaN(sellingPrice)) {
          bot.sendMessage(
            chatId,
            "❌ Invalid prices. Please enter valid numbers.\n\nExample: 1 Month_649_149"
          );
          return;
        }

        const product = await storage.getProduct(productId);
        if (!product) {
          bot.sendMessage(chatId, "❌ Product not found.");
          sessions.delete(chatId);
          return;
        }

        const newOption = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          label,
          actualPrice,
          sellingPrice,
          inStock: true
        };

        const customOptions = [...(product.customOptions || []), newOption];
        await storage.updateProduct(productId, { customOptions });

        bot.sendMessage(
          chatId,
          `✅ New pricing option added successfully!\n\n${label}: ₹${actualPrice} → ₹${sellingPrice}\n\nUse /showall to view the product.`
        );
        
        sessions.delete(chatId);
        break;
      }

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

    if (!session) return;

    const photo = msg.photo?.[msg.photo.length - 1];
    if (!photo) return;

    const fileId = photo.file_id;
    const file = await bot.getFile(fileId);
    const imageUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    if (session.step === "image") {
      session.data.image = imageUrl;
      session.step = "pricing";
      
      const addOptionsKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: "+ Add Options", callback_data: "add_options" }]
          ]
        }
      };
      
      bot.sendMessage(
        chatId,
        "Click below to add pricing options:",
        addOptionsKeyboard
      );
    } else if (session.step === "changing_image") {
      const productId = session.editingProductId;
      if (!productId) return;

      await storage.updateProduct(productId, { image: imageUrl });
      
      bot.sendMessage(
        chatId,
        `✅ Image updated successfully!\n\nNew image uploaded.\n\nUse /showall to view the product.`
      );
      
      sessions.delete(chatId);
    }
  });

  console.log("Telegram bot initialized successfully!");
  return bot;
}
