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
    return JSON.parse(data)  // parsed json object (is this the only hit to the api? or does it call multiple time for lines 24 - 31)
  })
  .then((data)=>{
    console.log("name: ", data.names.name)
    console.log("full name: ", data.names.full)
    // flag: "http://www.geonames.org/flags/x/" + (data["names"]["iso2"]) + ".gif"   // ie http://www.geonames.org/flags/x/jm.gif
    console.log("Array of languages: ", data.language); //iterate thru the array of objs; keys: language & official
    console.log("Country code: ", data.telephone.calling_code);
    console.log("Police: ", data.telephone.police);
    console.log("Water Drinkability Advisement: ", data.water.short);
    console.log("Vaccinations required: ", data.vaccinations); //iterate thru array of objs; keys: message & name
    console.log("Travel Advisories: ", data.advise); // Object of objs with key (country ISO2) and values of an obj that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)
  })

}

$("#submit").click((event)=>{
  event.preventDefault()
  getCountryJSON()
})

// localStorage.setItem("username", "John");
// localStorage.getItem("username");
// localStorage.clear()
