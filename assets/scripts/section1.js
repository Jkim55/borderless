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
  // append two tags
}

function extractCapital(){
  let iso2 = parsedData.names.iso2
  let capital
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/capital.json")
  .then((capitalISOPairs)=>{
    if (capitalISOPairs.hasOwnProperty(iso2)){
      capital = capitalISOPairs[iso2]
    }
  })
  // append capital
}

function appendFlag(){
  let iso2Flag = parsedData.names.iso2.toLowerCase()
  let flagURL = "http://www.geonames.org/flags/x/" + iso2Flag  + ".gif"
  // append src to flag img
}

function extractMap(){
  let lat = parsedData.maps.lat
  let long = parsedData.maps.long
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
  // put languageOutput into the message as per below

  // format message to read as below.
  //    The languages spoken in <country name> are <languageOutput>
  //    * Not an official language
}


function extractTime(){
  let timezone = parsedData.timezone.name
  let timestampUTC = Date.now()

}

// Google Timezone API: Long, Lat, TimeStamp (TimeStamp = Date.now()/1000), API Key
// Grab from Google Timezone API:   dstOffset & rawOffset
// then calc offset. offset = (dstOffset - rawOffset)

// function calcTime(offset) {
//     var d = new Date();
//     var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
//     var nd = new Date(utc + (1000*offset));
//     var timeOutput = nd.toLocaleString();
// }

//    <coutry name> is in the <timezone> timezone.
//    The local time is <timeOutput>
