# 地圖類型

## 地圖類型

### 基本地圖類型

Google Maps JavaScript API 提供四個地圖類型。除了一般熟知的「繪製」道路地圖方塊之外，Maps JavaScript API 也支援其他地圖類型。

Maps JavaScript API 中提供下列地圖類型：

&emsp;●&nbsp;roadmap 可顯示預設道路地圖檢視。此為預設的地圖類型。

&emsp;●&nbsp;satellite 可顯示 Google 地球衛星影像

&emsp;●&nbsp;hybrid 可顯示混合的一般檢視與衛星檢視

&emsp;●&nbsp;hybrid 可根據地形資訊顯示實體地圖

設定 Map 的 mapTypeId 屬性即可修改地圖類型，方法是在建構函式內設定它的 Map options 物件，或呼叫地圖的 setMapTypeId() 方法。mapTypeID 屬性預設為 roadmap。

在建構時設定 mapTypeId：

```js
var myLatlng = new google.maps.LatLng(-34.397, 150.644);
var mapOptions = {
  zoom: 8,
  center: myLatlng,
  mapTypeId: 'satellite'
};
var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
```

動態修改mapTypeId:
```js
map.setMapTypeId('terrain');
```

在 Map 物件上呼叫 setTilt(0) 即可停用 45° 影像。如果要為支援的地圖類型啟用 45° 影像，請呼叫 setTilt(45)。

下列範例顯示奧勒岡州波特蘭市中心的 45° 檢視：

```js
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.964, lng: -122.015},
    zoom: 18,
    mapTypeId: 'satellite'
  });
  map.setTilt(45);
}
```
### 啟用和停用 45° 影像


&emsp;&emsp;

&nbsp;
