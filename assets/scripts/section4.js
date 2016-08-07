// CONTROLLER FUNCTION: builds translation widget
function buildSection4() {
  // accessLangObj()
  var langArray = identifyOfficialLang(languageArr)
  findLangKey(langArray)
}

function accessLangObj() {
  let langKey = []
  for (let index in allLanguages_JSON ){
    langKey.push(allLanguages_JSON[index].key)
  }
  console.log(langKey);
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

function findLangKey(langsToTransArr) {
  for(let index in langsToTransArr){
    let language = langsToTransArr[index]
    // console.log(language);
    let i = 0
    while (i < alllanguages_JSON.length){
      if (alllanguages_JSON[i].language === language){
        console.log(alllanguages_JSON[i].key)
        break;
      } else {
        i++
      }
    }
  }
}

//translates common phrases from english to country's official lang; also takes user input
// let textToTrans = //userinput ie  en-ru
// let yandexURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=" + langPair + "&key=" + yandexKey + "&text=" + textToTrans
//
// function translateText (){
//   $.get(yandexURL)
//   .then((data) => {
//     console.log(data)
//   })
// }

// twilio to text words?
