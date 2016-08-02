// GLOBAL VARIABLES
let parsedData;  // instatiated so that parsedData can hold value of promise from CONTROLLER FUNCTION

// MASTER CONTROLLER FUNCTION: load all info on page
$(function loadPage() {
  let jsonURL = getCountryJSON()     // assigns result of getCountryJSON to variable
  $.get(jsonURL)                     // passes in result from prior line to getRequestJSON
  .then((data)=>{                    // promise: take data & assign it to globalV
    parsedData = JSON.parse(data);
    buildSection1()
    buildSection2()
    // buildSection3()
    // buildSection4()
  })
})

// FUNCTION: returns formatted url to a single country's JSON
function getCountryJSON(){
  let countryName =   localStorage.getItem("selectedCountry")
  countryName = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json";
  return countryURL
}
