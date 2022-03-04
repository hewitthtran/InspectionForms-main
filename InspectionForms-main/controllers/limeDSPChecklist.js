
const path = require('path');
const { google } = require('googleapis');

module.exports.renderLimeDSPChecklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'views', 'limeDSPChecklist.html'));
};



module.exports.postLimeDSPChecklist = async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "API-Credentials/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    //Create client instance for auth
    const client = await auth.getClient();

    //Instance of googlesheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });


    const spreadsheetId = process.env.SPREADSHEET_ID;

    //collect data from req.body by destructuring the object. These are the variables that represent each section of the form filled
    const {
        employee, date, shift, sections,
        gS1, dS1, hgS1, hdS1, pS1,
        g9A, d9A, hg9A, hd9A, p9A,
        g9B, d9B, hg9B, hd9B, p9B,
        gC1, dC1, hgC1, hdC1, pC1,
        gC3A, dC3A, hgC3A, hdC3A, pC3A,
        gC7, dC7, hgC7, hdC7, pC7,
        gSTCON, dSTCON, hgSTCON, hdSTCON, pSTCON,
        gSTF, dSTF, hgSTF, hdSTF, pSTF,
        gBIN, dBIN, hgBIN, hdBIN, pBIN,
        gC4, dC4, hgC4, hdC4, pC4,
        gC8, dC8, hgC8, hdC8, pC8,
        gPS, dPS, hgPS, hdPS, pPS,
        gS6, dS6, hgS6, hdS6, pS6,
        gS7, dS7, hgS7, hdS7, pS7,
        gC22, dC22, hgC22, hdC22, pC22,
        gC23, dC23, hgC23, hdC23, pC23,
        gC24, dC24, hgC24, hdC24, pC24,
        gC25, dC25, hgC25, hdC25, pC25,
        gC26, dC26, hgC26, hdC26, pC26,
        gC27, dC27, hgC27, hdC27, pC27,
        gC28, dC28, hgC28, hdC28, pC28,
        gC29, dC29, hgC29, hdC29, pC29,
        gC30, dC30, hgC30, hdC30, pC30,
        gC31, dC31, hgC31, hdC31, pC31,
        gC32, dC32, hgC32, hdC32, pC32,
        gC33, dC33, hgC33, hdC33, pC33,
        gC35, dC35, hgC35, hdC35, pC35,
        gC36, dC36, hgC36, hdC36, pC36,
        gC37, dC37, hgC37, hdC37, pC37,
        gC38, dC38, hgC38, hdC38, pC38,
        gST5, dST5, hgST5, hdST5, pST5,
        gST6, dST6, hgST6, hdST6, pST6,
    } = req.body;

    const defectives = {
        dS1: dS1, d9A: d9A, d9B: d9B, dC1: dC1, dC3A: dC3A, dC7: dC7, dSTCON: dSTCON,
        dSTF: dSTF, dBIN: dBIN, dC4: dC4, dC8: dC8, dPS: dPS, dS6: dS6, dS7: dS7, dC22: dC22,
        dC23: dC23, dC24: dC24, dC25: dC25, dC26: dC26, dC27: dC27, dC28: dC28,
        dC29: dC29, dC30: dC30, dC31: dC31, dC32: dC32, dC33: dC33, dC35: dC35,
        dC36: dC36, dC37: dC37, dC38: dC38, dST5: dST5, dST6: dST6,
    }
    const guards = {
        gS1: gS1, g9A: g9A, g9B: g9B, gC1: gC1, gC3A: gC3A, gC7: gC7, gSTCON: gSTCON,
        gSTF: gSTF, gBIN: gBIN, gC4: gC4, gC8: gC8, gPS: gPS, gS6: gS6, gS7: gS7, gC22: gC22,
        gC23: gC23, gC24: gC24, gC25: gC25, gC26: gC26, gC27: gC27, gC28: gC28,
        gC29: gC29, gC30: gC30, gC31: gC31, gC32: gC32, gC33: gC33, gC35: gC35,
        gC36: gC36, gC37: gC37, gC38: gC38, gST5: gST5, gST6: gST6,
    }
    //analyzes if defectives are checked or if guards are unchecked
    const defectArray = []; //array is empty, but will systematically input any defects or issues into it
    let isAllGuardsChecked = 'Yes';
    let defectsExist = 'No';

    for (let key in defectives) {
        if (defectives[key]) {
            defectArray.push(key)
            defectsExist = 'Yes'
        }
    }

    for (let key in guards) {
        if (!guards[key]) {
            defectArray.push(key)
            isAllGuardsChecked = 'No'
        };
    };
    // ^^ function is done, defectArray will have guards or defects that had issues stored

    //write rows to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Lime-DSP!A:AB", //state the horizontal range and which sheet you are appending data to
        valueInputOption: "USER_ENTERED", //This will convert data into proper formats (like date into date not string), so won't take raw data
        resource: {
            values: [
                [date, employee, shift,
                    isAllGuardsChecked, defectsExist, '-',
                ], //these are the values that will be input into a single row, order matters
            ]
        }
    });

    const allDefects = [
        hdS1, hd9A, hd9B, hdC1, hdC3A, hdC7, hdSTCON,
        hdSTF, hdBIN, hdC4, hdC8, hdPS, hdS6, hdS7, hdC22,
        hdC23, hdC24, hdC25, hdC26, hdC27, hdC28,
        hdC29, hdC30, hdC31, hdC32, hdC33, hdC35,
        hdC36, hdC37, hdC38, hdST5, hdST6,

        hgS1, hg9A, hg9B, hgC1, hgC3A, hgC7, hgSTCON,
        hgSTF, hgBIN, hgC4, hgC8, hgPS, hgS6, hgS7, hgC22,
        hgC23, hgC24, hgC25, hgC26, hgC27, hgC28,
        hgC29, hgC30, hgC31, hgC32, hgC33, hgC35,
        hgC36, hgC37, hgC38, hgST5, hgST6,
    ]

    const prefixes = [
        'Si Dillion', 'Clam Gate 9A', 'Clam Gate 9B', 'C1', 'C3A', 'C7',
        'St Constant Con', 'St Const. Feeder', 'C4', 'C8', 'Powerscreen',
        'S6', 'S7', 'C22', 'C23', 'C24', 'C25', 'C26', 'C27', 'C28', 'C29',
        'C30', 'C31', 'C32', 'C33', 'C35', 'C36', 'C37', 'C38', 'ST-5', 'St-6'

    ]

    for (let i = 0; i < 31; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }

    const allDefectsString = allDefects.filter(Boolean).join("\n");

    const allPriorities = [
        pS1, p9A, p9B, pC1, pC3A, pC7, pSTCON,
        pSTF, pBIN, pC4, pC8, pPS, pS6, pS7, pC22,
        pC23, pC24, pC25, pC26, pC27, pC28,
        pC29, pC30, pC31, pC32, pC33, pC35,
        pC36, pC37, pC38, pST5, pST6,
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-LDSP!A:E",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [date, employee, sections, allPrioritiesString, allDefectsString, '-',
                    ]
                ]
            }
        })
    }


    // res.redirect("/")
    res.redirect("/limeDSPChecklist");

}