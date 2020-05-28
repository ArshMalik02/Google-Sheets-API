//https://googleapis.dev/nodejs/googleapis/latest/sheets/classes/Sheets.html


const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(function(err,tokens){
    if (err){
        console.log(err)
        return
    }
    else {
        console.log('connected')
        gsrun(client);
    }

});

async function gsrun(cl){

    const gsapi = google.sheets({version:'v4', auth: cl});
    const opt = {
        spreadsheetId:'1dCDFg2RRtXJUrf6LR7-6oBULjzuX4Z00gGN8oT0KC2o',
        range: 'Name!A1:B4'
    }
    let data = await gsapi.spreadsheets.values.get(opt)
    let dataArray = data.data.values;
    console.log(dataArray);
    let newDataArray = dataArray.map(function(r){
        r.push( 'pro' ); 
        return r;
    })

    const updateOptions = {
        spreadsheetId:'1dCDFg2RRtXJUrf6LR7-6oBULjzuX4Z00gGN8oT0KC2o',
        range: 'Name!A1',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray}
    }
    let res = await gsapi.spreadsheets.values.update(updateOptions); 
    console.log(res)   
}