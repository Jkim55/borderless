//***********************   DO NOT PUBLISH KEY!!!!!   ***********************
// either bing, npr or guardian since tem b*tches at BBC never got back to you with a KEY
// read documentation and see which of the three you want to work with
// stretch goal - use all 3 or 2

// GLOBAL VARIABLES


// handles building current events shizzzz
function buildSection3() {
  nytURL("economy", "politics")
  guardianURL("economy", "politics")

  // fetchData()
}

function nytURL(topic1, topic2) {  // topics to cover (1) economy & politics (2) travel, arts & culture
  let requestedEndDate = setEndDate().replace(/-/g, "")  // date formatted as YYYYMMDD
  let nytAPIURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&q=" + countryName + "&fq="+topic1+ ","+ topic2 + "&begin_date=" + requestedEndDate + "&sort=newest"
  return nytAPIURL
}

function guardianURL(topic1, topic2) {
  let requestedEndDate = setEndDate()
  let guardianAPIURL='http://content.guardianapis.com/search?q='+ countryName + '%20AND%20('+ topic1 + '%20OR%20' + topic2 + ')&tag=type/article&from-date=' + requestedEndDate + '&api-key=' + guardianKey
  return guardianAPIURL
}

function setEndDate() {
  let endDate = new Date()
  endDate.setDate(endDate.getDate() - 90)
  endDate = endDate.toISOString().split('T')[0]
  return endDate  // date formatted as YYYY-MM-DD
}

// function fetchData(newsURL) {
//   $.get(newsURL)
// }
//
// function parseData(){
//   .then((data)=>{
//     console.log(data)
//     console.log(JSON.stringify(data))
//   })
// }


// // NYTIMES Data - iterate thru each article returned

// let articlesArr = data["response"]["docs"]  //arr of obj
// var newsImages = "https://static01.nyt.com/" + photo  // photo of article
// let headline = data["response"]["docs"][0]["headline"]["main"]
// let url = data["response"]["docs"][0]["web_url"]
// let snippet = data["response"]["docs"][0]["snippet"]
// let photo = data["response"]["docs"][0]["multimedia"][1]["url"]
// let publishDate = data["response"]["docs"][0]["pub_date"]


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
