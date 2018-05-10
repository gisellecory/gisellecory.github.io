// This example uses a GroundOverlay to place an image on the map
// showing an antique map of Newark, NJ.

var historicalOverlay;

function initMap(theJSON) {
  // initMap first sets the long lat of the initial map shown to the user
  // note we can change the zoom to whatever looks good
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: {
      lat: 51.481725,
      lng: -3.178103
    }
  });

  // theJSON is read in on the index page and passed in to this function
  // First in the loop we place the image overlay
  // tabdelimited is theJSON in this instance because we are creating the json using
//  const number_of_items = 10;
  var overlays = [];
  var rectangles = [];
  //var text = JSON.stringify(theJSON);
  //var obj = JSON.parse(text);
   //console.log(obj);
  const number_of_items = theJSON.Sheet1.length;
let i=0;
  for (let i = 0; i < number_of_items; i++) {
    console.log(theJSON.Sheet1[i]);
    var templat = parseFloat(theJSON.Sheet1[i].lat);
    var templong = parseFloat(theJSON.Sheet1[i].long);
    var southlat = parseFloat(theJSON.Sheet1[i].lat) - 0.0001;
    var westlong = parseFloat(theJSON.Sheet1[i].long) - 0.0001;

    // voila the image bounds is born
    var imageBounds = {
      north: parseFloat(theJSON.Sheet1[i].lat),
      south: parseFloat(southlat.toFixed(6)),
      east: parseFloat(theJSON.Sheet1[i].long),
      west: parseFloat(westlong.toFixed(6))
    };

    // write the overlay to the map
    overlays[i] = new google.maps.GroundOverlay(
      'images/' + theJSON.Sheet1[i].Image, // put image url here from JSON
      imageBounds);
    overlays[i].setMap(map);

    rectangles[i] = new google.maps.Rectangle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: '#FFFFFF',
      fillOpacity: .01,
      bounds: imageBounds
    });
    rectangles[i].setMap(map);
    rectangles[i].addListener('click', function() {
      let rect_number = i;
      showpopupdetails(theJSON.Sheet1[i], overlays[i]); //
    });

  } // end of main for i loop


} // end of initiMap

function showpopupdetails(theJSONline, theOverlay) {
  //  console.log('yay!');
  console.log(theJSONline, theOverlay);
  var content = theJSONline.PopUpContent; // or whatever the popup content is called

  var infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 350,
    position: {
      lat: parseFloat(theJSONline.lat),
      lng: parseFloat(theJSONline.long)
    }
  });
  infowindow.open(map, theOverlay);
}



function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}
