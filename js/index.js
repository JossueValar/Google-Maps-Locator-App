window.onload = function(){//es6 syntax //when you load the website do this function
  //displayStores();
  //clickListener();
}
//function(){
  //its the same as the es6 = ()=>{
//}

var map;
      var markers = [];
      var infoWindow;

function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
],
    });
    infoWindow = new google.maps.InfoWindow();
searchStores();
}

function searchStores(){
  //console.log("searchIng");
var foundStores = [];
  var zipCode = document.getElementById('zipCode').value;
  if(zipCode){

    for(var store of stores){
      var postal = store['address']['postalCode'].substring(0,5);//catch only certain letters
      if(postal == zipCode){
        foundStores.push(store);
      }
    }
  } else {
    foundStores = stores;
  }

  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  clickListener();
}

function clearLocations(){
        infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;

}


function clickListener(){
  var storeElements = document.querySelectorAll('.storeCon');
  storeElements.forEach(function(elem,index){
    elem.addEventListener('click', function(){//es6 for each loop
      new google.maps.event.trigger(markers[index], 'click');
      toggleBounce(markers[index], 100);
    });
  });

  }
  //console.log(markers);



function displayStores(stores){ //contains functionality within it
  var storesHtml = ''; //how gets the information
  for(var [index,store] of stores.entries()){ //loops through all the stores for the length of stores and asigns the number for the var index
    var address = store['addressLines'];//get data from store data
    var phone = store['phoneNumber'];
    //${} to use javascript in html in javascript
    //using a vector
    storesHtml += `
    <div class="storeCon">
      <div class="storeConBack">
      <div class="storeinfocontainer">
        <div class="storeAddress">
            <span>${address[0]}</span>
            <span>${address[1]}</span>
        </div>
        <div class="phoneNumber">${phone}</div>
      </div>
        <div class="storenumbercontainer">
          <div class="storenumber">
            ${index+1}
          </div>
        </div>
        </div>
    </div>

    `
    //asign this to the item with no id
    document.querySelector('.storeList').innerHTML = storesHtml;
    //console.log(store);
  }
}

function showStoresMarkers(stores){//it's using this
  var bounds = new google.maps.LatLngBounds();
  for(var [index,store] of stores.entries()){

    var latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);

    var name = store["name"];
    var address = store["addressLines"][0];
    var address2 = store["addressLines"][1];
    var openTil = store["openStatusText"];
    var phone = store["phoneNumber"];
    var link = "https://maps.google.com/?q=" + address + "," + address2;

    bounds.extend(latlng);

    infoWindow = new google.maps.InfoWindow();

    createMarker(latlng, name, address, address2, index+1, openTil, phone, link);//Important the order we pass them


  }
  map.fitBounds(bounds);

}


function createMarker(latlng, name, address, address2, index, openTil, phone, link){
  var image = {
  url: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/06_1-512.png",

  scaledSize: new google.maps.Size(50, 50),
  labelOrigin: new google.maps.Point(25, 22),
};
  var html = `
        <div class?"storeInfoWin">
          <div class="storeNameWin">
            ${name}
          </div>
          <div class="storeInfoStatus">
          <i class="fas fa-clock"></i>
            ${openTil} &nbsp; Mon-Fri
          </div>
          <div class="storeAddressWin">
          <div class="circle">
          <i class="fas fa-paper-plane"></i>
          </div>
            <a class="link" href="${link}" target="_blank">${address}</a>
          </div>
          <div class="storePhoneWin">
          <div class="circle">
          <i class="fas fa-phone-alt"></i>
          </div>
            ${phone}
          </div>
        </div>
  `;
          var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            label: {text:index.toString(), color:"white"},
            animation: google.maps.Animation.DROP,
            icon: image
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            toggleBounce(marker, 100);
          });


          markers.push(marker);
}

function toggleBounce(marker, timeout) {
  var i;
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function(){ marker.setAnimation(); }, timeout);


      }
    }
