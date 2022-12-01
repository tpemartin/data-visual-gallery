function doGet(e){
  Logger.log('menu is '+e.parameter.menu)
  Logger.log(e.parameter?1:0)
  Logger.log(e.parameter.menu===1)
  var returnValue={}
  if(e.parameter.menu){
    Logger.log('prepare menu')
    returnValue.menu=listHomeworkIds()
  }
  if(e.parameter.homeworkId){
    Logger.log('prepare weekly graph')
    returnValue.data=prepareDataForGET(e.parameter.homeworkId)
  }
  Logger.log(returnValue.data)
  return ContentService.createTextOutput(JSON.stringify(returnValue)).setMimeType(ContentService.MimeType.JSON);
}

function prepareDataForGET(sheetname="Sheet3"){
  const sheet = getSheetConditional(sheetname)
  const data = readSheetData(sheet)
  Logger.log(data)
  const dataObject = convertArrayObservationsToArrayObjects(data)
  return dataObject
}

/* helpers         */

function readSheetData(sheet2) {
  // const spSheet = SpreadsheetApp.getActiveSpreadsheet()
  // // check if there is a lock sheet, if true, returned locksheetname; else sheetname
  // const sheet2 = spSheet.getSheetByName(sheetname)
  
  const range = sheet2.getDataRange()
  var data = range.getValues()
  
  return data
}
function convertArrayObservationsToArrayObjects(data){
  //data = readSheet()
  var sheetKeys = data[0]

  function objectifyOneRowData(oneRow){
    var oneRowObject = objectifyArrayWithKeys(oneRow, sheetKeys)
    //Logger.log(oneRowObject)
    return oneRowObject
  }
  const objectifiedData = data.map(e => objectifyOneRowData(e))
  return objectifiedData
}

function objectifyArrayWithKeys(array, keys){
  var obj_i = {}
  array.forEach((e,i)=>obj_i[keys[i]]=e)
  return obj_i
}