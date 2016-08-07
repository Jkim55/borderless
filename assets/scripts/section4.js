// Handles building translation widget
// Yandex api: have text box that takes english word and returns value of translated word in language or languages of country... look at language pairs from yandex
// Look into twilio


// The New York Times API Branding Guide: https://developer.nytimes.com/branding

  let guardianAPIURL='http://content.guardianapis.com/search?q='+ countryName + ' AND ('+ topic1 + '%20OR%20' + topic2 + ')&tag=type/article&show-fields=trailText,thumbnail&from-date=' + requestedBegDate + "&to-date=" + requestedEndDate + '&api-key=' + guardianKey


"http://content.guardianapis.com/search?q=" + countryName + "&tag=type/article&show-fields=trailText,thumbnail&to-date="+requestedEndDate+"&from-date="+requestedBegDate +"&order-by=newest&order-date=published&api-key=" + guardianKey
