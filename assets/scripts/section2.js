// GLOBAL VARIABLES
let fxRate
let currencyName
let currencySymbol

// CONTROLLER FUNCTION: triggers helper functions that parses single country's JSON
function buildSection2() {
  extractTravelAdvisories()
  extractVaccinations()
  extractWaterDrinkability()
  extractPhone()
  extractElectricity()
  extractCurrencySummary()
  extractFXWidget()
}

function extractTravelAdvisories() {
  let travelAdviceObj = parsedData.advise
  for(let travelAdvice in travelAdviceObj){
    let $tAdvice = $("<div>").append(travelAdviceObj[travelAdvice].advise)
    let $tCountry = $("<div>", {
      "class": "tCountry",
    })
    let tCMessage = "Issued by " + travelAdvice + " "
    let fullDoc = travelAdviceObj[travelAdvice].url
    let $tDocs = $("<a>", {
      "id": "tLink",
      "href": fullDoc,
      "text": "Full Report"
    })

    $("#travelAdvisories").append($tAdvice);
    $("#travelAdvisories").append($tCountry.append(tCMessage).append($tDocs));
  }
}


function extractVaccinations() {
  let vaccinationArr = parsedData.vaccinations
  if (vaccinationArr.length !== 0){
    for(let vaccination in vaccinationArr){
      let $vaccine = $("<div>");
      $vaccine.append(vaccinationArr[vaccination].name, ": ", vaccinationArr[vaccination].message)
      $("#vaccinationRecs").append($vaccine);
    }
  } else {
    $("#vaccinationRecs").append("No vaccination recommendations exist for travel to ", countryName)
  }
}

function extractWaterDrinkability() {
  let waterDrinkability = parsedData.water.short
  let waterOutput
  if (waterDrinkability === null){
    waterOutput = "No advice exists regarding tap water in " + countryName
  } else {
    waterOutput = "Drinking tap water in " + countryName + " is " + waterDrinkability
  }
  $("#wAdvice").append(waterOutput);
}

function extractPhone() {
  let countryCode = parsedData.telephone.calling_code
  let police = parsedData.telephone.police
  if (police === ""){
    police = "No contact information is provided for the police in " + countryName
  }
  $("#cCode").append(countryCode)
  $("#poPo").append(police);
}

function extractElectricity() {
  let voltage = parsedData.electricity.voltage
  let frequency = parsedData.electricity.frequency
  let sockets = displaySocketInfo()
  $("#voltage").append(voltage);
  $("#frequency").append(frequency);
  $("#socket").append(sockets);
}

// HELPER FUNCTION to extractElectricity()
function displaySocketInfo() {
  let plugsArr = []
  for(let plug in parsedData.electricity.plugs){
    plugsArr.push(parsedData.electricity.plugs[plug])
  }
  plugsArr = plugsArr.join(" / ")
  return plugsArr
}

function extractCurrencySummary() {
  currencyName =  parsedData.currency.name
  currencySymbol = parsedData.currency.symbol
  $("#fxInfo").prepend(countryName);
  $("#fxInfo").append(currencyName, " (", currencySymbol, ")");
}

function extractFXWidget() {
  let currencyRate = parseFloat(parsedData.currency.rate)
  fxRate = 1/currencyRate
  let $fxRate = $("<div>")
  $fxRate.append("FX rate to 1 USD($) is ", + fxRate)          // fx for 1 USD
  $("fxRateFootnote").append($fxRate);
}

$("#fxBtn").click((event)=>{
  let $fxInput = $("#fxInput").val()
  let $fxCalc = parseFloat($fxInput)   // (1) Capture user input
  $fxCalc = ($fxCalc * fxRate).toFixed(2)
  let $fxResults = $("<div>")
  let snippet = $fxInput + " " + currencyName + " (" + currencySymbol + ") is equivalant to $" + $fxCalc + " USD"
  $fxResults.append(snippet)
  $("#fxList").append($fxResults)
})

// travelbriefing.org Branding
