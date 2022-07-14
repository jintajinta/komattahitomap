let hello = "hello"
let latitude
let longitude
function init() {
    let position_data = document.getElementById("position").value;
    console.log(position_data);
    let position=JSON.parse(position_data);
    console.log(position)
    var map = L.map('mapcontainer');
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    map.setView([35.4, 136], 5);
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);

    for(i=0;i<=position.length-1;i++){
        L.marker([position[i].lng, position[i].lat]).addTo(map).bindPopup("日本の端").openPopup();
    }

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
        console.log(error)
        alert("位置情報が取得できませんでした");
    };
}

function send(a) {
    console.log(a)
}


