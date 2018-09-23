var defaultLayers, map;
var locationsContainer;






function showFunction()
{
	 var x = document.getElementById("menu-4");
                   
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    }
}

function showFunction1()
{
    var x = document.getElementById("menu-2");

    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

 function loadMap(){
 window.alert("Loaded");

     // Step 1: initialize communication with the platform
     var platform = new H.service.Platform({
         app_id: 'devportal-demo-20180625',
         app_code: '9v2BkviRwi9Ot26kp2IysQ',
         useHTTPS: true
     });


     var pixelRatio = window.devicePixelRatio || 1;
      defaultLayers = platform.createDefaultLayers({
         tileSize: pixelRatio === 1 ? 256 : 512,
         ppi: pixelRatio === 1 ? undefined : 320
     });

// Step 2: initialize a map
     map = new H.Map(document.getElementById('map'), defaultLayers.normal.map, {
         // initial center and zoom level of the map
         zoom: 5,
         center: {lat: 20.5937, lng: 78.9629},
         pixelRatio: pixelRatio
     });


      locationsContainer = document.getElementById('panel');

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
     var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: main logic goes here
     addMetaInfoLayer(map);


 }
function addMetaInfoLayer(map) {
  // Subscribe to the metaInfo objects' pointermove event. The event bubbles up to
  // the TileProvider of the metaInfo layer.
  var tileProvider = defaultLayers.normal.metaInfo.getProvider();
  tileProvider.addEventListener('pointermove', updateMapCursor);

  // Change cursor back when not needed
  map.addEventListener('pointermove', updateMapCursor);

  // Add a metaInfo layer to the map
  map.addLayer(defaultLayers.normal.metaInfo);
}


/**
 * Sets cursor to pointer, when hovering over meta objects
 * @this {H.Map}
 * @param {H.mapevents.Event} e
 */
function updateMapCursor(e) {
  // Change cursor appearance when hovering over geographic objects
  map.getElement().style.cursor = (e.target === map) ? '' : 'pointer';
  if (e.target !== map){
    showMetaInfo(e);
  }
}


/**
 * Handler for metaInfo tap event
 *
 * @param {H.mapevents.Event} e Fired event
 */
function showMetaInfo(e) {
  var currentPointer = e.currentPointer,
      metaInfoData = e.target.getData(),
      // Format object's data for display
      content =  '<strong style="font-size: large;">' + metaInfoData.name  + '</strong></br>';
      content  += '<br/><strong>metaInfo:</strong><br/>';
      content  += '<div style="margin-left:5%; margin-right:5%;"><pre><code style="font-size: x-small;">' +
        JSON.stringify(metaInfoData, null, ' ') + '</code></pre></div>';
		
		
		
		console.log(typeof(JSON.stringify(metaInfoData, null, ' ')));
		
		// var myObj = JSON.parse(JSON.stringify(metaInfoData, ' ', '-'));
		// console.log(typeof(myObj));

  // locationsContainer.innerHTML = metaInfoData.name+"   " +metaInfoData["city center info"]+content;

  console.log("Value is "+metaInfoData.name);
  putCity=document.getElementById("city");
  putCity.innerText = metaInfoData.name;
    putCountry=document.getElementById("country");
    putCountry.innerText = metaInfoData["city center info"]["country code"];
    putLatitude=document.getElementById("latitude");
    putLatitude.innerText = metaInfoData["city center info"].position.latitude;
    putLongitude=document.getElementById("longitude");
    putLongitude.innerText = metaInfoData["city center info"].position.longitude;
    putPopulation=document.getElementById("population");
    putPopulation.innerText = metaInfoData["city center info"].population;
}



(function($) {

	"use strict";	

  	$(".main-menu a").click(function(){
		var id =  $(this).attr('class');
		id = id.split('-');
		$('a.active').removeClass('active');
    	$(this).addClass('active');
		$("#menu-container .content").slideUp('slow');
		$("#menu-container #menu-"+id[1]).slideDown('slow');		
		$("#menu-container .homepage").slideUp('slow');
		return false;
	});


	$(".main-menu a.homebutton").click(function(){
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .homepage").slideDown('slow');
		$(".logo-top-margin").animate({marginLeft:'45%'}, "slow");
		$(".logo-top-margin").animate({marginTop:'120px'}, "slow");
		return false;
	});

	$(".main-menu a.aboutbutton").click(function(){
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .about-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		return false;
	});

	$(".main-menu a.projectbutton").click(function(){
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .pro-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		return false;
	});

	$(".main-menu a.contactbutton").click(function(){
        // $("#menu-container .content").css("display", "block");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .contact-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		return false;
	});

	$('.toggle-menu').click(function(){
        $('.show-menu').stop(true,true).slideToggle();
        return false;
    });

    $('.show-menu a').click(function() {
    	$('.show-menu').fadeOut('slow');
    });


})(jQuery);
