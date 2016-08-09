// CONTROLLER FUNCTION: handles building current events shizzzz
function buildSection3() {
  nytData()
  guardianData()
}

// HELPER FUNCTION: takes in nytURL() and parseNYTData() to output results from NYT
function nytData(){
  let url = nytURL()
  parseNYTData(url)
}

function nytURL() {
  let requestedBegDate = setBegDate().replace(/-/g, "")  // YYYYMMDD
  let requestedEndDate = setEndDate().replace(/-/g, "")  // YYYYMMDD
  let nytAPIURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ nyTimesKey + "&fq=section_name\:(\"world\") AND headline.search:(\"" + countryName + "\")&facet_field=section_name&facet_filter=true&begin_date=" + requestedBegDate + "&end_date=" + requestedEndDate + "&sort=newest"
  return nytAPIURL
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
        if(multimediaCount !== 0){
          thumbnailURL = "https://static01.nyt.com/" + article["multimedia"][0]["url"]
        }
      let snippet = article["snippet"]
      let pubDate = formatPubDate(article["pub_date"])

      let $hdLnHREF = $("<a>", {"href": articleURL})
      let $hdLnText = $("<h6>")
      let $hdLn =$("<span>")
      $hdLn.append($hdLnText.append(headline))

      let $pubDate = $("<span>", {"id": "aHdLn"})
      $pubDate.append("Published: ", pubDate)

      let $snippet = $("<div>")
      $snippet.append(snippet)

      let $image = $("<img>", {
        "src": thumbnailURL,
        "width": "150px",
        "height":"150px"
      })
      let $thumbnail = $("<span>", {"id": "aImg"}).append($image)

      let $article = $("<span>", {"id": "aText"}).append($hdLn).append($pubDate).append($snippet)

      let $articleCard = $("<div>", {"id": "aCard"})
      $articleCard.prepend($thumbnail).append($article)

      $("#nyt").append($articleCard)
    }
  })
  .catch((error)=> {
    console.error(error)
  })
}

// HELPER FUNCTION: runs guardianURL() & parseGuardianData() to output results
function guardianData(){
  let url = guardianURL()
  parseGuardianData(url)
}

function guardianURL() {
  let requestedBegDate = setBegDate()
  let requestedEndDate = setEndDate()
  let guardianAPIURL="https://content.guardianapis.com/search?q=" + countryName.replace(/ /g, "%20") + "&section=world|international|travel&tag=-uk/uk,(world/" + countryName.replace(/ /g, "-").toLowerCase() + "|world/" + countryName.replace(/ /g, "").toLowerCase() + ")&show-fields=trailText,thumbnail&show-editors-picks=true&to-date=" + requestedEndDate+"&from-date="+requestedBegDate +"&order-by=newest&api-key=" + guardianKey
  console.log(guardianAPIURL)
  return guardianAPIURL
}

function parseGuardianData(newsURL){
  $.get(newsURL)
  .then((data)=>{
    let articlesArr = data.response.results           //arr of obj
    console.log(data);
    for(let index in articlesArr){
      let article = articlesArr[index]
      let headline = article.webTitle
      let articleURL = article.webUrl
      let thumbnailURL = article.fields.thumbnail     // fields is an object
        if(thumbnailURL === undefined){
          thumbnailURL = 'https://pbs.twimg.com/profile_images/715857640853741568/nfNt_pGn_400x400.jpg'
        }
      let snippet = article.fields.trailText
      let pubDate = formatPubDate(article.webPublicationDate)

      let $hdLnHREF = $("<a>", {"href": articleURL})
      let $hdLnText = $("<h6>")

      let $hdLn =$("<span>")
      $hdLn.append($hdLnText.append(headline))

      let $pubDate = $("<span>", {"id": "aHdLn"})
      $pubDate.append("Published: ", pubDate)

      let $snippet = $("<div>")
      $snippet.append(snippet)

      let $image = $("<img>", {
        "src": thumbnailURL,
        "width": "100px",
        "height":"100px"
      })
      let $thumbnail = $("<span>", {"id": "aImg"}).append($image)
      let $article = $("<span>", {"id": "aText"}).append($hdLn).append($pubDate).append($snippet)

      let $articleCard = $("<div>", {"id": "aCard"})
      $articleCard.prepend($thumbnail).append($article)

      $("#guardian").append($articleCard)
    }
  })
  .catch((error)=> {
    console.error(error)
  })
}

// HELPER FUNCTIONs to nytURL() & guardianURL(): set begDate (start of date range)
function setBegDate() {
  let begDate = new Date()
  begDate.setDate(begDate.getDate() - 90)
  begDate = begDate.toISOString().split('T')[0]
  return begDate  // date formatted as YYYY-MM-DD
}

// HELPER FUNCTIONs to nytURL() & guardianURL(): set endDate (end of date range)in functions
function setEndDate() {
  let endDate = new Date()
  endDate = endDate.toISOString().split('T')[0]
  return endDate  // date formatted as YYYY-MM-DD
}

// HELPER FUNCTION to parseNYTData() & parseGuardianData(): format pubDate to display MM-DD-YYYY
function formatPubDate(date) {
  let formattedDate = date.split('T')[0].split('-')
  formattedDate.push(formattedDate.splice(0, 1))
  formattedDate = formattedDate.join("-")
  return formattedDate
}

// The New York Times API Branding Guide: https://developer.nytimes.com/branding
// Guardian API Branding Guide: https://www.theguardian.com/open-platform/logos

// Because you need to put the URL inside an image tag, which look like this...
// <img src='http://some.url/image.jpg' />
// <img src='http://media.guim.co.uk/99b52460e7e1660ed55200a44db0e19d357288f7/380_841_4547_2727/140.jpg' />
//
// ...so in code you'd do something like this...
// $("#results").append("<li><img src='" + data.response.results[i].fields.thumbnail + "' /></li>");

// "q=turkey, art, culture&fq=section_name:(\"world\") AND glocations:(\"turkey\")"
