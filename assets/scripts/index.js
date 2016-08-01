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


//@ some event - grab value in textbox & localStorage.setitem("selectedCountry", "<value>")
