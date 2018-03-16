# 將資料視覺化:地震繪測

## 匯入資料
此教學課程使用來自美國地質調查局 (USGS) 的[即時地震資料](https://earthquake.usgs.gov/earthquakes/feed/)。 USGS 網站以數種格式提供它們的資料，您能夠將資料複製到您的網域，讓您的應用程式可以進行本地存取。 此教學課程會透過將 script 標記附加到文件開頭，直接從 USGS 伺服器要求 JSONP。
複製方法如下:
```js
// Create a script tag and set the USGS URL as the source.
        var script = document.createElement('script');

        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
```


## 放入基本標記
```html
<!DOCTYPE html>
<html>
  <head>
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
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```

## 使用圖形與熱度圖來自訂地圖
自訂地震位置上的標記，來將其資料視覺化，例如發生最多次地震的位置，以及其級數或深度。

可以自訂如下選項:

&emsp;●&nbsp;使用[圓形大小](https://developers.google.com/maps/documentation/javascript/earthquakes?hl=zh-tw#circle_size):

&emsp;&emsp;使用[符號](https://developers.google.com/maps/documentation/javascript/symbols?hl=zh-tw)來繪製大小與地震級數相關的圓形（或任何其他圖形）。

&emsp;●&nbsp;使用[熱度圖](https://developers.google.com/maps/documentation/javascript/earthquakes?hl=zh-tw#heatmaps):

&emsp;&emsp;視覺化程式庫中的「熱度圖圖層」提供一個簡單卻有效顯示地震分佈的方式。 熱度圖使用色彩來代表點的密度，這樣可以更輕鬆地找出高度活躍區域。

## 圓形大小
```html
<!DOCTYPE html>
<html>
  <head>
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
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat: -33.865427, lng: 151.196123},
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        });
      }

      function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
      }

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```
*****
### 了解程式碼

```js
map.data.setStyle(function(feature) {
    var magnitude = feature.getProperty('mag');
    return {
      icon: getCircle(magnitude)
    };
  });
```
新增樣式至呼叫 getCircle() 函式的「資料圖層」。建立點的自訂影像，而非預設的紅色 marker.cd

```js
function getCircle(magnitude) {
      var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: magnitude
      };
      return circle;
    }
```
地震的 magnitude 屬性會傳遞到此函式。getCircle() 會繪製一個大小由級數值定義的圓形，並將該圓形傳回以做為地震的自訂標記來使用。

## 熱度圖
```html
<!DOCTYPE html>
<html>
  <head>
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
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat: -33.865427, lng: 151.196123},
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);

      }

      function eqfeed_callback(results) {
        var heatmapData = [];
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          heatmapData.push(latLng);
        }
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: false,
          map: map
        });
      }
    </script>
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization&callback=initMap">
    </script>
  </body>
</html>
```
**********
### 了解程式碼
```js
<script async defer
  src="https://maps.googleapis.com/maps/api/js?key
=YOUR_API_KEY&libraries=visualization&callback=initMap">
</script>
```
visualization 程式庫用來顯示熱度圖。它包含 HeatmapLayer 類別。當使用程式庫時，必須在呼叫 Maps API JavaScript 時將其載入。
```js
function eqfeed_callback(results) {
    var heatmapData = [];
    for (var i = 0; i &lt; results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      heatmapData.push(latLng);
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: map
    });
  }
```
如同先前的範例，USGS 資料會傳遞至 eqfeed_callback函式。這會新增每個地震的座標至 heatmapData 陣列。然後，該陣列會傳遞至 HeatmapLayer建構函式，建構函式建立熱度圖並在地圖上顯示它。

```js
function eqfeed_callback(results) {
    var heatmapData = [];
    for (var i = 0; i &lt; results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var magnitude = results.features[i].properties.mag;
      var weightedLoc = {
        location: latLng,
        weight: Math.pow(2, magnitude)
      };
      heatmapData.push(weightedLoc);
    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: map
    });
  }
```
若要依照級數將結果加權，您可以改為將 [WeightedLocation](https://developers.google.com/maps/documentation/javascript/reference?hl=zh-tw#WeightedLocation) 物件傳遞至 heatmapData 陣列。

&emsp;&emsp;

&nbsp;
