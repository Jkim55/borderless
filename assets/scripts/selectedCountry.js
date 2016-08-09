// GLOBAL VARIABLES
let countryName = localStorage.getItem("selectedCountry")
let parsedData



// MASTER CONTROLLER FUNCTION: load all info on page
$(function loadPage() {
  let jsonURL = getCountryJSON()     // assigns result of getCountryJSON to variable
  $.get(jsonURL)                     // passes in result from prior line to getRequestJSON
  .then((data)=> {                    // promise: take data & assign it to globalV
    localStorage.setItem("countryInfo", data)
    parsedData = JSON.parse(data);
    setTimeout(initMap, 0)
    buildSection1()
    buildSection2()
    // buildSection3()
    buildSection4()
  })
  .catch((error)=> {
    console.error(error)
  })
})

// FUNCTION: returns formatted url to a single country's JSON
function getCountryJSON(){
  countryNameFormatted = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryNameFormatted+"?format=json";
  return countryURL
}
