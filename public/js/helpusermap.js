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
    let url = new URL('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress');
    url.searchParams.set('lat', latitude);
    url.searchParams.set('lon', longitude);
    fetch(url).then((response) => response.json()).then((data) => console.log(data));
    console.log(response)
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let pingcontents = ""
    for (i = 0; i <= task.length - 1; i++) {
        if(!Boolean(task[i].canceled)&&!Boolean(task[i].completed)){
        pingcontents = "分類:" + task[i].class + "<br>内容:" + task[i].content + "<br>位置の詳細:" + task[i].location_details + "<br>投稿者の見た目:" + task[i].appearance + "<br><input type = \"button\" value = \"助けに行く\" onClick = \"help_button_pressed(" + task[i].id + ")\">"
        L.marker([task[i].lat, task[i].lng]).addTo(map).bindPopup(pingcontents).openPopup();
        }
    }

    function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        map.setView([latitude, longitude], 10);
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
