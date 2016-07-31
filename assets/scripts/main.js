$(function() {
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

$("#submit").click(()=>{
  let countrySelected = $('#searchBox').val();
  var countryURL = "https://travelbriefing.org/"+countrySelected+"?format=json"
  // console.log(countryURL);
  $.get(countryURL).then((data) => {console.log(data)})
})
