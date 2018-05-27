var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/',
            url: '/',
            tabs: [
                {
                    path: '/',
                    id: 'feed',
                    url: './pages/feed',
                },
            ]
        },
        {
            path: '/community/',
            id: 'community',
            url: './pages/community',
        },
    ],
    // ... other parameters
});

var mainView = app.views.create('.view-main');

function downloadCsv() {
    var req = new XMLHttpRequest();
    req.open("get", "/area_mesh.csv", true);
    req.send(null);

    req.onload = function(){
	      convertCSVtoArray(req.responseText);
    }
}

function convertCSVtoArray(str)
{
    var result = [];
    var tmp = str.split("\n");

    for(var i=0;i<tmp.length;++i){
        vals = tmp[i].split(',');
        result[vals[0].substring(1).slice(0, -1)] = [vals[3], vals[6]]
    }

    var req = new XMLHttpRequest();
    req.open("get", "/sendai.csv", true);
    req.send(null);

    req.onload = function(){
        var area = [];
        var tmp = req.responseText.split("\n");

        for(var i=0;i<tmp.length;++i){
            var vals = tmp[i].split(',');;
            area[i] = {
                // date	day_of_week	time	area	residence	age	gender	population
                'date': vals[0],
                'day-of-week': vals[1],
                'time': vals[2],
                'area': vals[3],
                'residence': vals[4],
                'age': vals[5],
                'gender': vals[6],
                'population': parseInt(vals[7])
            }
        }

        console.log(area.length);
        console.log(result.length);

        setup(area, result);
    }

}

downloadCsv();

function setup(sendaiArea, areaMesh) {
    var heatMapData = []

    for (var i = 1; i < sendaiArea.length; i++) {
        var area = sendaiArea[i]['area']
        var mesh = areaMesh[area]
        var data = sendaiArea[i]
        if (mesh != undefined && data['age'] == 20 && data['time'] == '20' && data['day-of-week'] == '02' && data['date'] == '20170800') {
            var latlng = new google.maps.LatLng(mesh[1], mesh[0])
            heatMapData.push({location: latlng, weight: sendaiArea[i]['population']})

            var circle = new google.maps.Circle({
	              center: latlng,
	              map: map ,
	              radius:300,
	              fillColor: '#00f', // $('#fillColor').val(), 		// 塗りつぶし色
	              fillOpacity:  sendaiArea[i]['population'] / 10000, // $('#fillOpacity').val(),		// 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
	              strokeColor: '#00f', // $('#strokeColor').val(),		// 外周色
	              strokeOpacity: 1, //$('#strokeOpacity').val(),	// 外周透過度（0: 透明 ⇔ 1:不透明）
	              strokeWeight: 0, //$('#strokeWeight').val()		// 外周太さ
            });
        }
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });
    // heatmap.setMap(map);

    
    var latLng = new google.maps.LatLng(38.260144,140.8821270);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
    });

    marker.addListener('click', function() {
          var contentString = '<div id="content">'+
              '【本日 19:30】ポプテピピックオフ@たんや'+
              '<div id="bodyContent">'+
              ' <button class="button button-fill" onclick="location.href=\'/pages/events/1\'">イベント詳細</button>' +
              '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
        infowindow.open(map, marker);
    });


    var latLng2 = new google.maps.LatLng(38.258952,140.872678);
    var marker2 = new google.maps.Marker({
        position: latLng2,
        map: map,
    });

    marker2.addListener('click', function() {
        var contentString = '<div id="content">'+
            '【明日 19:30】<br>'+
            'SHISHAMO一緒に観覧する人募集<br>@ライブハウス(Hook Sendai)<br>' +
            '<div id="bodyContent">'+
            ' <button class="button button-fill" onclick=\'location.href="/pages/event/2"\'>イベント詳細</button>' +
            '</div>';

        var infowindow2 = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow2.open(map, marker2);
    });


    var latLng3 = new google.maps.LatLng(38.26164400,140.8797470);
    var marker3 = new google.maps.Marker({
        position: latLng3,
        map: map,
    });

    marker3.addListener('click', function() {
        var contentString = '<div id="content">'+
            '【本日 20:00以降】<br>'+
            '会津のお酒の堪能会<br>@居酒屋赤べこ駅前<br>' +
            '<div id="bodyContent">'+
            ' <button class="button button-fill" onclick=\'location.href="/pages/event/3"\'>イベント詳細</button>' +
            '</div>';

        var infowindow3 = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow3.open(map, marker3);
    });


}
