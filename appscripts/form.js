//https://developers.google.com/apps-script/reference/forms
//put sheet that to be formed a form on UI top of your spreadsheet, then run the following function. The sheet will produce a lock copy, with which the client UI will be based on.
function createForm(){
  var [totalGraphs, sheetname]= getTotalGraphsFromActiveSheetAndLockIt()
  createGraphNumber(sheetname)
  var form = FormApp.create(`資料視覺化${sheetname}評分單`)
  form.addTextItem().setRequired(true).setTitle("姓名")
  form.addTextItem().setRequired(true).setTitle("學號")
  var griditem = form.addGridItem().setRequired(true);
  griditem.setTitle('每張圖均需給分（含自己的，但計算時會排除）')
      .setRows([...Array(totalGraphs).keys()].map(e=>`圖${e+1}`))
      .setColumns(['5','4','3','2','1']);

  form.setLimitOneResponsePerUser(true)
    .setAllowResponseEdits(false)
    .setCollectEmail(true)  
    
  var url = form.getEditUrl()
  var urls = {
    edit: form.getEditUrl(),
    view: form.getPublishedUrl(),
    message: "Currently only @gm.ntpu.edu.tw can fill the form."
  }
  var iframe = `<iframe src="${urls.view}?embedded=true" width="440" height="1013" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`
  Logger.log(urls)
  Logger.log({urls: urls, iframe: iframe})
  return {urls: urls, iframe: iframe}
}

//helpers
function getTotalGraphsFromActiveSheetAndLockIt(){
  // let homeworkId="111-1-week11"
  const sp=SpreadsheetApp.getActiveSpreadsheet()
  var sheet=sp.getActiveSheet()
  var sheetname = sheet.getName()
  var range=sheet.getDataRange()
  var row=range.getNumRows()
  var totalGraphs=row-1
  writeInLockSheet(sp,sheetname)
  return [totalGraphs, sheetname]
}

