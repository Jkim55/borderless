// GLOBAL VARIABLES
let textToTrans
let yandexURLArr = []

// CONTROLLER FUNCTION: builds translation widget
function buildSection4() {
  var langArray = identifyOfficialLang(languageArr)
  var langKeyArray = findLangKey(langArray)
  var keyPairs = makeLanguagePairs(langKeyArray);
  createYandexURLs(keyPairs)
}

function identifyOfficialLang() {
  let langsToTrans = []
  for(let index in languageArr){
    if (languageArr[index].official === "Yes"){
      langsToTrans.push(languageArr[index].language)
    }
  }
  return langsToTrans
}

function createLabels() {
  
}

function findLangKey(langsToTransArr) {
  let langPairs = []
  for(let index in langsToTransArr){
    let language = langsToTransArr[index]
    let i = 0
    while (i < alllanguages_JSON.length){
      if (alllanguages_JSON[i].language === language){
        langPairs.push(alllanguages_JSON[i].key)
        break;
      } else {
        i++
      }
    }
  }
  return langPairs
}

function makeLanguagePairs(langKeys){
  for(key in langKeys){
    langKeys[key] = "en-" + langKeys[key]
  }
  return langKeys                          // langKeys: en-ru
}

// FUNCTION: builds URL for GET request
function createYandexURLs(pairs) {
  for(pair in pairs){
    yandexURLArr.push("https://translate.yandex.net/api/v1.5/tr.json/translate?lang=" + pairs[pair]+ "&key=" + yandexKey + "&text=")
  }
}

// FUNCTION: onClick "#translator"    // should this be wrapped in a function? Seems wrong...
$("#transBtn").click((event)=>{
  event.preventDefault()
  textToTrans = $("#translator").val()                   // (1) Capture user input
  for(let index in yandexURLArr){                        // (2.0) For each url created for every official language
    let yandexURL = yandexURLArr[index] + textToTrans    // (2.1) Concat URL with userinput (textToTrans)
    $.get(yandexURL)                                     // (2.2) Trigger GET request
    .then((data) => {
      return data["text"][0]
    })
    .then((phrase) => {                                  // (2.3) Append to dom
    let $div = $("<div>");
    $div.append("translated to: ", phrase)
    $("#results").append($div);
    })
  }
})
