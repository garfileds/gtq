(function() {
    var url = '/location/get/user1'
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.readystate === 4 && request.status === 200) {
            renderBMap(request.response);
        }
    };

    /*
     * @fn 处理location数据，调用百度地图显示location
     */
    function renderBMap(locations) {
        if (locations.code === 0) {
            var len = locations.length,
                sumX = 0,
                sumY = 0,
                points = [];

            sum.map(function(el) {
                points.push(new BMap.Point(el.x, el.y));
                sumX += el.x;
                sumY += el.y;
            });

            if (points.length === 0) {
                points = [new BMap.Point(116.41413701159672, 39.90795884517671),
                    new BMap.Point(116.3786889372559, 39.90762965106183),
                    new BMap.Point(116.38632786853032, 39.90795884517671),
                    new BMap.Point(116.39534009082035, 39.907432133833574),
                    new BMap.Point(116.40624058825688, 39.90789300648029)
                ];
            }

            //地图初始化
            var bm = new BMap.Map("allmap");
            bm.centerAndZoom(new BMap.Point(sumX / len, sumY / len), 15);

            //坐标转换完之后的回调函数
            var translateCallback = function(data) {
                if (data.status === 0) {
                    var i, maker;

                    for (i = 0; i < data.points.length; i++) {
                        (function() {
                            var imgId = new Date(locations[i].time).getTime();
                            var infoWindow = '<img src="' + locations[i].img + ' style="width: 150px;height: 150px">';
                            function showImg() {

                            }
                        })();

                        maker = new BMap.Marker(data.points[i]);
                        maker.addEventListener('click', showImgGeneration());
                        bm.addOverlay(maker);
                        bm.setCenter(data.points[i]);
                    }
                    bm.enableScrollWheelZoom(true);
                }
            };

            setTimeout(function() {
                var convertor = new BMap.Convertor();
                convertor.translate(points, 1, 5, translateCallback);
            }, 1000);
        } else {
            alert(data.desc);
        }
    }
})();
