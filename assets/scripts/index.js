// FUNCTION: consumes travelbriefing's all-countries JSON & prepopulate search options for search box:index
$(function prePopulate() {
  localStorage.clear()
  let countryNames = []
  for (let country in allCountries_JSON)
  countryNames.push(allCountries_JSON[country].name)
  $("#searchBox").autocomplete({
    source: countryNames
  })
})

// FUNCTION: onClick "#submit", do (1-3)
$("#submit").click((event)=>{
  event.preventDefault()                                            // (1)prevent default
  localStorage.setItem("selectedCountry", $("#searchBox").val())    // (2)save value in textbox to localStorage
  $(location).attr("href", "selectedCountry.html")                  // (3) navigate to country page
})
