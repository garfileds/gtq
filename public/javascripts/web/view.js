(function() {
    var request = new XMLHttpRequest();
    var rootDevice = document.getElementById('js-content'),
        loading = document.getElementById('loading');

    rootDevice.addEventListener('click', function(e) {
        var target = e.target;

        if (target.tagName.toLowerCase() === 'span') {
            var ancestorLi = target.parentNode,
                userCode = target.dataset.usercode,
                url = '/location/get/' + userCode;

            var liSiblings;

            //改变选中的li的样式
            liSiblings = ancestorLi.parentNode.querySelectorAll('li');
            Array.prototype.forEach.call(liSiblings, function(el) {
                el.className = '';
            });

            ancestorLi.className = 'active';

            //取消正在发送的xhr
            if (request.readyState < 4) {
                request.abort();
            }

            request.open('GET', url);
            request.setRequestHeader('Accept', 'application/json');
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    loading.style.display = 'none';
                    renderBMap(JSON.parse(request.response));
                } else if (request.readyState < 4) {
                    loading.style.display = 'block';
                }
            };
            request.send(null);
        }
    });

    //页面加载完成默认触发一号设备点击事件
    var clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    var deviceOneSpan = rootDevice.firstElementChild.querySelector('span');

    deviceOneSpan.dispatchEvent(clickEvent);

    /*
     * @fn 处理location数据，调用百度地图显示location
     */
    function renderBMap(data) {
        if (data.code === 0) {
            var sumX = 0,
                sumY = 0,
                points = [],
                locations = data.result,
                len = locations.length;

            locations.forEach(function(el) {
                points.push(new BMap.Point(el.x, el.y));
                sumX += el.x;
                sumY += el.y;
            });

            /*if (points.length === 0) {
                points = [new BMap.Point(116.41413701159672, 39.90795884517671),
                    new BMap.Point(116.3786889372559, 39.90762965106183),
                    new BMap.Point(116.38632786853032, 39.90795884517671),
                    new BMap.Point(116.39534009082035, 39.907432133833574),
                    new BMap.Point(116.40624058825688, 39.90789300648029)
                ];
            }*/

            //地图初始化
            var bm = new BMap.Map("allmap");
            bm.centerAndZoom(new BMap.Point(sumX / len, sumY / len), 15);

            //坐标转换完之后的回调函数
            var translateCallback = function(data) {
                if (data.status === 0) {
                    var i, maker;

                    var timeFormate = function(date) {
                        var result = [];
                        result.push(date.getFullYear(), '年', date.getMonth() + 1, '月', date.getDate(), '日', date.getHours(), '时', date.getMinutes(), '分');
                        return result.join('');
                    };

                    for (i = 0; i < data.points.length; i++) {
                        maker = new BMap.Marker(data.points[i]);
                        maker.addEventListener('click', showImgGeneration());
                        bm.addOverlay(maker);
                        bm.setCenter(data.points[i]);
                    }
                    bm.enableScrollWheelZoom(true);
                }

                //利用闭包生成坐标点击事件的处理程序: 保存i的信息
                function showImgGeneration() {
                    var index = i;
                    var time = new Date(locations[index].time);
                        imgId = time.getTime();

                    var sContent = [], infoWindow;

                    sContent.push('<img id=', imgId, ' src=', locations[index].img, ' style="width: 150px;height: 150px">',
                                    '<p>拍摄时间：', timeFormate(time), '</p>');

                    var showImg = function() {
                        var infoWindow = new BMap.InfoWindow(sContent.join(''));
                        this.openInfoWindow(infoWindow);

                        //图片加载完毕重绘infowindow
                        document.getElementById(imgId).onload = function() {
                            //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
                            infoWindow.redraw();
                        };
                    };

                    return showImg;
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
