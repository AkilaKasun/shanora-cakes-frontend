// conversation.js

// Fully mapped dummy prices for both languages
export const prices = {
  // --- ENGLISH PRICES ---
  "Butter Cake": { "500g": "Rs. 1500", "1kg": "Rs. 2800", "2kg": "Rs. 5200" },
  "Chocolate Cake": { "500g": "Rs. 1800", "1kg": "Rs. 3200", "2kg": "Rs. 6000" },
  "Ribbon Cake": { "500g": "Rs. 1700", "1kg": "Rs. 3000", "2kg": "Rs. 5800" },
  "Cupcakes": { "Vanilla Cupcakes": "Rs. 150 each", "Chocolate Cupcakes": "Rs. 180 each" },
  "Brownies": { "Small Brownies": "Rs. 1200 (6pcs)", "Large Brownies": "Rs. 2200 (12pcs)" },
  "Bento Cake": { "Butter": "Rs. 950", "Chocolate": "Rs. 1100" },

  // --- SINHALA PRICES ---
  "බටර් කේක්": { "500g": "රු. 1500", "1kg": "රු. 2800", "2kg": "රු. 5200" },
  "චොකලට් කේක්": { "500g": "රු. 1800", "1kg": "රු. 3200", "2kg": "රු. 6000" },
  "රිබන් කේක්": { "500g": "රු. 1700", "1kg": "රු. 3000", "2kg": "රු. 5800" },
  "කප් කේක්": { "වැනිලා": "රු. 150 යි", "චොකලට්": "රු. 180 යි" },
  "බ්‍රව්නි": { "කුඩා": "රු. 1200 (කෑලි 6)", "විශාල": "රු. 2200 (කෑලි 12)" },
  "බෙන්ටෝ කේක්": { "බටර්": "රු. 950", "චොකලට්": "රු. 1100" }
};

