// GLOBAL VARIABLE
let countryLat
let countryLong
let countryZoom
let languageArr

// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection1() {
  extractName()
  extractCapital()
  appendFlag()
  extractMapCoordinates()
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
  let flag = $("<img>")
  flag.attr("src", flagURL)
  flag.attr("height","125px")
  $("#sec1").append(flag)
  // append src to flag img
}


function extractMapCoordinates(){
  countryLat = parseFloat(parsedData.maps.lat)
  countryLong = parseFloat(parsedData.maps.long)
  countryZoom = parseFloat(parsedData.maps.zoom-1)
  // addGoogMapsSRC()
}

// function addGoogMapsSRC (){
//   let mapsKey = 'https://maps.googleapis.com/maps/api/js?key='+googKey+'&callback=initMap'
//   $("#key").attr('src', mapsKey)
// }

function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: countryLat, lng: countryLong},
      zoom: countryZoom
  });
}

$('#generalInfo').click(()=>{
  setTimeout(initMap, 0)
})

function extractLanguage(){
  languageArr = parsedData.language
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
  // format message to read as below.
  //    The languages spoken in <country name> are:
  //    append ul list
  //    * Not an official language
}

function extractTime(){
  getTZData()
  .then((data)=>{
    let localOffset = data.dstOffset + data.rawOffset
    let localTZName = data.timeZoneName
    let localTime = calcTime(localOffset)  // need to return localTime to do the below .then
    if (localTime === "Invalid Date"){
      localTime = "Sorry, the current time and date is not available"
    }
    // if data from .then === {status: "ZERO_RESULTS"} display error message
    let div = $("<div>");      // can pull this out as a .then(append(id, item){})
    div.append(localTime)
    $("#sec1").append(div);
  })
  //    <coutry name> is in the <timezone> timezone.
  //    The local time is <timeOutput>
}

// HELPER FUNCTION to extractTime()
function getTZData(){
  let timeStampUTC = Date.now()/1000
  let googTZapiURL = "https://maps.googleapis.com/maps/api/timezone/json?location=" + countryLat + "," + countryLong + "&timestamp=" + timeStampUTC + "&key=" + googKey
  return $.get(googTZapiURL)
}
// HELPER FUNCTION to extractTime()
function calcTime(offset) {
  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  let nd = new Date(utc + (1000*offset));
  let timeOutput = nd.toLocaleString();
  return timeOutput
}

// travelbriefing.org Branding
// Google Maps Branding
// Google TimeZone Branding
