#!/usr/bin/node

$(document).ready(function () {
  let amenity_ids = {};
  $("input[type='checkbox']").change(function () {
    if (this.checked) {
      amenity_ids[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenity_ids[$(this).attr("data-id")];
    }
    const amenities = [];
    for (const k in amenity_ids) {
      amenities.push(amenity_ids[k]);
    }
    if (amenities.length > 0) {
      $(".amenities h4").text(amenities);
    } else {
      $(".amenities h4").html('&nbsp;');
    }
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function(data, textStatus) {
    if (data.status == 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.post({
    url: "http://127.0.0.1:5001/api/v1/places_search",
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({}),
    dataType: 'json',
    success: function(data) {
      $.each(data, function (index, place) {
        const article = $('<article></article>');
	article.html(
	  `<div class="title_box">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">${place.price_by_night }</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
	  </div>
          <div class="description">
	    ${place.description}
          </div>
	`);
	$('section.places').append(article);
      });
    }
  });
});
