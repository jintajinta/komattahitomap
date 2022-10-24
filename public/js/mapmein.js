let latitude
let longitude
var GSI = {};
function init() {
    let position_data = document.getElementById("position").value;
    let position=JSON.parse(position_data);
    var map = L.map('map');
    map.setView([36.00, 137], 10);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let pingcontents=""
    for(i=0;i<=position.length-1;i++){
        pingcontents="場所:"+position[i].contents+"<br><input type = \"button\" value = \"削除\" onClick = \"deletepositon("+position[i].id+")\">"
        L.marker([position[i].lat, position[i].lng]).addTo(map).bindPopup(pingcontents).openPopup();
    }

    async function successCallback(position) {
        // 緯度を取得し画面に表示
        latitude = position.coords.latitude;
        document.getElementById("latitude").innerHTML = latitude;
        // 経度を取得し画面に表示
        longitude = position.coords.longitude;
        document.getElementById("longitude").innerHTML = longitude;
        document.getElementById("mylat").value = latitude;
        document.getElementById("mylng").value = longitude;
        map.setView([latitude, longitude], 10);
        L.marker([latitude, longitude]).addTo(map).bindPopup("現在地").openPopup();
        const url = new URL('https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress');
        url.searchParams.set('lat', position.coords.latitude);
        url.searchParams.set('lon', position.coords.longitude);
        const res = await fetch(url.toString());
        const json = await res.json();
        const data = json.results;
        const muniData = GSI.MUNI_ARRAY[json.results.muniCd];
        const [prefCode, pref, muniCode, city] = muniData.split(',');
        console.log(json)
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

