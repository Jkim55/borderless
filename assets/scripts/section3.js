// CONTROLLER FUNCTION: handles building current events shizzzz
function buildSection3() {
  // nytData()
  guardianData("economy", "politics")
  // guardianData("food", "arts")
}

function nytData(){
  let url = nytURL()
  parseNYTData(url)
}

function parseNYTData(newsURL){
  $.get(newsURL)
  .then((data)=>{
    let articlesArr = data.response.docs  //arr of obj
    for(let index in articlesArr){
      let article = articlesArr[index]
      let headline = article["headline"]["main"]
      let articleURL = article["web_url"]
      let multimediaCount = article["multimedia"].length
      let thumbnailURL = "https://pbs.twimg.com/profile_images/758384037589348352/KB3RFwFm.jpg"
      if(multimediaCount !== 0){thumbnailURL = "https://static01.nyt.com/" + article["multimedia"][0]["url"]}
      let snippet = article["snippet"]
      let pubDate = article["pub_date"]
      console.log("this is the headline: ", headline);
      console.log("this is the articleURL: ", articleURL);
      console.log("this is the thumbnailURL: ", thumbnailURL);
      console.log("this is the snippet: ", snippet);
      console.log("this is the pubdate: ", pubDate);  // this needs to run thru formatPubDate()
    }
  })
}

function nytURL() {  // topics to cover (1) economy & politics (2) travel, arts & culture
  let requestedBegDate = setBegDate().replace(/-/g, "")  // date formatted as YYYYMMDD
  let requestedEndDate = setEndDate().replace(/-/g, "")  // date formatted as YYYYMMDD
  let nytAPIURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&fq=section_name\:(\"world\") AND headline.search:(\"" + countryName + "\")&facet_field=section_name&facet_filter=true&begin_date=" + requestedBegDate + "&end_date=" + requestedEndDate + "&sort=newest"// + "&fq=glocations:('TURKEY')"
  return nytAPIURL
}


function guardianData(t1, t2){
  let url = guardianURL(t1, t2)
  parseGuardianData(url)
}

function guardianURL(topic1, topic2) {
  let requestedBegDate = setBegDate()
  let guardianAPIURL='http://content.guardianapis.com/search?q='+ countryName + ' AND ('+ topic1 + '%20OR%20' + topic2 + ')&tag=type/article&show-fields=trailText,thumbnail&from-date=' + requestedBegDate + '&api-key=' + guardianKey
  return guardianAPIURL
}

function parseGuardianData(newsURL){
  $.get(newsURL)
  .then((data)=>{
    let articlesArr = data.response.results  //arr of obj
    console.log(data);
    for(let index in articlesArr){
      let article = articlesArr[index]
      let headline = article.webTitle
      let articleURL = article.webUrl
      let thumbnailURL = article.fields.thumbnail   // fields is an object
      let snippet = article.fields.trailText
      let pubDate = article.webPublicationDate
      console.log("this is the headline: ", headline);
      console.log("this is the articleURL: ", articleURL);
      console.log("this is the thumbnailURL: ", thumbnailURL);
      console.log("this is the snippet: ", snippet);
      console.log("this is the pubdate: ", pubDate);  // this needs to run thru formatPubDate()
    }
  })
}

// HELPER FUNCTION: set begDate in URL functions
function setBegDate() {
  let begDate = new Date()
  begDate.setDate(begDate.getDate() - 90)
  begDate = begDate.toISOString().split('T')[0]
  return begDate  // date formatted as YYYY-MM-DD
}

// HELPER FUNCTION: set endDate in URL functions
function setEndDate() {
  let endDate = new Date()
  endDate = endDate.toISOString().split('T')[0]
  return endDate  // date formatted as YYYY-MM-DD
}

// HELPER FUNCTION: format pubDate in parseData functions
function formatPubDate (date){
  let formattedDate = date.split('T')[0].split('-')
  formattedDate.push(formattedDate.splice(0, 1))
  formattedDate = formattedDate.join("-")
  return formattedDate
}

// Because you need to put the URL inside an image tag, which look like this...
// <img src='http://some.url/image.jpg' />
// <img src='http://media.guim.co.uk/99b52460e7e1660ed55200a44db0e19d357288f7/380_841_4547_2727/140.jpg' />
//
// ...so in code you'd do something like this...
// $("#results").append("<li><img src='" + data.response.results[i].fields.thumbnail + "' /></li>");

// "q=turkey, art, culture&fq=section_name:(\"world\") AND glocations:(\"turkey\")"
