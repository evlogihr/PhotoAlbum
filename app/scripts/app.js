(function () {
    document.addEventListener("deviceready", function () {
        window.everlive = new Everlive("CymfvNenU2VZSJ23");

        window.listView = kendo.observable({
            addImage: function () {
                var location = {};

                var picSuccess = function (data) {
                    var id;
                    window.everlive.Files.create({
                            Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                            ContentType: "image/jpeg",
                            base64: data
                        },
                        function (picData) {
                            window.everlive.data('GeoPic').create({
                                'Pic' : picData.result.Id,
                                'Location': location
                            }, function (data) {
                                console.log(data);
                            }, error);
                        }, error);
                };
                var error = function () {
                    navigator.notification.alert("Unfortunately we could not add the image");
                };
                var picConfig = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    targetHeight: 400,
                    targetWidth: 400
                };
                var geoConfig = {                    
                    enableHighAccuracy: true
                };
                var geoSuccess = function (data) {
                    location = {
                        longitude: data.coords.longitude,
                        latitude: data.coords.latitude
                    };

                    navigator.camera.getPicture(picSuccess, error, picConfig);
                };

                navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
            },
        });

        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            initial: "second-view"
            //transition: "slide"
        });

    });
}());