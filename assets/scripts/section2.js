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
    let div = $("<div>");
    div.append(travelAdviceObj[travelAdvice].advise, travelAdviceObj[travelAdvice].url)
    $("#sec2").append(div);
  }
  // Will want to correlate with ISO- http://country.io/names.json)
  // OBJ looks like this... must iterate thru the OBJ to pull data value, which is a nested obj
  //     {ISO2: {
  //       advise: "<!-- START adv-taiwan -->Exercise normal security precautions<!-- END adv-taiwan -->"
  //       url: "http://travel.gc.ca/destinations/taiwan"
  //       }
  //     }
}
// Message to look like:
//     <message from ISO2.advice> issued by <iso2 countryname>
//     Full report <href to url>

function extractVaccinations() {
  let vaccinationArr = parsedData.vaccinations
  for(let vaccination in vaccinationArr){
    let div = $("<div>");
    div.append(vaccinationArr[vaccination].name, vaccinationArr[vaccination].message)
    $("#sec2").append(div);
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

  // let div1 = $("<div>");
  // div1.append(voltage)
  $("#voltage").append(voltage);

  // let div2 = $("<div>");
  // div2.append(frequency)
  $("#frequency").append(frequency);

  // let div3 = $("<div>");
  // div3.append(sockets)
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
  let currencyName =  parsedData.currency.name
  let currencySymbol = parsedData.currency.symbol
  $("#fxInfo").prepend(countryName);
  $("#fxInfo").append(currencyName, "(", currencySymbol, ")");
}

function extractFXWidget() {
  let currencyRate = parseFloat(parsedData.currency.rate)
  let fxRate = 1/currencyRate            // fx for 1 USD
  let $fxCalc = parseFloat($("#fxInput").val())   // (1) Capture user input
  $fxCalc = parseFloat($fxCalc) * fxRate
  $("#fxCalculated").append($fxCalc)
  console.log($fxCalc)
}

// travelbriefing.org Branding
