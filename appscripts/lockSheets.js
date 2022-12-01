function getSheetConditional(sheetname="111-1-week11") {
  const spSheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheetLock = spSheet.getSheetByName("lockSheet")
  const values = sheetLock.getDataRange().getValues().map(e=>e[0])
  const flag_shouldBeLocked = values.includes(sheetname)
  const lockSheetname=sheetname +"-lock"
  //Logger.log(spSheet.getSheets().map(e=>e.getSheetName()))
  const flag_hasSheetLocked = spSheet.getSheets().map(e=>e.getSheetName()).includes(lockSheetname)
  //Logger.log(flag_hasSheetLocked)
  if(!flag_shouldBeLocked){
    return spSheet.getSheetByName(sheetname)
  } else if(flag_shouldBeLocked && flag_hasSheetLocked){
    return spSheet.getSheetByName(lockSheetname)
  } else {
    const sourceSheet = spSheet.getSheetByName(sheetname)
    const newSheet = sourceSheet.copyTo(spSheet)
    newSheet.setName(lockSheetname)
    return newSheet
  }
}
function lockSheetInActiveSpreadsheet(sheetname){
   const sp=SpreadsheetApp.getActiveSpreadsheet()
   const sheet = sp.getSheetByName(sheetname)
   const newSheet = sheet.copyTo(sp)
   newSheet.setName(sheet.getName()+'-lock')

}
function writeInLockSheet(sp,sheetname){

   const sheetLock = sp.getSheetByName("lockSheet")
  //  Logger.log(sheetLock.getDataRange().getNumRows())
   const row = sheetLock.getDataRange().getNumRows()+1
   sheetLock.getRange('A'+row).setValue(sheetname)
   lockSheetInActiveSpreadsheet(sheetname)
}
function test(sheetname="111-1-week7"){
  const sheet = readSheetConditional(sheetname)
  Logger.log(sheet.getSheetName())
  return sheet
}
