let latitude
let longitude
var GSI = {};
function init() {

    let task_data = document.getElementById("tasks").value;
    let task = JSON.parse(task_data);
    console.log(task_data)
    var map = L.map('map');
    map.setView([36.00, 137], 10);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let pingcontents = ""
    for (i = 0; i <= task.length - 1; i++) {
        if (!Boolean(task[i].canceled) && !Boolean(task[i].completed)) {
            pingcontents = "分類:" + task[i].class + "<br>内容:" + task[i].content + "<br>位置の詳細:" + task[i].location_details + "<br>投稿者の見た目:" + task[i].appearance + "<br><input type = \"button\" value = \"助けに行く\" onClick = \"help_button_pressed(" + task[i].id + ")\">"
            L.marker([task[i].lat, task[i].lng],{icon: L.spriteIcon('red')}).addTo(map).bindPopup(pingcontents).openPopup();
        }
    }

    async function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        map.setView([latitude, longitude], 10);
        let url = new URL('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress');
        url.searchParams.set('lat', latitude);
        url.searchParams.set('lon', longitude);
        const res=await fetch(url);
        const json = await res.json();
        const data = json.results;
        const muniData = GSI.MUNI_ARRAY[json.results.muniCd];
        const [prefCode, pref, muniCode, city] = muniData.split(',');
        let tweettext=`${pref} ${city} ${data.lv01Nm}`+"でボランティア活動中！";
        document.getElementById("address").value=tweettext;
    };
    // 取得に失敗した場合の処理
    function errorCallback(error) {
        console.log(error)
        alert("位置情報が取得できませんでした");
    };
}

function help_button_pressed(id) {
    document.getElementById("taskid").value = id;
    document.helpform.submit();
}

function tweet(){
    window.open('https://twitter.com/share?text=' + document.getElementById("address").value + '&url=' + 'https://enthousiaste-fromage-22608.herokuapp.com'  + '&hashtags=' + 'helpジャスフォ');
}

var L = global.L || require('leaflet');

var fs = require('fs');

var sources = {
	blank: 'data:image/png;base64,' + fs.readFileSync(__dirname + '/blank.png', 'base64'),
	sprite: 'data:image/png;base64,' + fs.readFileSync(__dirname + '/sprite.png', 'base64')
};
function css(string) {
	var tag = document.createElement('style');
	tag.innerHTML = string;
	document.getElementsByTagName("head")[0].appendChild(tag);
}

L.spriteIcon = function(color) {
  color = color || 'blue';
  return L.icon({
    className: "leaflet-sprite leaflet-sprite-" + color,
    iconSize: [24, 41],
    shadowsize: [41, 41],
    iconAnchor: [12, 41],
    iconUrl: sources.blank,
    shadowUrl: L.Icon.Default.imagePath + "/marker-shadow.png"
  });
};

var cssRegular = ".leaflet-sprite{background:url(" + sources.sprite + ") no-repeat top left;}\n.leaflet-sprite-blue{ background-position: 0 -132px; width: 41px; height: 41px; } \n.leaflet-sprite-green{ background-position: 0 -355px; width: 41px; height: 41px; } \n.leaflet-sprite-orange{ background-position: 0 -578px; width: 41px; height: 41px; } \n.leaflet-sprite-purple{ background-position: 0 -801px; width: 41px; height: 41px; } \n.leaflet-sprite-red{ background-position: 0 -1024px; width: 41px; height: 41px; } \n.leaflet-sprite-violet{ background-position: 0 -1247px; width: 41px; height: 41px; } \n.leaflet-sprite-yellow{ background-position: 0 -1470px; width: 41px; height: 41px; } ";

var cssRetina = ".leaflet-sprite{\nbackground:url(" + sources.sprite + ") no-repeat top left;\nbackground-size:41px, 41px\n}\n .leaflet-sprite-blue{ background-position: 0 0; width: 41px; height: 41px; } \n .leaflet-sprite-green{ background-position: 0 -111px; width: 41px; height: 41px; } \n .leaflet-sprite-orange{ background-position: 0 -223px; width: 41px; height: 41px; } \n .leaflet-sprite-purple{ background-position: 0 -334px; width: 41px; height: 41px; } \n .leaflet-sprite-red{ background-position: 0 -446px; width: 41px; height: 41px; } \n .leaflet-sprite-violet{ background-position: 0 -557px; width: 41px; height: 41px; } \n .leaflet-sprite-yellow{ background-position: 0 -669px; width: 41px; height: 41px; } ";

if (L.Browser.retina) {
  css(cssRetina);
} else {
  css(cssRegular);
}