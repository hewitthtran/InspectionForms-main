const path = require('path');
const { google } = require('googleapis');

module.exports.renderWashPlantChecklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'views', 'washPlantChecklist.html'));
};



module.exports.postWashPlantChecklist = async (req, res) => {

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
        gWS1, dWS1, hgWS1, hdWS1, pWS1, ftWS1, stWS1,
        gWS2, dWS2, hgWS2, hdWS2, pWS2, ftWS2, stWS2,
        gWS3, dWS3, hgWS3, hdWS3, pWS3, ftWS3, stWS3,
        gWS4, dWS4, hgWS4, hdWS4, pWS4, ftWS4, stWS4,
        gCLASS, dCLASS, hgCLASS, hdCLASS, pCLASS,
        gSINGLE, dSINGLE, hgSINGLE, hdSINGLE, pSINGLE, ftSINGLE,
        gTWIN, dTWIN, hgTWIN, hdTWIN, pTWIN, ftTWIN,
        gWC1, dWC1, hgWC1, hdWC1, pWC1, ftWC1,
        gWC2, dWC2, hgWC2, hdWC2, pWC2, ftWC2,
        gWC3, dWC3, hgWC3, hdWC3, pWC3, ftWC3,
        gWC4, dWC4, hgWC4, hdWC4, pWC4, ftWC4,
        gW144, dW144, hgW144, hdW144, pW144, ftW144,
        gW142, dW142, hgW142, hdW142, pW142, ftW142,
        gWC5, dWC5, hgWC5, hdWC5, pWC5, ftWC5,
        gWC6, dWC6, hgWC6, hdWC6, pWC6, ftWC6,
        gWC6A, dWC6A, hgWC6A, hdWC6A, pWC6A, ftWC6A,
        gWC7, dWC7, hgWC7, hdWC7, pWC7, ftWC7,
        gWC8, dWC8, hgWC8, hdWC8, pWC8, ftWC8,
        gWC9, dWC9, hgWC9, hdWC9, pWC9, ftWC9,
        gWC146, dWC146, hgWC146, hdWC146, pWC146, ftWC146,
        gWC10, dWC10, hgWC10, hdWC10, pWC10, ftWC10,
        gWC11, dWC11, hgWC11, hdWC11, pWC11, ftWC11,
        gW148, dW148, hgW148, hdW148, pW148, ftW148,
        gFCN, dFCN, hgFCN, hdFCN, pFCN, ftFCN,
        gST145, dST145, hgST145, hdST145, pST145, ftST145,
        gST143, dST143, hgST143, hdST143, pST143, ftST143,
        gST123, dST123, hgST123, hdST123, pST123, ftST123,
        gST135, dST135, hgST135, hdST135, pST135, ftST135,
        gST147, dST147, hgST147, hdST147, pST147, ftST147,
        gST148, dST148, hgST148, hdST148, pST148, ftST148,
        gCG1, dCG1, hgCG1, hdCG1, pCG1,
        gCG2, dCG2, hgCG2, hdCG2, pCG2,
        gCG3, dCG3, hgCG3, hdCG3, pCG3,
        gCG4, dCG4, hgCG4, hdCG4, pCG4,
        gCG5, dCG5, hgCG5, hdCG5, pCG5,
        gCG6, dCG6, hgCG6, hdCG6, pCG6,
        gSPUMP, dSPUMP, hgSPUMP, hdSPUMP, pSPUMP,
        gFPUMP, dFPUMP, hgFPUMP, hdFPUMP, pFPUMP,
        gNSS, dNSS, hgNSS, hdNSS, pNSS,
        gSSS, dSSS, hgSSS, hdSSS, pSSS,
    } = req.body;

    const defectives = {
        dWS1: dWS1, dWS2: dWS2, dWS3: dWS3, dWS4: dWS4,
        dCLASS: dCLASS, dSINGLE: dSINGLE, dTWIN: dTWIN,
        dWC1: dWC1, dWC2: dWC2, dWC3: dWC3, dWC4: dWC4,
        dW144: dW144, dW142: dW142, dWC5: dWC5, dWC6: dWC6,
        dWC6A: dWC6A, dWC7: dWC7, dWC8: dWC8, dWC9: dWC9,
        dWC146: dWC146, dWC10: dWC10, dWC11: dWC11,
        dW148: dW148, dFCN: dFCN, dST145: dST145, dST143: dST143,
        dST123: dST123, dST135: dST135, dST147: dST147,
        dST148: dST148, dCG1: dCG1, dCG2: dCG2, dCG3: dCG3,
        dCG4: dCG4, dCG5: dCG5, dCG6: dCG6, dSPUMP: dSPUMP,
        dFPUMP: dFPUMP, dNSS: dNSS, dSSS: dSSS,
    }
    const guards = {
        gWS1: gWS1, gWS2: gWS2, gWS3: gWS3, gWS4: gWS4,
        gCLASS: gCLASS, gSINGLE: gSINGLE, gTWIN: gTWIN,
        gWC1: gWC1, gWC2: gWC2, gWC3: gWC3, gWC4: gWC4,
        gW144: gW144, gW142: gW142, gWC5: gWC5, gWC6: gWC6,
        gWC6A: gWC6A, gWC7: gWC7, gWC8: gWC8, gWC9: gWC9,
        gWC146: gWC146, gWC10: gWC10, gWC11: gWC11,
        gW148: gW148, gFCN: gFCN, gST145: gST145, gST143: gST143,
        gST123: gST123, gST135: gST135, gST147: gST147,
        gST148: gST148, gCG1: gCG1, gCG2: gCG2, gCG3: gCG3,
        gCG4: gCG4, gCG5: gCG5, gCG6: gCG6, gSPUMP: gSPUMP,
        gFPUMP: gFPUMP, gNSS: gNSS, gSSS: gSSS,

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
        range: "Wash-Plant!A:AM", //state the horizontal range and which sheet you are appending data to
        valueInputOption: "USER_ENTERED", //This will convert data into proper formats (like date into date not string), so won't take raw data
        resource: {
            values: [
                [
                    date, employee, shift,
                    ftWS1, stWS1, ftWS2, stWS2,
                    ftWS3, stWS3, ftWS4, stWS4,
                    ftSINGLE, ftTWIN, ftWC1, ftWC2, ftWC3, ftWC4,
                    ftW144, ftW142, ftWC5, ftWC6, ftWC6A, ftWC7,
                    ftWC8, ftWC9, ftWC146, ftWC10, ftWC11, ftW148,
                    ftFCN, ftST145, ftST143, ftST123, ftST135,
                    ftST147, ftST148,
                    isAllGuardsChecked, defectsExist, '-',
                ], //these are the values that will be input into a single row, order matters
            ]
        }
    });

    const allDefects = [
        hdWS1, hdWS2, hdWS3, hdWS4, hdCLASS, hdSINGLE, hdTWIN,
        hdWC1, hdWC2, hdWC3, hdWC4, hdW144, hdW142, hdWC5, hdWC6,
        hdWC6A, hdWC7, hdWC8, hdWC9, hdWC146, hdWC10, hdWC11,
        hdW148, hdFCN, hdST145, hdST143, hdST123, hdST135, hdST147,
        hdST148, hdCG1, hdCG2, hdCG3, hdCG4, hdCG5, hdCG6, hdSPUMP,
        hdFPUMP, hdNSS, hdSSS,
        hgWS1, hgWS2, hgWS3, hgWS4, hgCLASS, hgSINGLE, hgTWIN,
        hgWC1, hgWC2, hgWC3, hgWC4, hgW144, hgW142, hgWC5, hgWC6,
        hgWC6A, hgWC7, hgWC8, hgWC9, hgWC146, hgWC10, hgWC11,
        hgW148, hgFCN, hgST145, hgST143, hgST123, hgST135, hgST147,
        hgST148, hgCG1, hgCG2, hgCG3, hgCG4, hgCG5, hgCG6, hgSPUMP,
        hgFPUMP, hgNSS, hgSSS,
    ]

    const prefixes = [
        'WS1', 'WS2', 'Classifer', '60" Single', '36" Twin', 'WC1', 'WC2', 'WC3', 'WC4',
        'W144', 'W142', 'WC5', 'WC6', 'WC6A', 'WC7', 'WC8', 'WC9', 'W146', 'WC10',
        'WC11', 'W148', 'FCN', 'ST 145', 'ST 143', 'ST 123', 'ST 135', 'ST 147',
        'ST 148', 'Clam Gate 1', 'Clam Gate 2', 'Clam Gate 3', 'Clam Gate 4', 'Clam Gate 5',
        'Clam Gate 6', 'Slurry Pump', 'Fr. Water Pump', 'North Sand Slurry', 'South Sand Slurry',
    ]


    for (let i = 0; i < 38; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }

    const allDefectsString = allDefects.filter(Boolean).join("\n");

    const allPriorities = [
        pWS1, pWS2, pWS3, pWS4, pCLASS, pSINGLE, pTWIN,
        pWC1, pWC2, pWC3, pWC4, pW144, pW142, pWC5, pWC6,
        pWC6A, pWC7, pWC8, pWC9, pWC146, pWC10, pWC11,
        pW148, pFCN, pST145, pST143, pST123, pST135, pST147,
        pST148, pCG1, pCG2, pCG3, pCG4, pCG5, pCG6, pSPUMP,
        pFPUMP, pNSS, pSSS,
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-WP!A:E",
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
    res.redirect("/washPlantChecklist");

}