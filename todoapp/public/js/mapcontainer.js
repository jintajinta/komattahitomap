function init() {
    var map = L.map('mapcontainer');
    map.setView([35.4, 136], 5);
    L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
}