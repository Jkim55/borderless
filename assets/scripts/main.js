let parsedData;

$(function prePopulate() {
  var mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
  var countryNames=[]

  $.get(mainURL)
  .then((countryArr)=>{
    for (var countryIndex in countryArr)
    countryNames.push(countryArr[countryIndex].name)})

  $("#searchBox").autocomplete({
    source: countryNames
  })
})

function getCountryJSON(){
  let countryName = $('#searchBox').val()
  countryName = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json";
  // getRequestJSON(countryURL);
  return countryURL
}

function getRequestJSON(url) {
  return $.get(url)
}

function parseJSONsection1(obj) {
  extractName()

}


$("#submit").click((event)=>{
  event.preventDefault()
  let jsonURL = getCountryJSON()
  getRequestJSON(jsonURL)
  .then((data)=>{
    console.log(data)
    // parsed json object (is this the only hit to the api? or does it call multiple time for lines 24 - 31)
    // parseJSON(JSON.parse(data))
    parsedData = JSON.parse(data);
    parseJSONSection1(data)
    parseJSONSection2(data)
  })
})

// localStorage.setItem("username", "John");
// localStorage.getItem("username");
// localStorage.clear()


console.log("name: ", obj.names.name)
console.log("full name: ", obj.names.full)
// flag: "http://www.geonames.org/flags/x/" + (obj["names"]["iso2"]) + ".gif"   // ie http://www.geonames.org/flags/x/jm.gif
console.log("Array of languages: ", obj.language); //iterate thru the array of objs; keys: language & official
console.log(obj.maps.lat, obj.maps.long, obj.maps.zoom) //iterate thru obj; keys: lat, long, zoom
console.log("Country code: ", obj.telephone.calling_code);
console.log("Electrical: ", obj.electricity) //iterate thru obj; keys: voltage, frequency, plugs
console.log("Police: ", obj.telephone.police);

console.log("Vaccinations required: ", obj.vaccinations); //iterate thru array of objs; keys: message & name
console.log("Travel Advisories: ", obj.advise); // Object of objs with key (country ISO2) and values of an obj that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)
console.log("Water Drinkability Advisement: ", obj.water.short);
console.log("Currency: ", obj.currency.name, obj.currency.symbol, obj.currency.rate, obj.currency.compare[151].name, obj.currency.compare[151].rate) //iterate thru obj; keys: name, symbol, rate
// ADD: Visa information - either create one yourself or continue looking for an API

// Reformatting world io to reverse key value pairs for easier manipulation

function reformatWorldio (){
  let reformattedObj = {}
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://country.io/names.json").then((data)=> {
    for (key in data) {
      reformattedObj[data[key]] = key
    }
    return reformattedObj
  })
}
