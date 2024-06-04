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
});