export const conversation = {
  en: {
    start: {
      message: "Welcome to Shanora Cakes! How can I help you?",
      options: [
        { label: "Cake Details", next: "cake_type" },
        { label: "See Photos", action: "GALLERY" },
        { label: "Make Order", action: "ORDER" },
        { label: "Contact Us", next: "contact" }
      ]
    },
    contact: {
      message: "Contact us via:",
      options: [
        { label: "WhatsApp", action: "WHATSAPP" },
        { label: "Facebook", action: "FACEBOOK" },
        { label: "LinkedIn", action: "LINKEDIN" },
        { label: "Back", next: "start" }
      ]
    },
    cake_type: {
      message: "Select cake type",
      options: [
        { label: "Butter Cake", next: "butter_icing" },
        { label: "Chocolate Cake", next: "choco_icing" },
        { label: "Ribbon Cake", next: "ribbon_flavor" },
        { label: "Cupcakes", next: "cupcakes" },
        { label: "Brownies", next: "brownies" },
        { label: "Bento Cake", next: "bento_flavor" }
      ]
    },
    butter_icing: { message: "With icing?", options: [{ label: "With Icing", next: "size" }, { label: "Without Icing", next: "size" }] },
    choco_icing: { message: "With icing?", options: [{ label: "With Icing", next: "size" }, { label: "Without Icing", next: "size" }] },
    ribbon_flavor: { message: "Select flavor", options: [{ label: "Butter", next: "ribbon_icing" }, { label: "Chocolate", next: "ribbon_icing" }] },
    ribbon_icing: { message: "With icing?", options: [{ label: "With Icing", next: "size" }, { label: "Without Icing", next: "size" }] },
    cupcakes: { message: "Select cupcake type", options: [{ label: "Vanilla Cupcakes", next: "final" }, { label: "Chocolate Cupcakes", next: "final" }] },
    brownies: { message: "Brownies available", options: [{ label: "Small Brownies", next: "final" }, { label: "Large Brownies", next: "final" }] },
    bento_flavor: { message: "Select flavor", options: [{ label: "Butter", next: "final" }, { label: "Chocolate", next: "final" }] },
    size: { message: "Select size", options: [{ label: "500g", next: "final" }, { label: "1kg", next: "final" }, { label: "2kg", next: "final" }] },
    final: {
      template: "🍰 {cakeName}\n✨ {details}\n💰 Price: {price}\n\n⚠️ Note: Prices may change based on designs and add-ons. These are average prices only.",
      options: [
        { label: "⬅ Go Back", next: "cake_type" },
        { label: "🏠 Main Menu", next: "start" },
        { label: "📷 See Photos", action: "GALLERY" },
        { label: "🛒 Make Order", action: "ORDER" }
      ]
    }
  },
  si: {
    start: {
      message: "Shanora Cakes වෙත පිළිගනිමු! ඔබට උදව් කළ හැක්කේ කෙසේද?",
      options: [
        { label: "කේක් විස්තර", next: "cake_type" },
        { label: "ඡායාරූප බලන්න", action: "GALLERY" },
        { label: "ඇණවුම් කරන්න", action: "ORDER" },
        { label: "සම්බන්ධ වන්න", next: "contact" }
      ]
    },
    contact: {
      message: "සම්බන්ධ වන්න:",
      options: [
        { label: "WhatsApp", action: "WHATSAPP" },
        { label: "Facebook", action: "FACEBOOK" },
        { label: "LinkedIn", action: "LINKEDIN" },
        { label: "ආපසු", next: "start" }
      ]
    },
    cake_type: {
      message: "කේක් වර්ගය තෝරන්න",
      options: [
        { label: "බටර් කේක්", next: "butter_icing" },
        { label: "චොකලට් කේක්", next: "choco_icing" },
        { label: "රිබන් කේක්", next: "ribbon_flavor" },
        { label: "කප් කේක්", next: "cupcakes" },
        { label: "බ්‍රව්නි", next: "brownies" },
        { label: "බෙන්ටෝ කේක්", next: "bento_flavor" }
      ]
    },
    butter_icing: { message: "අයිසිං සමගද?", options: [{ label: "ඔව්", next: "size" }, { label: "නැහැ", next: "size" }] },
    choco_icing: { message: "අයිසිං සමගද?", options: [{ label: "ඔව්", next: "size" }, { label: "නැහැ", next: "size" }] },
    ribbon_flavor: { message: "රසය තෝරන්න", options: [{ label: "බටර්", next: "ribbon_icing" }, { label: "චොකලට්", next: "ribbon_icing" }] },
    ribbon_icing: { message: "අයිසිං සමගද?", options: [{ label: "ඔව්", next: "size" }, { label: "නැහැ", next: "size" }] },
    cupcakes: { message: "කප් කේක් වර්ගය", options: [{ label: "වැනිලා", next: "final" }, { label: "චොකලට්", next: "final" }] },
    brownies: { message: "බ්‍රව්නි", options: [{ label: "කුඩා", next: "final" }, { label: "විශාල", next: "final" }] },
    bento_flavor: { message: "රසය", options: [{ label: "බටර්", next: "final" }, { label: "චොකලට්", next: "final" }] },
    size: { message: "ප්‍රමාණය තෝරන්න", options: [{ label: "500g", next: "final" }, { label: "1kg", next: "final" }, { label: "2kg", next: "final" }] },
    final: {
      template: "🍰 {cakeName}\n✨ {details}\n💰 මිල: {price}\n\n⚠️ සටහන: ඩිසයින් සහ add-ons අනුව මිල වෙනස් විය හැක. මේවා සාමාන්‍ය මිල වේ.",
      options: [
        { label: "⬅ ආපසු යන්න", next: "cake_type" },
        { label: "🏠 ප්‍රධාන මෙනුව", next: "start" },
        { label: "📷 ඡායාරූප බලන්න", action: "GALLERY" },
        { label: "🛒 ඇණවුම් කරන්න", action: "ORDER" }
      ]
    }
  }
};





// export const conversation = {
//   en: {
//     start: {
//       message: "Welcome to Shanora Cakes! How can I help you?",
//       options: [
//         { label: "Cake Details", next: "cake_type" },
//         { label: "See Photos", action: "GALLERY" },
//         { label: "Make Order", action: "ORDER" },
//         { label: "Contact Us", next: "contact" }
//       ]
//     },

//     contact: {
//       message: "Contact us via:",
//       options: [
//         { label: "WhatsApp", action: "WHATSAPP" },
//         { label: "Facebook", action: "FACEBOOK" },
//         { label: "LinkedIn", action: "LINKEDIN" },
//         { label: "Back", next: "start" }
//       ]
//     },

//     cake_type: {
//       message: "Select cake type",
//       options: [
//         { label: "Butter Cake", next: "butter_icing" },
//         { label: "Chocolate Cake", next: "choco_icing" },
//         { label: "Ribbon Cake", next: "ribbon_flavor" },
//         { label: "Cupcakes", next: "cupcakes" },
//         { label: "Brownies", next: "brownies" },
//         { label: "Bento Cake", next: "bento_flavor" }
//       ]
//     },

//     butter_icing: {
//       message: "With icing?",
//       options: [
//         { label: "With Icing", next: "size" },
//         { label: "Without Icing", next: "size" }
//       ]
//     },

//     choco_icing: {
//       message: "With icing?",
//       options: [
//         { label: "With Icing", next: "size" },
//         { label: "Without Icing", next: "size" }
//       ]
//     },

//     ribbon_flavor: {
//       message: "Select flavor",
//       options: [
//         { label: "Butter", next: "ribbon_icing" },
//         { label: "Chocolate", next: "ribbon_icing" }
//       ]
//     },

