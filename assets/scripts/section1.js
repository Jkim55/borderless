// GLOBAL VARIABLE
let countryLat
let countryLong


// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection1() {
  extractName()
  extractCapital()
  appendFlag()
  extractMap()
  extractLanguage()
  extractTime()
}

function extractName(){
  let shortName = parsedData.names.name
  let fullName = parsedData.names.full

  let div = $("<div>");
  div.append(shortName)
  $("#sec1").append(div);

  let div2 = $("<div>");
  div2.append(fullName)
  $("#sec1").append(div2);

  // $('#sec1').append(shortName)
  // $('#official').append(fullName)
}

function extractCapital(){
  let iso2 = parsedData.names.iso2
  let capital
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/capital.json")
  .then((capitalISOPairs)=>{
    if (capitalISOPairs.hasOwnProperty(iso2)){
      capital = capitalISOPairs[iso2]
    }
    let div = $("<div>");
    div.append(capital)
    $("#sec1").append(div);
  })
}

function appendFlag(){
  let iso2Flag = parsedData.names.iso2.toLowerCase()
  let flagURL = "http://www.geonames.org/flags/x/" + iso2Flag  + ".gif"
  // append src to flag img
  let flag = $("<img>")
  flag.attr("src", flagURL)
  flag.attr("height","125px")
  $("#sec1").append(flag)
}

function extractMap(){
  countryLat = parsedData.maps.lat
  countryLong = parsedData.maps.long
  let zoom = parsedData.maps.zoom
  // use lat, long, zoom to create GoogMaps view
  // see googleMapTest.html re example from GoogleMapsAPI
}

function extractLanguage(){
  let languageArr = parsedData.language
  let languageOutput = []  // might change to array
  for(let language in languageArr){
    if(languageArr[language].official === 'Yes'){
        languageOutput.push(languageArr[language].language)
    } else {
      languageOutput.push(languageArr[language].language + '*')
    }
  }
  languageOutput.splice(languageOutput.length-1,0,'and')
  languageOutput = languageOutput.join(', ')

  let div = $("<div>");
  div.append(languageOutput)
  $("#sec1").append(div);
  // put languageOutput into the message as per below

  // format message to read as below.
  //    The languages spoken in <country name> are <languageOutput>
  //    * Not an official language
}

function extractTime(){
  let localOffset
  let localTZName
  getTZData()
  //    <coutry name> is in the <timezone> timezone.
  //    The local time is <timeOutput>
}

function getTZData(){
  let localTime
  let timestampUTC = Date.now()/1000
  let googTZapiURL = "https://maps.googleapis.com/maps/api/timezone/json?location=" + countryLat + "," + countryLong + "&timestamp=" + timestampUTC + "&key=" + googTimeZoneKey
  $.get(googTZapiURL)
  .then((data)=>{
    localOffset = data.dstOffset + data.rawOffset
    localTZName = data.timeZoneName
    localTime = calcTime(localOffset)
    let div = $("<div>");
    div.append(localTime)
    $("#sec1").append(div);
  })
}

function calcTime(offset) {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (1000*offset));
  var timeOutput = nd.toLocaleString();
  return timeOutput
}
