function listHomeworkIds2() {
  var pivotTb = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pivot Table 1");
  Logger.log(pivotTb.getDataRange().getValues().splice(0,2))
  var values = pivotTb.getDataRange().getValues()
  values.splice(0,2)
  var homeworkIds=values.map(e=> e[0])
  Logger.log(homeworkIds)
  return homeworkIds
}
function listHomeworkIds() {
  var pivotTb = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pivot Table 1");
  var values = pivotTb.getRange("D2:D10").getValues()
  
  var homeworkIds=values.map(e=>e[0]).filter(e => e!=='')
  Logger.log(homeworkIds)
  return homeworkIds
}
function filterHomework(submitEventHomeworkId="111-1-week7", existingSheetnames=["111-1-week7"]) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet3 = spreadsheet.getSheetByName("Sheet3");
  var range = sheet3.getDataRange()
  // Apply filter to range
  let criteria = SpreadsheetApp.newFilterCriteria().whenTextEqualTo(submitEventHomeworkId) //.build() 
  let criteria2 = SpreadsheetApp.newFilterCriteria().whenTextEqualTo("valid")//.build()
  var filter = range.createFilter()
  filter
    .setColumnFilterCriteria(5, criteria)
    .setColumnFilterCriteria(11,criteria2)
  
  var targetSheet
  if(!existingSheetnames.includes(submitEventHomeworkId)){
    const newsheet = spreadsheet.insertSheet()
    newsheet.setName(submitEventHomeworkId)
    targetSheet = newsheet
  } else {
    targetSheet = spreadsheet.getSheetByName(submitEventHomeworkId)
    targetSheet.clear()
  } 
  
  range.copyTo(targetSheet.getRange(1,1),SpreadsheetApp.CopyPasteType.PASTE_VALUES, false )

  filter.remove()

}
function createWeeklyHomeworkSheetFromSubmitEvent(submitEvent){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet= spreadsheet.getSheetByName("Form Responses 1")
  var row = submitEvent.range.getLastRow()
  var submitEventHomeworkId = sheet.getRange("E"+row).getValue()
  var submitEventSchoolId = sheet.getRange("D"+row).getValue()
  sheet.getRange("J"+row).setValue((submitEventSchoolId==="001")?"invalid":"valid")
 
  var sheetnames = spreadsheet.getSheets().map(e=>e.getSheetName())
  filterHomework(submitEventHomeworkId, sheetnames)
}
function createWeeklyHomeworkSheet(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheetnames = spreadsheet.getSheets().map(e=>e.getSheetName())
  var pvTable = spreadsheet.getSheetByName("Pivot Table 1");
  var values = pvTable.getDataRange().getValues().map(e=> e[0])
  values = values.filter((e)=> !["homeworkId", ""].includes(e))

  values.forEach(e=> filterHomework(e, sheetnames))
  Logger.log(values)
}