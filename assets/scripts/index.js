// GLOBAL VARIABLES
let parsedData;  // instatiated so that parsedData can hold value of promise from CONTROLLER FUNCTION


//FUNCTION: Appending flag image to prepopulated list
function appendFlags(iso2){
  let flagIMG = $("<iMG>")
  let countryIOUrl = 'http://www.geonames.org/flags/x/'+ iso2 + '.gif'
  flagIMG.attr('src', countryIOUrl)
  flagIMG.attr('height', "20px")
  // flagIMG.attr('width', "20px") //not sure if this is necc. esp re retain proportion
  // $("#searchBox").append(flagIMG);
}

// Reformatting world io to reverse key value pairs for easier manipulation
function reformatWorldio (){
  let reformattedObj = {}
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/names.json").then((data)=> {
    for (key in data) {
      reformattedObj[data[key].replace(/ /g, "_")] = key
    }
    return reformattedObj
  })
}

// MASTER CONTROLLER FUNCTION: onClick re Let's Go Button:index
$("#submit").click((event)=>{
  event.preventDefault()             // prevents button from navigating away from page
  let jsonURL = getCountryJSON()     // assigns result of getCountryJSON to variable
  getRequestJSON(jsonURL)            // passes in result from prior line to getRequestJSON
  .then((data)=>{                    // promise: take data from prior line and assign it to gVariable
    // parsed json object (is this the only hit to the api? or does it call multiple time for lines 24 - 31)
    // parseJSON(JSON.parse(data))
    parsedData = JSON.parse(data);
    parseJSONSection1(data)
    parseJSONSection2(data)
  })
})


// FUNCTION: returns formatted url to a single country's JSON
function getCountryJSON(){
  let countryName = $('#searchBox').val()
  countryName = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json";
  return countryURL
}

// FUNCTION: returns the JSON after a GET request is made to a single country's URL
function getRequestJSON(url) {
  return $.get(url)
}

// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function parseJSONsection1(obj) {
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


// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function parseJSONsection2(obj) {
  extractTravelAdvisories()
  extractVaccinations()
  extractWaterDrinkability()
  extractPhone()
}

function extractTravelAdvisories() {
  console.log("Travel Advisories: ", obj.advise); // Object of objs with key (country ISO2) and values of an obj that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)

}

function extractVaccinations() {
  console.log("Vaccinations required: ", obj.vaccinations); //iterate thru array of objs; keys: message & name
}

function extractWaterDrinkability() {
  console.log("Water Drinkability Advisement: ", obj.water.short);
}

function extractPhone() {
  console.log("Country code: ", obj.telephone.calling_code);
  console.log("Police: ", obj.telephone.police);
}
