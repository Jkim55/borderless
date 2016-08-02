// CONTROLLER FUNCTION: triggers helper(?) functions that parses single country's JSON
function buildSection2(obj) {
  extractTravelAdvisories()
  extractVaccinations()
  extractWaterDrinkability()
  extractPhone()
}

function extractTravelAdvisories() {
  console.log("Travel Advisories: ", obj.advise); // Object of objs with key (country ISO2) and values of an obj that has keys of advise & URL (will want to correlate with ISO- http://country.io/names.json)

}

function extractVaccinations() {
  console.log("Vaccinations required: ", obj.vaccinations); //iterate thru array of objs; keys: message & name
}

function extractWaterDrinkability() {
  console.log("Water Drinkability Advisement: ", obj.water.short);
}

function extractPhone() {
  console.log("Country code: ", obj.telephone.calling_code);
  console.log("Police: ", obj.telephone.police);
}
