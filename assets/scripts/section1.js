// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection1() {
  extractName()
  appendFlag()
  extractMap()
  extractLanguage()
  extractTime()
}

function extractName(){
  console.log("name: ", parsedData.names.name)
  console.log("full name: ", parsedData.names.full)
}

function appendFlag(){
  //add flag: "http://www.geonames.org/flags/x/" + (parsedData["names"]["iso2"]) + ".gif"
}
function extractMap(){
  console.log("Lat: ", parsedData.maps.lat,"Long: ", parsedData.maps.long,"Zoom: ", parsedData.maps.zoom) //iterate thru parsedData; keys: lat, long, zoom
}

function extractLanguage(){
  console.log("Array of languages: ", parsedData.language); //iterate array of objs; keys: language & official
}

function extractTime(){
  console.log("Timezone: ", parsedData.timezone.name, "UTC: ", Date.now() ); //iterate array of objs; keys: language & official  ** Use Moment Timezone here ...bring in CDN
  // **
}
