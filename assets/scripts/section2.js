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
  console.log("Travel Advisories: ", parsedData.advise);
  // Will want to correlate with ISO- http://country.io/names.json)
  // OBJ looks like this... must iterate thru the OBJ to pull data value, which is a nested obj
  //     {ISO2: {
  //       advise: "<!-- START adv-taiwan -->Exercise normal security precautions<!-- END adv-taiwan -->"
  //       url: "http://travel.gc.ca/destinations/taiwan"
  //       }
  //     }

  // Message to look like:
  //     <message from ISO2.advice>
  //     Issued by <country name>
  //     Full report <href to url>

}

function extractVaccinations() {
  let vaccinationArr = parsedData.vaccinations
  for(let vaccination in vaccinationArr){
    console.log(vaccinationArr[vaccination].name)
    console.log(vaccinationArr[vaccination].message)
  }
}

function extractWaterDrinkability() {
  let waterDrinkability = parsedData.water.short)
  // string to format as: "Drinking tap water in <country name> is <waterDrinkability>"
  // create a rule - if null, then display default:
  // "Unfortunately we do not have information about tap water in Taiwan"
}

function extractPhone() {
  let countryCode = parsedData.telephone.calling_code;
  let police = parsedData.telephone.police;
}

function extractCurrency(){
  let currencyName =  parsedData.currency.name
  let currencySymbol = parsedData.currency.symbol
  let currencyRate = parsedData.currency.rate
  let usDollarRate = 1
  // create a input field
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

  // Display info in the following way:
  // Electrical Standards
  //     Voltage: <voltage> V
  //     Frequency: <frequency> Hz
  //     Power sockets: type <>
}
