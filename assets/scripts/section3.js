// handles building current events shizzzz
let resultsEconPolitics
let resultsTravelArt
//***********************   DO NOT PUBLISH KEY!!!!!   ***********************

// either bing, npr or guardian since tem b*tches at BBC never got back to you with a KEY
// read documentation and see which of the three you want to work with
// stretch goal - use all 3 or 2

function buildSection3() {
    fetchEconPolitics()
    fetchTravelArts()
}

function fetchEconPolitics() {
  let requestedEndDate = setEndDate()
  $.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&q=" + countryName + ",economics,politics" + "&begin_date=" + requestedEndDate + "&sort=newest")

  .then((data)=>{
    console.log(JSON.stringify(data))
  })
}

function fetchTravelArts() {
  let requestedEndDate = setEndDate()
  console.log(requestedEndDate);
  console.log(nyTimesKey);
  console.log(countryName);
  $.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&q=" + countryName + ",travel,arts" + "&begin_date=" + requestedEndDate)
  .then((data)=>{
    console.log(JSON.stringify(data))
  })
}

function setEndDate() {
  let endDate = new Date()
  endDate.setDate(endDate.getDate() - 90)
  endDate = endDate.toISOString().split('T')[0].replace(/-/g, "")
  return endDate
}


// // NYTIMES Data
// var newsImages = "https://static01.nyt.com/"
// let headline = data["response"]["docs"][0]["headline"]["main"]
// let url = data["response"]["docs"][0]["web_url"]
// let snippet = data["response"]["docs"][0]["snippet"]
// let photo = data["response"]["docs"][0]["multimedia"][1]["url"]


// function orderedPromises(){
//   return Promise.resolve();
// }
// function logger(str){
//   console.log(str)
// }
// orderedPromises()
// .then(function() {
//   logger('first')
// })
// .then(function(result) {
//   logger('second')
// });
