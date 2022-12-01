function triggerFormSubmit() {
  ScriptApp.newTrigger("handlerFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create()
}
function handlerFormSubmit(submitEvent) {
  if(submitEvent.namedValues["圖檔"][0].length!==0){
     resizeSubmitGraph(submitEvent.namedValues["圖檔"][0], submitEvent.range.getRow())
  }
  createWeeklyHomeworkSheetFromSubmitEvent(submitEvent)
}
function triggerOnOpen(){
  ScriptApp.newTrigger("showSidebar")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onOpen()
    .create()
}