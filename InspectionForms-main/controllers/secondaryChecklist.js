
const path = require('path');
const { google } = require('googleapis');

module.exports.renderSecondaryChecklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'views', 'secondaryChecklist.html'));
};



module.exports.postSecondaryChecklist = async (req, res) => {

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
        gCR1, hgCR1, hdCR1, dCR1, pCR1, itCR1, otCR1, opCR1,
        gCR2, hgCR2, hdCR2, dCR2, pCR2, ipCR2, ifCR2, opCR2, ofCR2,
        gCR3, hgCR3, hdCR3, dCR3, pCR3, ipCR3, ifCR3, opCR3, ofCR3,
        gCR4, hgCR4, hdCR4, dCR4, pCR4, orCR4, oopCR4, oofCR4,
        gS1A, hgS1A, hdS1A, dS1A, pS1A,
        gS1B, hgS1B, hdS1B, dS1B, pS1B,
        gS2A, hgS2A, hdS2A, dS2A, pS2A,
        gS2B, hgS2B, hdS2B, dS2B, pS2B,
        gS3A, hgS3A, hdS3A, dS3A, pS3A,
        gS3B, hgS3B, hdS3B, dS3B, pS3B,
        gS5, hgS5, hdS5, dS5, pS5,
        gC1, hgC1, hdC1, dC1, pC1,
        gC1A, hgC1A, hdC1A, dC1A, pC1A,
        gC1B, hgC1B, hdC1B, dC1B, pC1B,
        gC2, hgC2, hdC2, dC2, pC2,
        gC3A, hgC3A, hdC3A, dC3A, pC3A,
        gC3B, hgC3B, hdC3B, dC3B, pC3B,
        gC4A, hgC4A, hdC4A, dC4A, pC4A,
        gC4B, hgC4B, hdC4B, dC4B, pC4B,
        gC5, hgC5, hdC5, dC5, pC5,
        gC6, hgC6, hdC6, dC6, pC6,
        gC7, hgC7, hdC7, dC7, pC7,
        gC8, hgC8, hdC8, dC8, pC8,
        gC9, hgC9, hdC9, dC9, pC9,
        gC11, hgC11, hdC11, dC11, pC11,
        gC12, hgC12, hdC12, dC12, pC12,
        gC20, hgC20, hdC20, dC20, pC20,
        gC21, hgC21, hdC21, dC21, pC21,
        gFCD, hgFCD, hdFCD, dFCD, pFCD,
        gCC1, hgCC1, hdCC1, dCC1, pCC1,
        gCC3, hgCC3, hdCC3, dCC3, pCC3,
        gCC4, hgCC4, hdCC4, dCC4, pCC4,
        gCC5, hgCC5, hdCC5, dCC5, pCC5,
        gCC6, hgCC6, hdCC6, dCC6, pCC6,
        gCC7, hgCC7, hdCC7, dCC7, pCC7,
        gCC12, hgCC12, hdCC12, dCC12, pCC12,
        gCC13, hgCC13, hdCC13, dCC13, pCC13,
        gST2, hgST2, hdST2, dST2, pST2,
        gST3, hgST3, hdST3, dST3, pST3,
        gST8, hgST8, hdST8, dST8, pST8,
        gST9, hgST9, hdST9, dST9, pST9,
        gBP1, hgBP1, hdBP1, dBP1, pBP1,
        gBP2, hgBP2, hdBP2, dBP2, pBP2,
        gBP3, hgBP3, hdBP3, dBP3, pBP3,
        gBP4, hgBP4, hdBP4, dBP4, pBP4,
        gVF4, hgVF4, hdVF4, dVF4, pVF4,
        gVF6, hgVF6, hdVF6, dVF6, pVF6,
        gVF7, hgVF7, hdVF7, dVF7, pVF7,
        gVF8, hgVF8, hdVF8, dVF8, pVF8,
        gVF9, hgVF9, hdVF9, dVF9, pVF9,
        gVF10, hgVF10, hdVF10, dVF10, pVF10,
        gVF11, hgVF11, hdVF11, dVF11, pVF11,
        gVF12, hgVF12, hdVF12, dVF12, pVF12,
        hdBUILDINGS, dBUILDINGS, pBUILDINGS


    } = req.body;

    const defectives = {
        dCR1: dCR1, dCR2: dCR2, dCR3: dCR3, dCR4: dCR4,
        dS1A: dS1A, dS1B: dS1B, dS2A: dS2A, dS2B: dS2B,
        dS3A: dS3A, dS3B: dS3B, dC1: dC1, dC1A: dC1A,
        dC1B: dC1B, dC2: dC2, dC3A: dC3A, dC3B: dC3B, dC4A: dC4A,
        dC4B: dC4B, dC5: dC5, dC6: dC6, dC7: dC7, gd8: dC8,
        dC9: dC9, dC11: dC11, dC12: dC12, dC20: dC20, dC21: dC21,
        dFCD: dFCD, dCC1: dCC1, dCC3: dCC3, dCC4: dCC4,
        dCC5: dCC5, dCC6: dCC6, dCC7: dCC7, dCC12: dCC12, dCC13: dCC13,
        dST2: dST2, dST3: dST3, dST8: dST8, dST9: dST9,
        dBP1: dBP1, dBP2: dBP2, dBP3: dBP3, dBP4: dBP4,
        dVF4: dVF4, dVF6: dVF6, dVF7: dVF7, dVF8: dVF8,
        dVF9: dVF9, dVF10: dVF10, dVF11: dVF11, dVF12: dVF12, dBUILDINGS: dBUILDINGS,
    }
    const guards = {
        gCR1: gCR1, gCR2: gCR2, gCR3: gCR3, gCR4: gCR4,
        gS1A: gS1A, gS1B: gS1B, gS2A: gS2A, gS2B: gS2B,
        gS3A: gS3A, gS3B: gS3B, gC1: gC1, gC1A: gC1A,
        gC1B: gC1B, gC2: gC2, gC3A: gC3A, gC3B: gC3B, gC4A: gC4A,
        gC4B: gC4B, gC5: gC5, gC6: gC6, gC7: gC7, gC8: gC8,
        gC9: gC9, gC11: gC11, gC12: gC12, gC20: gC20, gC21: gC21,
        gFCD: gFCD, gCC1: gCC1, gCC3: gCC3, gCC4: gCC4,
        gCC5: gCC5, gCC6: gCC6, gCC7: gCC7, gCC12: gCC12, gCC13: gCC13,
        gST2: gST2, gST3: gST3, gST8: gST8, gST9: gST9,
        gBP1: gBP1, gBP2: gBP2, gBP3: gBP3, gBP4: gBP4,
        gVF4: gVF4, gVF6: gVF6, gVF7: gVF7, gVF8: gVF8,
        gVF9: gVF9, gVF10: gVF10, gVF11: gVF11, gVF12: gVF12,


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
        range: "Secondary!A:AB", //state the horizontal range and which sheet you are appending data to
        valueInputOption: "USER_ENTERED", //This will convert data into proper formats (like date into date not string), so won't take raw data
        resource: {
            values: [
                [date, employee, shift,
                    itCR1, otCR1, opCR1,
                    ipCR2, ifCR2, opCR2, ofCR2,
                    ipCR3, ifCR3, opCR3, ofCR3,
                    orCR4, oopCR4, oofCR4,
                    isAllGuardsChecked, defectsExist, '-',
                ], //these are the values that will be input into a single row, order matters
            ]
        }
    });

    const allDefects = [
        hdCR1, hdCR2, hdCR3, hdCR4, hdS1A, hdS1B, hdS2A, hdS2B,
        hdS3A, hdS3B, hdC1, hdC1A, hdC1B, hdC2, hdC3A, hdC3B, hdC4A,
        hdC4B, hdC5, hdC6, hdC7, hdC8, hdC9, hdC11, hdC12, hdC20, hdC21,
        hdFCD, hdCC1, hdCC3, hdCC4, hdCC5, hdCC6, hdCC7, hdCC12, hdCC13, hdST2, hdST3, hdST8, hdST9, hdBP1, hdBP2,
        hdBP3, hdBP4, hdVF4, hdVF6, hdVF7, hdVF8, hdVF9, hdVF10, hdVF11, hdVF12, hdBUILDINGS,

        hgCR1, hgCR2, hgCR3, hgCR4, hgS1A, hgS1B, hgS2A, hgS2B,
        hgS3A, hgS3B, hgC1, hgC1A, hgC1B, hgC2, hgC3A, hgC3B, hgC4A,
        hgC4B, hgC5, hgC6, hgC7, hgC8, hgC9, hgC11, hgC12, hgC20, hgC21,
        hgFCD, hgCC1, hgCC3, hgCC4, hgCC5, hgCC6, hgCC7, hgCC12, hgCC13, hgST2, hgST3, hgST8, hgST9, hgBP1, hgBP2,
        hgBP3, hgBP4, hgVF4, hgVF6, hgVF7, hgVF8, hgVF9, hgVF10, hgVF11, hgVF12,
    ]

    const prefixes = [
        'CR1', 'CR2', 'CR3', 'CR4', 'S1A', 'S1B', 'S2A',
        'S2B', 'S3A', 'S3B', 'C1', 'C1A', 'C1B',
        'C2', 'C3A', 'C3B', 'C4A', 'C4B', 'C5', 'C6', 'C7',
        'C8', 'C9', 'C11', 'C12', 'C20', 'C21', 'FCD', 'CC1',
        'CC3', 'CC4', 'CC5', 'CC6', 'CC7',
        'CC12', 'CC13', 'ST2', 'ST3', 'ST8', 'ST9', 'BP1', 'BP2',
        'BP3', 'BP4', 'Feeder VF4', 'Feeder VF6', 'Feeder VF7',
        'Feeder VF8', 'Feeder VF9', 'Feeder VF10', 'Feeder VF11',
        'Feeder VF12', 'Bulildings'
    ]

    for (let i = 0; i < 53; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }
    const allDefectsString = allDefects.filter(Boolean).join("\n");

    const allPriorities = [
        pCR1, pCR2, pCR3, pCR4, pS1A, pS1B, pS2A, pS2B,
        pS3A, pS3B, pC1, pC1A, pC1B, pC2, pC3A, pC3B, pC4A,
        pC4B, pC5, pC6, pC7, pC8, pC9, pC11, pC12, pC20, pC21,
        pFCD, pCC1, pCC3, pCC4, pCC5, pCC6, pCC7, pCC12, pCC13, pST2, pST3, pST8, pST9, pBP1, pBP2,
        pBP3, pBP4, pVF4, pVF6, pVF7, pVF8, pVF9, pVF10, pVF11, pVF12, pBUILDINGS
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-S!A:E",
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
    res.redirect("/secondaryChecklist");

}