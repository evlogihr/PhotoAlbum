var app = app || {};
app.fotos = app.fotos || {};

(function (app) {
    app.fotos.init = function () {
        function loadPhotos() {
            window.everlive.data('GeoPic').get()
                .then(function (data) {
                    var files = [];
                    data.result.forEach(function (file) {
                        $.ajax({
                            type: "GET",
                            url: 'http://api.everlive.com/v1/CymfvNenU2VZSJ23/Files/' + file.Pic,
                            //headers: { "Authorization" : "Bearer your-access-token-here" },
                            contentType: "application/json",
                        }).then(function (picData) {
                            files.push({
                                'imageUrl': picData.Result.Uri,
                                'location': file.Location
                            });
                        })
                        .then(function (){
                            $("#images").kendoMobileListView({
                        dataSource: files,
                        template: "<img src='#= data.imageUrl #'>"
                    });
                        });
                    });
                });
        }
        loadPhotos();
    };
}(app));