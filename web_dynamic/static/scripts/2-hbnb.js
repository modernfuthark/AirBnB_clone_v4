const $ = window.$;

$( document ).ready(function() {
  let amens = {};
  $('input[type=checkbox]').change(
    function(){
      if (this.checked) {
        //alert($(this).attr('data-id'));
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
