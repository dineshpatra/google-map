(function($) {
    var map = null;
    $(document).ready(function() {
        map = new google.maps.Map(document.getElementById('google-map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });

    });
})(jQuery);