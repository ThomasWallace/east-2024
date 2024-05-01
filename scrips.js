// Sets Initial Conditions and Event Handlers

$("#mars-form").validate({});
$("#mars-form").submit(function (event) {
  event.preventDefault();
});
$("#search-btn").click(function () {
  GetData();
});
$("#clear-btn").click(function () {
  ClearForm();
});
$("#curiosity").on("change", function () {
  DefaultDate();
});
$("#opportunity").on("change", function () {
  DefaultDate();
});
$("#spirit").on("change", function () {
  DefaultDate();
});

// Applys Default Date Value to Match Beginning of Each Mission
function DefaultDate() {
  if (document.getElementById("curiosity").checked) {
    document.getElementById("picture-date").value = "2012-08-06";
  }
  if (document.getElementById("opportunity").checked) {
    document.getElementById("picture-date").value = "2004-01-26";
  }
  if (document.getElementById("spirit").checked) {
    document.getElementById("picture-date").value = "2004-01-05";
  }
}

// Fetches Data from NASA API based on user choice and displays the first 25 results

async function GetData() {

  if ($("#mars-form").valid()) {
    
    $("#results").removeClass("hidden").addClass("visible");
    
    /* Example can be seen at https://api.nasa.gov/ */
    /* Manifests can be seen at https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=DEMO_KEY */

    if (document.getElementById("curiosity").checked) {
      rover = document.getElementById("curiosity").value;
    }
    if (document.getElementById("opportunity").checked) {
      rover = document.getElementById("opportunity").value;
    }
    if (document.getElementById("spirit").checked) {
      rover = document.getElementById("spirit").value;
    }

    picturedate = document.getElementById("picture-date").value;

    /* URL for Fetch Call */
    var apiKey="wAokuJzr1ysfNYhn80UezPdo4nlYK9h7WoeuvKqB"
    var myURL =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
      rover +
      "/photos?earth_date=" +
      picturedate +
      "&page=1&api_key=" + apiKey;

    var msgObject = await fetch(myURL);
    var msgJSONText = await msgObject.text();
    
    // Parse the JSON string into an object
    var msg = JSON.parse(msgJSONText);

    /* Your code to process the result goes here - display the returned message */
    var fLen = msg.photos.length;
    document.getElementById("photos-returned").innerHTML =
      fLen + " photos found. Click a photo to display full size:";
    for (var i = 0; i < 25; i++) {
      if (i < fLen) {
        document.getElementById("image" + i).src = msg.photos[i].img_src;
        document.getElementById("image" + i).title =
          msg.photos[i].camera.full_name;
        document.getElementById("anchor" + i).href = msg.photos[i].img_src;
        document.getElementById("image" + i).style.display = "inline";
      } else {
        document.getElementById("image" + i).src = "#";
        document.getElementById("anchor" + i).href = "#";
        document.getElementById("image" + i).style.display = "none";
      }
    }
  }
}

// Resets Form and Setting to default states
function ClearForm() {
  document.getElementById("curiosity").checked = false;
  document.getElementById("opportunity").checked = false;
  document.getElementById("spirit").checked = false;
  document.getElementById("rover-error").innerHTML = "";
  document.getElementById("picture-date").value = "";
  document.getElementById("picture-date-error").innerHTML = "";
  $("#results").removeClass("visible").addClass("hidden");
}
