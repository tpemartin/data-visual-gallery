var updateData=[];
var request
function resizeSubmitGraph(graphPath="https://drive.google.com/open?id=1KRiZhEhKo2Jx1txMSC8H5iedtRMOggTr", row=2){
  resizeGraphId = getResizedFileIdFromFileUrl(
    graphPath
  )
  appendCellValueUpdate(`I${row}:J${row}`, 
    [resizeGraphId, `https://drive.google.com/uc?export=view&id=${resizeGraphId}`])
  request = {
      'valueInputOption': 'RAW',//'USER_ENTERED',
      'data': updateData
    }
  Sheets.Spreadsheets.Values.batchUpdate(request, "1yu6fB5YKjG98Wvo4r4q_1y1zxAsduEfQoo4C78u0bQk")
  updateData=[]
}
function appendCellValueUpdate(cellA1notation,valueArray){
  updateData.push({
    range: `Sheet3!${cellA1notation}`,
    majorDimension: "ROWS",
    values: [
      valueArray
    ]
  })
}
function getResizedFileIdFromFileUrl(url, width=800) {
  // url = "https://drive.google.com/open?id=1lFRCqrzzlGXAN4RkQth8PJxDBBHfnJty"
  var fileId = url.split("id=")[1]
  var file = DriveApp.getFileById(fileId)
  var filename = DriveApp.getFileById(fileId).getName()
  var link = Drive.Files.get(fileId).thumbnailLink.replace(/\=s.+/, "=s" + width);
   Logger.log(filename)
  var resizefilename = filename.replace(/\.(?=(png|jpe?g|JPE?G|PNG)$)/,`x${width}.`)
  Logger.log(resizefilename)
  var blob2 = UrlFetchApp.fetch(link).getBlob().setName(resizefilename);
  var resizefile = DriveApp.createFile(blob2);
  var destFolder = DriveApp.getFolderById("1lwgeye-Xzs5Z9hXD_v4GiZ4r6ctNdoiR")
  resizefile.moveTo(destFolder)
  var resizefileId = resizefile.getId()
  Logger.log(getImgSrcFromFileId(resizefileId))
  return resizefileId
}
function getImgSrcFromFileId(fileId){
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}
