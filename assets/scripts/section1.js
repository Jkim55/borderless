// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection1() {
  extractName()
  extractCapital()
  appendFlag()
  extractMap()
  extractLanguage()
  extractTime()
}

function extractName(){ //iterate thru names: parsedData.names.name & parsedData.names.full
  let shortName = parsedData.names.name
  let full name = parsedData.names.full
}

function extractCapital(){

}

function appendFlag(){
  let flagURL = "http://www.geonames.org/flags/x/" + parsedData["names"]["iso2"] + ".gif"
  // create img tag & append to html
  // <img id='myImage' src="http://www.geonames.org/flags/x/??.gif" />

  // or just change an already existing img
  // $("#myImage").attr('src', "http://www.geonames.org/flags/x/" + countryCode + ".gif")
  //     which one is better?
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
  let languages = ""  // might change to array
  for(let language in languageArr){
    let language = languageArr[language].language
    let official = languageArr[language].official
    // if official = no, add '*' to <language>, then add to language String
    // find way to join with ',' and '&'...  as string or array.join?
  }
  // format message to read as below.
  //    The languages spoken in <country name> are <language array string>
  //    * Not an official language / spoken in some parts of the country
}

function extractTime(){
  let timezone = parsedData.timezone.name
  let timestampUTC = Date.now()
  // use Moment Timezone here ...bring in CDN
  //    <timezone> (GMT <GMT TIME ie. +08:00>)
  //    That makes the current date and time <date>, <time>
}
