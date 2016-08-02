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
  console.log("Travel Advisories: ", parsedData.advise); // Object of objs with key (country ISO2) and values of an parsedData that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)
}

function extractVaccinations() {
  console.log("Vaccinations required: ", parsedData.vaccinations); //iterate thru array of obj; keys: message & name
}

function extractWaterDrinkability() {
  console.log("Water Drinkability Advisement: ", parsedData.water.short);
}

function extractPhone() {
  console.log("Country code: ", parsedData.telephone.calling_code);
  console.log("Police: ", parsedData.telephone.police);
}

function extractCurrency(){
  console.log("Currency: ", parsedData.currency.name, parsedData.currency.symbol, parsedData.currency.rate, parsedData.currency.compare[151].name, parsedData.currency.compare[151].rate) //iterate thru parsedData; keys: name, symbol, rate
}

function extractElectricity() {
  console.log("Electrical: ", parsedData.electricity) //iterate thru parsedData; keys: voltage, frequency, plugs
}
