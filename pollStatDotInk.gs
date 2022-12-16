//********************************************//
//              stats from stat.ink           //
//                 eat the data               //
//********************************************//

// very large hat tip to ben collins: https://www.benlcollins.com/apps-script/api-tutorial-for-beginners/

//creates a menu option on desktop to manually run the script (run this one once)
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('stats.ink')
      .addItem('Get stats!','pollStatDotInk')
      .addToUi();
}

// Don's array approach - checks first column only
// With added stopping condition & correct result.
// From answer https://stackoverflow.com/a/9102463/1677912
// modified to get last full row instead of first empty
function getLastFullRowByColumnArray() {
  var spr = SpreadsheetApp.getActiveSpreadsheet();
  var column = spr.getRange('A:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0;
  while ( values[ct] && values[ct][0] != "" ) {
    ct++;
  }
  return (ct);
}

//Main Function. Pulls data from stat.ink. ime the api caps at 100 shifts.
function pollStatDotInk() {
  var response = UrlFetchApp.fetch("https://stat.ink/@triangle/salmon3.json");
  var json = response.getContentText();
  var data = JSON.parse(json);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var output = [];
  var firstline = [["time","total kills","steelhead","flipper-flopper","fishstick","steel eel","flyfish","drizzler","maws","slamin lid","scrapper","stinger","big shot","king kills","king type","golden eggs","power eggs","revives","deaths"]];

  //checks if this is a new spreadsheet
  if (sheet.getRange(1,1).getCell(1,1).getValue() == "") {
    sheet.getRange(1,1,1,19).setValues(firstline);
  };

  //main loop
  data.forEach(function(elem,i) {
    //checks if this is the first time data has been pulled
    if (sheet.getRange(getLastFullRowByColumnArray(),1).getCell(1,1).getValue() == "time") {
      //creates variables for each boss
      if(elem["bosses"]["bakudan"]==null) {var steelhead = 0} else {var steelhead = elem["bosses"]["bakudan"]["defeated_by_me"]}; //steelhead
      if(elem["bosses"]["diver"]==null) {var flipperflopper = 0} else {var flipperflopper = elem["bosses"]["diver"]["defeated_by_me"]}; //flipperflopper
      if(elem["bosses"]["hashira"]==null) {var fishstick = 0} else {var fishstick = elem["bosses"]["hashira"]["defeated_by_me"]}; //fishstick
      if(elem["bosses"]["hebi"]==null) {var steeleel = 0} else {var steeleel = elem["bosses"]["hebi"]["defeated_by_me"]}; //steeleel
      if(elem["bosses"]["katapad"]==null) {var flyfish = 0} else {var flyfish = elem["bosses"]["katapad"]["defeated_by_me"]}; //flyfish
      if(elem["bosses"]["koumori"]==null) {var drizzler = 0} else {var drizzler = elem["bosses"]["koumori"]["defeated_by_me"]}; //drizzler
      if(elem["bosses"]["mogura"]==null) {var maws = 0} else {var maws = elem["bosses"]["mogura"]["defeated_by_me"]}; //maws
      if(elem["bosses"]["nabebuta"]==null) {var slaminlid = 0} else {var slaminlid = elem["bosses"]["nabebuta"]["defeated_by_me"]}; //slaminlid
      if(elem["bosses"]["teppan"]==null) {var scrapper = 0} else {var scrapper = elem["bosses"]["teppan"]["defeated_by_me"]}; //scrapper
      if(elem["bosses"]["tower"]==null) {var stinger = 0} else {var stinger = elem["bosses"]["tower"]["defeated_by_me"]}; //stinger
      if(elem["bosses"]["tekkyu"]==null) {var bigshot = 0} else {var bigshot = elem["bosses"]["tekkyu"]["defeated_by_me"]}; //bigshot
      if(elem["clear_extra"]==true) {var king = 1} else {var king = 0}; //king kills
      if(elem["king_salmonid"]==null) {var type = null} else {var type = elem["king_salmonid"]["name"]["en_US"]} //king name

      //creates 2D array of shifts
      output.push([elem["created_at"]["time"],elem["players"][0]["defeat_boss"],steelhead,flipperflopper,fishstick,steeleel,flyfish,drizzler,maws,slaminlid,scrapper,stinger,bigshot,king,type,elem["players"][0]["golden_eggs"],elem["players"][0]["power_eggs"],elem["players"][0]["rescue"],elem["players"][0]["rescued"]]); //rescue: me reviving. rescued: me dead.
    }
    //checks if there's any new data to add
    else if (sheet.getRange(getLastFullRowByColumnArray(),1).getCell(1,1).getValue() < elem["created_at"]["time"]) {
      //creates variables for each boss
      if(elem["bosses"]["bakudan"]==null) {var steelhead = 0} else {var steelhead = elem["bosses"]["bakudan"]["defeated_by_me"]}; //steelhead
      if(elem["bosses"]["diver"]==null) {var flipperflopper = 0} else {var flipperflopper = elem["bosses"]["diver"]["defeated_by_me"]}; //flipperflopper
      if(elem["bosses"]["hashira"]==null) {var fishstick = 0} else {var fishstick = elem["bosses"]["hashira"]["defeated_by_me"]}; //fishstick
      if(elem["bosses"]["hebi"]==null) {var steeleel = 0} else {var steeleel = elem["bosses"]["hebi"]["defeated_by_me"]}; //steeleel
      if(elem["bosses"]["katapad"]==null) {var flyfish = 0} else {var flyfish = elem["bosses"]["katapad"]["defeated_by_me"]}; //flyfish
      if(elem["bosses"]["koumori"]==null) {var drizzler = 0} else {var drizzler = elem["bosses"]["koumori"]["defeated_by_me"]}; //drizzler
      if(elem["bosses"]["mogura"]==null) {var maws = 0} else {var maws = elem["bosses"]["mogura"]["defeated_by_me"]}; //maws
      if(elem["bosses"]["nabebuta"]==null) {var slaminlid = 0} else {var slaminlid = elem["bosses"]["nabebuta"]["defeated_by_me"]}; //slaminlid
      if(elem["bosses"]["teppan"]==null) {var scrapper = 0} else {var scrapper = elem["bosses"]["teppan"]["defeated_by_me"]}; //scrapper
      if(elem["bosses"]["tower"]==null) {var stinger = 0} else {var stinger = elem["bosses"]["tower"]["defeated_by_me"]}; //stinger
      if(elem["bosses"]["tekkyu"]==null) {var bigshot = 0} else {var bigshot = elem["bosses"]["tekkyu"]["defeated_by_me"]}; //bigshot
      if(elem["clear_extra"]==true) {var king = 1} else {var king = 0}; //king kills
      if(elem["king_salmonid"]==null) {var type = null} else {var type = elem["king_salmonid"]["name"]["en_US"]} //king name

      //creates 2D array of shifts
      output.push([elem["created_at"]["time"],elem["players"][0]["defeat_boss"],steelhead,flipperflopper,fishstick,steeleel,flyfish,drizzler,maws,slaminlid,scrapper,stinger,bigshot,king,type,elem["players"][0]["golden_eggs"],elem["players"][0]["power_eggs"],elem["players"][0]["rescue"],elem["players"][0]["rescued"]]); //rescue: me reviving. rescued: me dead.
    };
  });

  //sorts array into descending list
  var sortedOutput = output.sort( function(a,b) {
    if (a < b) { 
      return -1; 
      }
    else if (a > b) {
      return 1;
    }
    // if numbers are equal,
    return 0;
  });

  //places any new data in spreadsheet and logs result (note: if you add more data to your array, be sure to increase getRange's width here)
  if(output.length > 0) {
    sheet.getRange((getLastFullRowByColumnArray()+1),1,output.length,19).setValues(sortedOutput);
    Logger.log('updated with %s new shifts',output.length);
  } else {
    Logger.log("no new data");
  };
}
