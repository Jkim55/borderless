//***********************   DO NOT PUBLISH KEY!!!!!   ***********************
// either bing, npr or guardian since tem b*tches at BBC never got back to you with a KEY
// read documentation and see which of the three you want to work with
// stretch goal - use all 3 or 2

// GLOBAL VARIABLES


// handles building current events shizzzz
function buildSection3() {
  nytURL("economy")
  // guardianURL("economy", "politics")
  // fetchStories()
}
economy / politics
travel

function nytURL(topic) {
  let requestedEndDate = setEndDate()
  let nytAPIURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&q=" + countryName + "," + topic + "&begin_date=" + requestedEndDate + "&sort=newest"
// return nytAPIURL
  console.log(nytAPIURL)
}

// var exampleOfGuardianAPIURL='http://content.guardianapis.com/search?q=kenya%20AND%20(economy%20OR%20politics)&tag=type/article&from-date=2016-07-01&api-key=c9d22c79-4372-4306-97ff-09edf0781da6'

function guardianURL(topic1, topic2) {
  let requestedEndDate = setEndDate()
  let guardianAPIURL='http://content.guardianapis.com/search?q='+ countryName + '%20AND%20('+ topic1 + '%20OR%20' + topic2 + ')&tag=type/article&from-date=' + requestedEndDate + '&api-key=' + guardianKey
  // return guardianAPIURL
  console.log(guardianAPIURL)

}

function fetchStories(newsURL) {
  $.get(newsURL)
  .then((data)=>{
    console.log(data)
    console.log(JSON.stringify(data))
  })
}

function setEndDate() {
  let endDate = new Date()
  endDate.setDate(endDate.getDate() - 90)
  endDate = endDate.toISOString().split('T')[0].replace(/-/g, "")
  return endDate
}


// var exampleOfGuardianAPIURL='http://content.guardianapis.com/search?q=kenya%20AND%20(economy%20OR%20politics)&tag=type/article&from-date=2016-07-01&api-key=c9d22c79-4372-4306-97ff-09edf0781da6'

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
