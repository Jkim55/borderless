// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection2() {
  extractTravelAdvisories()
  extractVaccinations()
  extractWaterDrinkability()
  extractPhone()
  extractCurrency()
  extractElectricity()
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

  // Message to look like:
  //     <message from ISO2.advice> issued by <iso2 countryname>
  //     Full report <href to url>

}

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
    waterOutput = "No advisements exists regarding tap water in " + countryName
  } else {
    waterOutput = "Drinking tap water in " + countryName + " is " + waterDrinkability
  }
  let div = $("<div>");
  div.append(waterOutput)
  $("#sec2").append(div);
}

function extractPhone() {
  let countryCode = parsedData.telephone.calling_code
  let police = parsedData.telephone.police

  let div1 = $("<div>");
  div1.append(countryCode)
  $("#sec2").append(div1);

  let div = $("<div>");
  div.append(police)
  $("#sec2").append(div);
}

function extractCurrency(){
  let currencyName =  parsedData.currency.name
  let currencySymbol = parsedData.currency.symbol
  let currencyRate = parsedData.currency.rate
  let usDollarRate = 1
  let exchangeRate = usDollarRate/currencyRate

  let div = $("<div>");
  div.append(currencyName, currencySymbol, currencyRate)
  $("#sec2").append(div);

  // Format string to read:
  //     The currency in <country name> is <currency name> (<currency symbol>)
  //     Rate of exchange for <input field> <currency name> is <automatically calculated> in US Dollars
}

function extractElectricity() {
  let electricalInfo = parsedData.electricity //iterate thru parsedData; keys: voltage, frequency, plugs
  let voltage = electricalInfo.voltage
  let frequency = electricalInfo.frequency
  let plugsArr = []
  for(let plug in electricalInfo.plugs){
    plugsArr.push(electricalInfo.plugs[plug])
  }
  plugsArr = plugsArr.join(" / ")

  let div = $("<div>");
  div.append(electricalInfo)
  $("#sec2").append(div);

  let div1 = $("<div>");
  div1.append(voltage)
  $("#sec2").append(div1);

  let div2 = $("<div>");
  div2.append(frequency)
  $("#sec2").append(div2);

  let div3 = $("<div>");
  div3.append(plugsArr)
  $("#sec2").append(div3);
  // Display info in the following way:
  // Electrical Standards
  //     Voltage: <voltage> V
  //     Frequency: <frequency> Hz
  //     Power sockets: type <>
}
