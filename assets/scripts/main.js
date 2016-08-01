$(function prePopulate (){
  var mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
  var countryNames=[]

  $.get(mainURL)
  .then((countryArr)=>{
    for (var countryIndex in countryArr)
    countryNames.push(countryArr[countryIndex].name)})

  $("#searchBox").autocomplete({
    source: countryNames
  });
});

function getCountryJSON(){
  let countryName = $('#searchBox').val()
  countryName = countryName.replace(/ /g, "_");
  var countryURL = "https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/"+countryName+"?format=json"
  $.get(countryURL)
  .then((data)=>{
    // data.replace(/\u21b5/g,'');
    console.log(data)
  })
}

$("#submit").click((event)=>{
  event.preventDefault()
  getCountryJSON()
})


// localStorage.setItem("username", "John");
// localStorage.getItem("username");
// localStorage.clear()
//
// console.log("name: " + data["names"]["name"])
// console.log("full name: "  data["names"]["full"]
// flag: "http://www.geonames.org/flags/x/" + (data["names"]["iso2"])
//  + ".gif"   // ie http://www.geonames.org/flags/x/jm.gif
// official language: data["language"][i]["language"] //iterate thru this
// country code: data["telephone"]["calling_code"]
// police: data["telephone"]["police"]
// water: data["water"]["short"] // if null = have a message that says there's no info
// vaccinations: data["vaccinations"] //iterate thru each item in the object; print each item's name & message keys to get their values. // if no info = display message
// travel advisories: data["advise"] //iterate thru each item in the object
//
// // To print where the advisories are coming from you need to link the key from an array that you create: which  is will be an array of objs: {data["names"]["name"]:data["names"]["iso2"]}
