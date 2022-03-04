
const path = require('path');
const { google } = require('googleapis');

module.exports.renderPrimaryChecklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'views', 'primaryCheklist.html'));
};



module.exports.postPrimaryChecklist = async (req, res) => {

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
    //INSERT ALL CONTROLLERS BELOW, FOLLOWING THE SAME FORMAT
    const {
        employee, date, shift, sections,
        gGYRATORY, dGYRATORY, hgGYRATORY, hdGYRATORY, pGYRATORY,
        gAISCO, dAISCO, hgAISCO, hdAISCO, pAISCO,
        gTELEDYNE, dTELEDYNE, hgTELEDYNE, hdTELEDYNE, pTELEDYNE,
        gPUMP, dPUMP, hgPUMP, hdPUMP, pPUMP,
        gSUB, dSUB, hgSUB, hdSUB, pSUB,
        gBELT, dBELT, hgBELT, hdBELT, pBELT,
        gSTACKER, dSTACKER, hgSTACKER, hdSTACKER, pSTACKER,
        gDUST, dDUST, hgDUST, hdDUST, pDUST,
        gCOMPRESSOR, dCOMPRESSOR, hgCOMPRESSOR, hdCOMPRESSOR, pCOMPRESSOR,
        gCBELT, dCBELT, hgCBELT, hdCBELT, pCBELT,
        gC1P, dC1P, hgC1P, hdC1P, pC1P,
        gC2P, dC2P, hgC2P, hdC2P, pC2P,
        gVF1, dVF1, hgVF1, hdVF1, pVF1,
        gVF2, dVF2, hgVF2, hdVF2, pVF2,
        gVF3, dVF3, hgVF3, hdVF3, pVF3,
        gVF5, dVF5, hgVF5, hdVF5, pVF5,

    } = req.body;

    //REPLACE ALL DOLLAR SIGNS ($$) WITH THE UNIT NAME CHOSEN ON THE .HTML FILE
    //INSERT DEFECT CONTROLLERS IN THE FOLLOWING FORMAT: d$$: d$$
    const defectives = {
        dGYRATORY: dGYRATORY, dAISCO: dAISCO, dTELEDYNE: dTELEDYNE,
        dPUMP: dPUMP, dSUB: dSUB, gBELT: dBELT, dSTACKER: dSTACKER,
        dDUST: dDUST, dCOMPRESSOR: dCOMPRESSOR, dCBelt: dCBELT, dC1P: dC1P, dC2P: dC2P,
        dVF1: dVF1, dVF2: dVF2, dVF2: dVF2, dVF3: dVF3, dVF5: dVF5,
    }

    //INSERT GUARD CONTROLLERS IN THE FOLLOWING FORMAT: g$$: g$$
    const guards = {
        gGYRATORY: gGYRATORY, gAISCO: gAISCO, gTELEDYNE: gTELEDYNE,
        gPUMP: gPUMP, gSUB: gSUB, gBELT: gBELT, gSTACKER: gSTACKER,
        gDUST: gDUST, gCOMPRESSOR: gCOMPRESSOR, gCBelt: gCBELT, gC1P: gC1P, gC2P: gC2P,
        gVF1: gVF1, gVF2: gVF2, gVF2: gVF2, gVF3: gVF3, gVF5: gVF5,
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
        range: "Primary!A:M", //GOOGLE SHEET NAME & RANGE
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
        //REPLACE ALL DOLLAR SIGNS ($$) WITH THE UNIT NAME CHOSEN ON THE .HTML FILE
        //INSERT hd$$ BELOW
        hdGYRATORY, hdAISCO, hdTELEDYNE, hdPUMP, hdSUB, hdBELT, hdSTACKER,
        hdDUST, hdCOMPRESSOR, hdCBELT, hdC1P, hdC2P, hdVF1, hdVF2, hdVF3, hdVF5,
        //INSERT hg$$ BELOW
        hgGYRATORY, hgAISCO, hgTELEDYNE, hgPUMP, hgSUB, hgBELT, hgSTACKER,
        hgDUST, hgCOMPRESSOR, hgCBELT, hgC1P, hgC2P, hgVF1, hgVF2, hgVF3, hgVF5,
    ]

    const prefixes = 
        //PREFIX FOR DEFECTS THAT APPEARS IN SHEET - IN ORDER IT APPEARS ON FORM!
        ['Gyratory', 'Aisco Feeder', 'Teledyne', 'Sump pump',
        'Primary sub', 'Incline Belt', 'Stacker', 'Dust Collector', 'Compressor',
        'Cable Belt', 'Conveyor C1P', 'Stacker C2P', 'Feeder VF1', 'Feeder VF2',
        'Feeder VF3', 'Feeder VF5'] 

    //CHANGE THE NUMBER FOLLOWING "i < " TO THE # OF ITEMS IN THE LIST ABOVE (const prefixes)
    for (let i = 0; i < 16; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }

    const allDefectsString = allDefects.filter(Boolean);//.join("\n");

    const allPriorities = [
        //REPLACE ALL DOLLAR SIGNS ($$) WITH THE UNIT NAME CHOSEN ON THE .HTML FILE
        //INSERT p$$ TO THE LIST BELOW
        pGYRATORY, pAISCO, pTELEDYNE, pPUMP, pSUB,
        pBELT, pSTACKER, pDUST, pCOMPRESSOR, pCBELT, pC1P,
        pC2P, pVF1, pVF2, pVF3, pVF5,
    ]
    const allPrioritiesString = allPriorities.filter(Boolean);//.join("\n");
/*
    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-P!B:F",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [date, employee, sections, allPrioritiesString, allDefectsString, '-',
                    ]
                ]
            }
        })
    }
*/

for (let p = 0; p < defectArray.length; p++) {
    if (defectArray.length) {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Backlog-P!B:F",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [date, employee, sections, allPrioritiesString[p], allDefectsString[p], '-',
                    ]
                ]
            }
        })
    }
}

    // res.redirect("/")
    res.redirect("/primaryChecklist");

}