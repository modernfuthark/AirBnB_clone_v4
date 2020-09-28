const $ = window.$;

$(document).ready(function () {
  const amens = {};
  $('input[type=checkbox]').change(
    function () {
      if (this.checked) {
        // alert($(this).attr('data-id'));
        amens[($(this).attr('data-name'))] = $(this).attr('data-attr');
      } else {
        delete amens[$(this).attr('data-name')];
      }
      // this just prints the list, debug stuff
      // alert(Object.keys(amens));

      $('.amenities h4').text(Object.keys(amens));
    });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function () {
      $('#api_status').addClass('available');
    },
    error: function () {
      $('#api_status').removeClass('available');
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      const _html = `<article><div class="title_box"> <h2> ${place.name} </h2> <div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest"><div class="guest_image"></div>${place.max_guest} Guests </div><div class="number_rooms"><div class="bed_image"></div>${place.number_rooms} Bedrooms</div><div class="number_bathrooms"><div class="bath_image"></div>${place.number_bathrooms} Bathrooms</div></div><div class="description">${place.description}</div></article>`;
      $('section.places').append(_html);
    }
  }
});
