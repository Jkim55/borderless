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
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json"
  $.get(countryURL)
  .then((data)=>{
    data = JSON.parse(data)  // parsed json object (is this the only hit to the api? or does it call multiple time for lines 24 - 31)
    console.log(data);
    console.log("name: ", data.names.name)
    console.log("full name: ", data.names.full)
    // flag: "http://www.geonames.org/flags/x/" + (data["names"]["iso2"]) + ".gif"   // ie http://www.geonames.org/flags/x/jm.gif
    console.log("Array of languages: ", data.language); //iterate thru the array of objs; keys: language & official
    console.log(data.maps.lat, data.maps.long, data.maps.zoom) //iterate thru obj; keys: lat, long, zoom
    console.log("Country code: ", data.telephone.calling_code);
    console.log("Electrical: ", data.electricity) //iterate thru obj; keys: voltage, frequency, plugs
    console.log("Police: ", data.telephone.police);

    console.log("Vaccinations required: ", data.vaccinations); //iterate thru array of objs; keys: message & name
    console.log("Travel Advisories: ", data.advise); // Object of objs with key (country ISO2) and values of an obj that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)
    console.log("Water Drinkability Advisement: ", data.water.short);
    console.log("Currency: ", data.currency.name, data.currency.symbol, data.currency.rate, data.currency.compare[151].name, data.currency.compare[151].rate) //iterate thru obj; keys: name, symbol, rate
    // ADD: Visa information - either create one yourself or continue looking for an API

  })

}

$("#submit").click((event)=>{
  event.preventDefault()
  getCountryJSON()
})

// localStorage.setItem("username", "John");
// localStorage.getItem("username");
// localStorage.clear()
