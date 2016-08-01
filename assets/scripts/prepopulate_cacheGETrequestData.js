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

// ** CAN ALSO CACHE THE RESTS IF DOING A GET REQUEST **

// let countryNames = []
// $(function prePopulate(data) {
//   if (!localStorage.getItem)  // make ajax call, assign data returned to globalV countryArray.
//     let mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
//     $.get(mainURL)
//     .then((countryArr)=>{
//       for (let countryIndex in countryArr)
//       countryNames.push(countryArr[countryIndex].name)})
//     localStorage.setItem("countries", "allCountries")
//   else
//     data = localStorage.getitem(countries)
//
//   $("#searchBox").autocomplete({
//     source: countryNames
//     // prepend flag img to prepopulated list
//   })
// })
