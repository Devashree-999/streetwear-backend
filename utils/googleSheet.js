const dotenv=require("dotenv"); // make sure it's at the top
const { google } = require("googleapis");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../.env') })



const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../authsystemsheets-5e5aa678f747.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: 'v4', auth });

const saveToSheet = async (user) => {
  
   const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      console.log("❌ GOOGLE_SHEET_ID is undefined");
      return;
    }
  
    try {
      const res = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[user.name, user.email, new Date().toLocaleString()]],
        },
      });
  
      console.log("✅ Data appended successfully");
    } catch (err) {
      console.error("❌ Error appending data:", err);
    }
};

module.exports = { saveToSheet };
