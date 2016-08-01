//GLOBAL VARAIBLE
let countryNames = []

// FUNCTION: consumes travelbriefing's all-countries JSON & prepopulate search options for search box:index
$(function prePopulate() {
  for (let country in allCountries_JSON)
  countryNames.push(allCountries_JSON[country].name)

  $("#searchBox").autocomplete({
    source: countryNames
  })
})

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
