$( function() {
  var mainURL="https://galvanize-cors-proxy.herokuapp.com/https://travelbriefing.org/countries.json"
  var countryNames=[]

  $.get(mainURL).then(function (countryArr) {
    for (var countryIndex in countryArr)
    countryNames.push(countryArr[countryIndex].name)})

  $( "#countrySearch" ).autocomplete({
    source: countryNames
  });
});
