let hello ="hello"
let latitude
let longitude
function init(position) {
    console.log(position)
    var map = L.map('mapcontainer');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    map.setView([35.4, 136], 5);
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    console.log(map)
    console.log(hello)
    hello="no"
    console.log(hello)
    function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        document.getElementById("latitude").innerHTML = latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        document.getElementById("longitude").innerHTML = longitude;
        L.marker([latitude, longitude]).addTo(map).bindPopup("現在地").openPopup();
    };
    // 取得に失敗した場合の処理
    function errorCallback(error) {
        alert("位置情報が取得できませんでした");
    };
}

function send(a){
    console.log(a)
}


