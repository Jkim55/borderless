// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection1(obj) {
  extractName()
  //add flag: "http://www.geonames.org/flags/x/" + (obj["names"]["iso2"]) + ".gif"
  extractMap()
  extractLanguage()
  extractTime()
  extractCurrency()
  extractElectricity()
}

function extractName(){
  console.log("name: ", obj.names.name)
  console.log("full name: ", obj.names.full)
}

function extractMap(){
  console.log(obj.maps.lat, obj.maps.long, obj.maps.zoom) //iterate thru obj; keys: lat, long, zoom
}

function extractLanguage(){
  console.log("Array of languages: ", obj.language); //iterate array of objs; keys: language & official
}

function extractCurrency(){
  console.log("Currency: ", obj.currency.name, obj.currency.symbol, obj.currency.rate, obj.currency.compare[151].name, obj.currency.compare[151].rate) //iterate thru obj; keys: name, symbol, rate
}

function extractElectricity() {
  console.log("Electrical: ", obj.electricity) //iterate thru obj; keys: voltage, frequency, plugs
}
