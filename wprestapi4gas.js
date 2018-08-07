function clear(){
  // all data clear
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
}

function getwprestapi() {
  // all data clear
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();

  // target URL 4 customize
  var url_custom = "https://xxx.xx.xx";

  // set val
  var title_label = 'Title'
  var userName_label = 'Author'
  var postData_label = 'PublishedDate'
  var k = 2;
  var pageoff = 0;

  // label func
  sheet.getRange('A1').setValue(title_label);
  sheet.getRange('B1').setValue(userName_label);
  sheet.getRange('C1').setValue(postData_label);
  
  // get data while exist
  while(true) {
    var url_ref = "/wp-json/wp/v2/posts?per_page=50&offset=" + pageoff + "&status=publish&orderby=date&order=desc";
    var url = url_custom + url_ref
    var json = UrlFetchApp.fetch(url).getContentText();
    var data = JSON.parse(json);
    var len = data.length;
    Logger.log('loop:' + pageoff);

    // data parse
    for(var i = 0; i < len; i++){
      Logger.log('for:' + i);
      var title = data[i].title.rendered;
      var userJson = data[i]._links.author[0].href;
      var userData = UrlFetchApp.fetch(userJson).getContentText();
      var userName = JSON.parse(userData);
      var date = data[i].date;
      var postDate = date.substr(0, 4) + '/' + date.substr(5, 2) + '/' + date.substr(8, 2);      
      k = i + pageoff + 2;
      sheet.getRange('A' + k).setValue(title);
      sheet.getRange('B' + k).setValue(userName.name);
      sheet.getRange('C' + k).setValue(postDate);
    }
    if (len < 50){
      break;
    }
    pageoff = pageoff + 50;
  }
  
  // arrange List
  var range=sheet.getRange('A1:C' + k); 
  range.setBorder(true,true,true,true,true,true,'#c4c4c4',SpreadsheetApp.BorderStyle.SOLID);
  var range_label=sheet.getRange('A1:C1'); 
  range_label.setBackground('#d7ebff');
}

