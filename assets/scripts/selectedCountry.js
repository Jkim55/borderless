// GLOBAL VARIABLES
let parsedData;  // instatiated so that parsedData can hold value of promise from CONTROLLER FUNCTION

// MASTER CONTROLLER FUNCTION: load all info on page
$(function loadPage() {
  let jsonURL = getCountryJSON()     // assigns result of getCountryJSON to variable
  getRequestJSON(jsonURL)            // passes in result from prior line to getRequestJSON
  .then((data)=>{                    // promise: take data from prior line and assign it to gVariable
    parsedData = JSON.parse(data);
    // buildSection1(data)
    // buildSection2(data)
  })
})

// FUNCTION: returns formatted url to a single country's JSON
function getCountryJSON(){
  let countryName =   localStorage.getItem("selectedCountry")
  countryName = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json";
  return countryURL
}

// FUNCTION: returns the JSON after a GET request is made to a single country's URL
function getRequestJSON(url) {
  return $.get(url)
}
