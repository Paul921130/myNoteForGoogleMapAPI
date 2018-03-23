# 地圖類型

## 地圖類型

### 基本地圖類型

Google Maps JavaScript API 提供四個地圖類型。除了一般熟知的「繪製」道路地圖方塊之外，Maps JavaScript API 也支援其他地圖類型。

Maps JavaScript API 中提供下列地圖類型：

* roadmap 可顯示預設道路地圖檢視。此為預設的地圖類型。

* satellite 可顯示 Google 地球衛星影像

* hybrid 可顯示混合的一般檢視與衛星檢視

* hybrid 可根據地形資訊顯示實體地圖

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

## 樣式化地圖

StyledMapType可自訂標準Google基本地圖的呈現方式，請參閱樣[樣式化地圖](https://developers.google.com/maps/documentation/javascript/styling?hl=zh-tw)指南。

### 範例
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Styled Maps - Night Mode</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.674, lng: -73.945},
          zoom: 12,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
  </body>
</html>
```

如需 featureType、elementType 與 stylers 所有可用值的清單，請參閱 [JSON 樣式](https://developers.google.com/maps/documentation/javascript/style-reference?hl=zh-tw)參考資料。

## 設定標準地圖類型樣式或建立自己的地圖類型

可透過兩種方式將樣式套用到地圖：

* 設定地圖MapOptions物件的.style屬性。此方法會變更標準地圖類型的樣式。地形與衛星空照圖中的基本影像不會被影響，但是道路、標籤與其他地圖原件則會遵守樣式規則。

* 建立StyledMapType並將它套用到地圖。這會建立新的地圖類型，使用者可以從地圖類型控制項中選取它。

這兩種方法都接受[MapTypeStyle](https://developers.google.com/maps/documentation/javascript/reference/3.exp/?hl=zh-tw#MapTypeStyle)物件陣列,并都包含「選取工具」與「樣式工具」。

## 樣式語法

樣式化地圖使用兩種概念將色彩與其他樣式變更套用到地圖：

* 【選取工具】用來指定可在地圖上設定樣式的地理元件。這些元素包括道路、公園、水域和其他，以及它們的標籤。選取工具包含【功能】與【元素】，分別以featureType和elementType屬性指定。
* 【樣式工具】是可套用到地圖元素的色彩與能見度屬性。它們透過色調、色彩與光度/色差補正值的組合來定義顯示色彩。

如果要設定地圖的樣式，可將選取工具與樣式工具組合成一個樣式陣列，然後將它傳遞到預設地圖的[MapOptions](https://developers.google.com/maps/documentation/javascript/reference/3.exp/?hl=zh-tw#MapOptions)物件或[StyledMapType](https://developers.google.com/maps/documentation/javascript/reference/3.exp/?hl=zh-tw#StyledMapType)建構函式。陣列接受下列格式：
```js
var stylesArray = [
  {
    featureType: '',
    elementType: '',
    stylers: [
      {color: ''},
      {visibility: ''},
      // Add any stylers you need.
    ]
  },
  {
    featureType: '',
    // Add the stylers you need.
  }
]
```
如需featureType、elementType與stylers所有可用值的清單，可參閱[JSON 樣式參考資料](https://developers.google.com/maps/documentation/javascript/style-reference?hl=zh-tw)。

## 變更預設地圖樣式

要修改預設地圖；類型的樣式，可在建構時設定地圖MapOptions中的樣式陣列，或是呼叫Map.setOptions。對標籤與道路所做的變更會影響到所有地圖類型（地形、衛星圖與混合地圖以及預設道路圖類型）。

## 建立樣式化地圖類型

您可以加入新的地圖類型以套用樣式，方式是建立[StyledMapType](https://developers.google.com/maps/documentation/javascript/reference/3.exp/?hl=zh-tw#StyledMapType)并傳遞選取工具和樣式工具資訊到建構函式。這個方法不會影響到預設地圖類型的樣式。

在下列的範例中，可以透過地圖左上角的【Styled Map】按鈕將地圖切換成新地圖類型，以下是程式碼：
```js
<!DOCTYPE html>
<html>
  <head>
    <title>Styled Map Types</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {

        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Styled Map'});

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.647, lng: 37.581},
          zoom: 11,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```

使用[Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/)作為產生JSON樣式物件的快速方式。




以上資料來自[Google Maps API](https://developers.google.com/maps/documentation/javascript/maptypes?hl=zh-tw)。

&emsp;&emsp;

&nbsp;
