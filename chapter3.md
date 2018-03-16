# 將資料匯入到地圖

### 自己試試看

## 概要
&emsp;&emsp;了解如何從本地或遠端來源匯入 [GeoJSON](https://developers.google.com/maps/documentation/javascript/importing_data?hl=zh-tw#data) 資料，並在地圖上顯示它。 此教學課程使用下面的地圖來說明將資料匯入到地圖的各種技術。

## 自己試試看
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

## 載入資料

### 從相同的網域載入資料
[Google 地圖資料圖層](https://developers.google.com/maps/documentation/javascript/datalayer?hl=zh-tw)提供容納任意地理空間資料的容器（包括 GeoJSON）。 如果您的資料位於裝載在和 Maps JavaScript API 應用程式相同網域上的檔案中，您可以使用 map.data.loadGeoJson() 方法載入它。 該檔案必須位於相同的網域上，但您可以將它代管在不同的子網域中。
例如:
```javascript
map.data.loadGeoJson('data.json');
```

### 跨網域載入資料
也可以從其他不屬於您的網域要求資料，前提是該網域的設定允許此類要求。 此權限的標準稱為[跨原始來源資源共用 (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)。
如果網域允許跨網域要求，在標頭應該包含下列宣告:
```js
Access-Control-Allow-Origin: *
```
並使用[Chrome開發人員工具(DevTools)](https://developer.chrome.com/devtools#console)(就是Crome的F12中的Network)來了解網域是否已啟用CORS。
從此網域載入資料的方式，與從相同網域載入JSON相同:
```js
map.data.loadGeoJson('http://www.CORS-ENABLED-SITE.com/data.json');
```

&emsp;&emsp;

&nbsp;
