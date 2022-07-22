let latitude
let longitude
function init() {
    let task_data = document.getElementById("tasks").value;
    console.log(task_data);
    let task=JSON.parse(task_data);
    var map = L.map('map');
    map.setView([36.00, 137], 10);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let pingcontents=""
    for(i=0;i<=position.length-1;i++){
        pingcontents="場所:"+task[i].contents+"<br><input type = \"button\" value = \"削除\" onClick = \"deletepositon("+position[i].id+")\">"
        L.marker([task[i].lat, task[i].lng]).addTo(map).bindPopup(pingcontents).openPopup();
    }

    function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        document.getElementById("mylat").value = latitude;
        document.getElementById("mylng").value = longitude;
        map.setView([latitude, longitude], 10);
        L.marker([latitude, longitude]).addTo(map).bindPopup("現在地").openPopup();
    };
    // 取得に失敗した場合の処理
    function errorCallback(error) {
        console.log(error)
        alert("位置情報が取得できませんでした");
    };
}

function deletepositon(id) {
    document.getElementById("pingid").value = id;
    document.deleteform.submit();
}
