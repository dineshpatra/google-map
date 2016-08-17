(function($) {
    var map = null;
    var originMarkerArr = [];

    $(document).ready(function() {
        var geocoder = new google.maps.Geocoder();
        var bounds = new google.maps.LatLngBounds;
        map = new google.maps.Map(document.getElementById('google-map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 5
        });
        geocoder.geocode({'address': 'India'}, function(results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
            }
        });
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000'
        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';

        $("#from-address").on('focus', function() {
             $(this).parent().removeClass('has-error');
         });
        $("#from-address").on('blur', function() {
            var address = $(this).val();
            deleteOriginMarkers();
            if (!address) {
                $("#from-address").parent().addClass('has-error');
                return;
            }
            geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    map.fitBounds(bounds.extend(results[0].geometry.location));
                    originMarkerArr.push(new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        icon: originIcon
                    }));
                    $("#from-address").parent().removeClass('has-error').addClass('has-success');
                } else {
                    $("#from-address").parent().addClass('has-error');
                }
            });

        });


        function deleteOriginMarkers() {
            for (var i = 0; i < originMarkerArr.length; i++) {
                originMarkerArr[i].setMap(null);
            }
            originMarkerArr = [];
        }


    });
})(jQuery);