// handles building current events shizzzz
let resultsEconPolitics
let resultsTravelArt
//***********************   DO NOT PUBLISH KEY!!!!!   ***********************

// either bing, npr or guardian since tem b*tches at BBC never got back to you with a KEY
// read documentation and see which of the three you want to work with
// stretch goal - use all 3 or 2

function buildSection3() {
  console.log('i got hit')
    fetchTravelArts()
}
function fetchTravelArts() {
  $.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a04d3cbd56d94daba43213c5277372a6&q=hillary%20clinton,california,fundraiser")
  .then((data)=>{
    console.log(data)
  })
  console.log("I was called- fetchTravelArts")
}

// function fetchEconPolitics() {
//   var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//   url += '?' + $.param({
//     'api-key': nyTimesKey,
//     'q': countryName + "economics, politics",
//     'end_date': "20160701",
//     'fl': "web_url,source,headline,multimedia"});
//     $.ajax({
//       url: url,
//       method: 'GET',
//     }).done(function(result) {
//       resultsEconPolitics = results
//     }).fail(function(err) {
//       throw err;
//     });
// }

  // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  // url += '?' + $.param({
  //   'api-key': nyTimesKey,
  //   'q': countryName + "travel, arts",
  //   'end_date': "20160701",
  //   'fl': "web_url,source,headline,multimedia"});
  // $.ajax({
  //   url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a04d3cbd56d94daba43213c5277372a6&q=hillary%20clinton,california,fundraiser',
  //   method: 'GET',
  // }).done(function(results) {
  //   resultsTravelArt = results;
  // }).fail(function(err) {
  //   throw err;
  // });


function orderedPromises(){
  return Promise.resolve();
}
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
