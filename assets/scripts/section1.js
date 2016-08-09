// GLOBAL VARIABLES
let countryLat
let countryLong
let countryZoom
let languageArr

// CONTROLLER FUNCTION: handles building general info on country
function buildSection1() {
  extractName()
  extractCapital()
  appendFlag()
  extractMapCoordinates()
  extractTime()
  extractLanguage()
}

function extractName(){
  let shortName = parsedData.names.name
  let fullName = parsedData.names.full
  $("#shortName").append(shortName);
  $("#fullName").append(fullName);
}

function extractCapital(){
  let iso2 = parsedData.names.iso2
  let capital
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/capital.json")
  .then((capitalISOPairs)=>{
    if (capitalISOPairs.hasOwnProperty(iso2)){
      capital = capitalISOPairs[iso2]
    }
    $("#capital").append(capital);
  })
  .catch((error)=> {
    console.error(error)
  })
}

function appendFlag(){
  let iso2Flag = parsedData.names.iso2.toLowerCase()
  let flagURL = "http://www.geonames.org/flags/x/" + iso2Flag  + ".gif"
  $("#flag").attr("src", flagURL)
}

// HELPER FUNCTION to initMap()
function extractMapCoordinates(){
  countryLat = parseFloat(parsedData.maps.lat)
  countryLong = parseFloat(parsedData.maps.long)
  countryZoom = parseFloat(parsedData.maps.zoom-1)
  // addGoogMapsSRC()  // attempt to hide key
}

// function addGoogMapsSRC (){
//   let mapsKey = 'https://maps.googleapis.com/maps/api/js?key='+googKey+'&callback=initMap'
//   $("#key").attr('src', mapsKey)
// }

// FUNCTION: generates GOOGmaps
function initMap() {
  let mapDiv = document.getElementById("map");
  let map = new google.maps.Map(mapDiv, {
      center: {lat: countryLat, lng: countryLong},
      zoom: countryZoom
  });
}

// $('#generalInfo').click(()=>{
//   setTimeout(initMap, 0)
// })

function extractTime(){
  getTZData()
  .then((data)=>{
    let localOffset = data.dstOffset + data.rawOffset
    let localTZName = data.timeZoneName
    let localTime = calcTime(localOffset)  // Return localTime to do the below .then
    if (localTime === "Invalid Date"){
      localTime = "Sorry, the current time and date is not available"
    }
    $("#timeZone").append(localTZName)
    $("#localTD").append(localTime);
  })
  .catch((error)=> {
    console.error(error)
  })
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
  $("#langCountry").append(countryName, ": ")
  $("#langArr").append(languageOutput);
}


// travelbriefing.org Branding
// Google Maps Branding
// Google TimeZone Branding