//     ribbon_icing: {
//       message: "With icing?",
//       options: [
//         { label: "With Icing", next: "size" },
//         { label: "Without Icing", next: "size" }
//       ]
//     },

//     cupcakes: {
//       message: "Select cupcake type",
//       options: [
//         { label: "Vanilla Cupcakes", next: "final" },
//         { label: "Chocolate Cupcakes", next: "final" }
//       ]
//     },

//     brownies: {
//       message: "Brownies available",
//       options: [
//         { label: "Small Brownies", next: "final" },
//         { label: "Large Brownies", next: "final" }
//       ]
//     },

//     bento_flavor: {
//       message: "Select flavor",
//       options: [
//         { label: "Butter", next: "final" },
//         { label: "Chocolate", next: "final" }
//       ]
//     },

//     size: {
//       message: "Select size",
//       options: [
//         { label: "500g", next: "final" },
//         { label: "1kg", next: "final" },
//         { label: "2kg", next: "final" }
//       ]
//     },

//     final: {
//       message:
//         "Prices may change based on designs and add-ons. These are average prices.",
//       options: [
//         { label: "See Photos", action: "GALLERY" },
//         { label: "Make Order", action: "ORDER" },
//         { label: "Contact Us", next: "contact" }
//       ]
//     }
//   },

//   si: {
//     start: {
//       message: "Shanora Cakes වෙත පිළිගනිමු! ඔබට උදව් කළ හැක්කේ කෙසේද?",
//       options: [
//         { label: "කේක් විස්තර", next: "cake_type" },
//         { label: "ඡායාරූප බලන්න", action: "GALLERY" },
//         { label: "ඇණවුම් කරන්න", action: "ORDER" },
//         { label: "සම්බන්ධ වන්න", next: "contact" }
//       ]
//     },

//     contact: {
//       message: "සම්බන්ධ වන්න:",
//       options: [
//         { label: "WhatsApp", action: "WHATSAPP" },
//         { label: "Facebook", action: "FACEBOOK" },
//         { label: "LinkedIn", action: "LINKEDIN" },
//         { label: "ආපසු", next: "start" }
//       ]
//     },

//     cake_type: {
//       message: "කේක් වර්ගය තෝරන්න",
//       options: [
//         { label: "බටර් කේක්", next: "butter_icing" },
//         { label: "චොකලට් කේක්", next: "choco_icing" },
//         { label: "රිබන් කේක්", next: "ribbon_flavor" },
//         { label: "කප් කේක්", next: "cupcakes" },
//         { label: "බ්‍රව්නි", next: "brownies" },
//         { label: "බෙන්ටෝ කේක්", next: "bento_flavor" }
//       ]
//     },

//     butter_icing: {
//       message: "අයිසිං සමගද?",
//       options: [
//         { label: "ඔව්", next: "size" },
//         { label: "නැහැ", next: "size" }
//       ]
//     },

//     choco_icing: {
//       message: "අයිසිං සමගද?",
//       options: [
//         { label: "ඔව්", next: "size" },
//         { label: "නැහැ", next: "size" }
//       ]
//     },

//     ribbon_flavor: {
//       message: "රසය තෝරන්න",
//       options: [
//         { label: "බටර්", next: "ribbon_icing" },
//         { label: "චොකලට්", next: "ribbon_icing" }
//       ]
//     },

//     ribbon_icing: {
//       message: "අයිසිං සමගද?",
//       options: [
//         { label: "ඔව්", next: "size" },
//         { label: "නැහැ", next: "size" }
//       ]
//     },

//     cupcakes: {
//       message: "කප් කේක් වර්ගය",
//       options: [
//         { label: "වැනිලා", next: "final" },
//         { label: "චොකලට්", next: "final" }
//       ]
//     },

//     brownies: {
//       message: "බ්‍රව්නි",
//       options: [
//         { label: "කුඩා", next: "final" },
//         { label: "විශාල", next: "final" }
//       ]
//     },

//     bento_flavor: {
//       message: "රසය",
//       options: [
//         { label: "බටර්", next: "final" },
//         { label: "චොකලට්", next: "final" }
//       ]
//     },

//     size: {
//       message: "ප්‍රමාණය තෝරන්න",
//       options: [
//         { label: "500g", next: "final" },
//         { label: "1kg", next: "final" },
//         { label: "2kg", next: "final" }
//       ]
//     },

//     final: {
//       message:
//         "ඩිසයින් සහ add-ons අනුව මිල වෙනස් විය හැක. මේවා සාමාන්‍ය මිල වේ",
//       options: [
//         { label: "ඡායාරූප බලන්න", action: "GALLERY" },
//         { label: "ඇණවුම් කරන්න", action: "ORDER" },
//         { label: "සම්බන්ධ වන්න", next: "contact" }
//       ]
//     }
//   }
// };