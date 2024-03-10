const express = require('express')
const router = express.Router();
const {google} = require('googleapis');


const keys = require('../../keys.json');

router.get("/home", async (req,res)=> {
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], 
    });

    //Auth client Object
    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = await google.sheets({ version: "v4", auth: authClientObject });

    // spreadsheet id
    const spreadsheetId = "1HdduzTVejMbMxDh6tvT7AFyBBfy7DNlsaJpPdsVMKq8";

    // Get metadata about spreadsheet
    const sheetInfo = googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //Read from the spreadsheet
    const rangeData = await googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
        includeGridData: true,
    })
    //Latest Form => console.log(rangeData.data.sheets[0].properties.gridProperties.rowCount);
    var latest = rangeData.data.sheets[0].properties.gridProperties.rowCount;

    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "response!A2:F", //range of cells to read from.
        
    })
    // To get the latest value do readData.data.values[lateast-1]
    res.send(readData.data.values);

    console.log(readData.data.values);
})


module.exports = router;