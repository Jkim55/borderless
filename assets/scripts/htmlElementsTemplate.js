<span id="tAdvice"></span>
<span> issued by </span>
<span id="tIssueCountry"></span>
<a href="#"></a>Full Report</a>

<span id="vaccine"></span>
<span id="vAdvice"></span>


// Append the divs you declare in your js file onto an existing containing div in html
$("#results").append($destination.append($minPrice.append(
  $("<div/>", {
    "class": "row s12 m3"
  })).append(
    $("<a>", {
      "class": "btn waves-effect waves-effect waves-light blue-grey",
      "href": $link,
      "target": '_blank',
      "text": ">>>"
    })
  )
))

// Heres some syntax for creating divs in jQuery and giving them styles
var $results = $("<div />", {
  "class": "row s12 m3 center",
});

var $destination = $("<div />", {
  "class": "row s12 m3 center"
});

var $minPrice = $("<div />", {
  "class": "row s12 m3 center"
});
