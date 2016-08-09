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
  if (iso2 !== null){
    let capital
    $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/capital.json")
    .then((capitalISOPairs)=>{
      if (capitalISOPairs.hasOwnProperty(iso2)){
        capital = capitalISOPairs[iso2]
      }
      $("#capital").append(capital.toUpperCase());
    })
    .catch((error)=> {
      console.error(error)
    })
  } else {
    $("#capital").append("No data was found for this endpoint")
  }

}

function appendFlag(){
  let iso2Flag = parsedData.names.iso2
  let flagURL
  if (iso2Flag !== null){
    flagURL = "http://www.geonames.org/flags/x/" + iso2Flag.toLowerCase()  + ".gif"
    $("#flag").attr("src", flagURL)
  } else {
    $("#flag").attr("src", "../images/noFlag.jpeg")
  }
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
  if (languageArr.length !== 0){
    for(let language in languageArr){
      let $lang = $("<li>");
      if(languageArr[language].official === 'Yes'){
        $lang.append(languageArr[language].language)
        $("#langList").append($lang)
      } else {
        $lang.append(languageArr[language].language + '*')
        $("#langList").append($lang)
      }
    }
  } else{
    $("#langList").append("No data was found for this endpoint")
  }
  $("#langCountry").append(countryName, ": ")
}


// travelbriefing.org Branding
// Google Maps Branding
// Google TimeZone Branding
