function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sheetsSidebar');
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}