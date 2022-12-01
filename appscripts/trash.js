function createResizeGraph(){
  // prepare array of observation objects
  const data = readSheet()
  const dataObject = convertArrayObservationsToArrayObjects(data)
  dataObject.splice(0,1) // take out the 1st element, which leaves dataObject with the remains
  var resizeGraphId;
  // resize graph and get its img src url
  var row;
  for(let i=0; i<dataObject.length;i++){
    row=i+2
    if(dataObject[i].resizeGraphId!=="") continue
    resizeGraphId = getResizedFileIdFromFileUrl(
      dataObject[i].graphPath
    )
    appendCellValueUpdate(`H${row}:I${row}`, 
      [resizeGraphId, `https://drive.google.com/uc?export=view&id=${resizeGraphId}`])
  }
  request = {
      'valueInputOption': 'USER_ENTERED',
      'data': updateData
    }
  Sheets.Spreadsheets.Values.batchUpdate(request, "1yu6fB5YKjG98Wvo4r4q_1y1zxAsduEfQoo4C78u0bQk")
  updateData=[]
}

function _appendCellValueUpdate(cellA1notation,valueArray){
  updateData.push({
    range: `Sheet3!${cellA1notation}`,
    majorDimension: "ROWS",
    values: [
      valueArray
    ]
  })
}

function triggerFormSubmit2() {
  ScriptApp.newTrigger("test")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create()
}
function test(submitEvent){
  Logger.log(submitEvent)
  Logger.log(Object.keys(submitEvent))
  //namedValues, range, source, triggerUid, values
  Logger.log(submitEvent.namedValues["圖檔"][0].length)
  Logger.log(submitEvent.range)
  Logger.log(submitEvent.range.getRow())
  Logger.log(submitEvent.range.getValues())
  Logger.log(submitEvent.source)
  Logger.log(submitEvent.values)
}