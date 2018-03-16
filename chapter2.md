# 標記群集

### 自己試試看
```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Marker Clustering</title>
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

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: -28.024, lng: 140.887}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }
      var locations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]
    </script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```
## 了解標記群集

&emsp;&emsp;MarkerClusterer 程式庫使用以格線為基礎的群集技術，將地圖劃分成特定大小的方塊（大小會隨著每個縮放層級變更），然後將標記群組到每個方塊格線內。它會在一個特定標記上建立群集，然後將處於邊界內的標記新增到群集。這個程序會一直重複，直到所有標記都照地圖的縮放層級，分配到最靠近的以格線為基礎的標記群集。

&emsp;&emsp;如果標記位於一個以上現有群集的邊界內，Maps JavaScript API 會判斷標記與每個群集之間的距離，然後將它新增到最靠近的群集。

&emsp;&emsp;可以設定 MarkerClusterer 選項來調整群集位置，以反映群集內包含的所有標記之間的平均距離。您也可以自訂 MarkerClusterer 來修改其他參數，如格線大小、群集圖示、群集文字等等。

## 新增標記群集

依照下面的步驟執行以新增標記群集：

1.從 GitHub 取得標記群集程式庫與影像，並將它們儲存在應用程式可以存取的伺服器上。適用於 MarkerClusterer 的 JavaScript 程式庫與影像檔可在 GitHub 的 Google 地圖存放區中取得。將下列檔案從 GitHub 下載或複製到應用程式可以存取的位置：
<br>
  <span style="width: 10px;height: 10px;background: black;border-radius: 50%;"></span>[markerclusterer.js](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/src/markerclusterer.js)
<br>
  [m1.png](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m1.png)
<br>
  [m2.png](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m2.png)
<br>
  [m3.png](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m3.png)
<br>
  [m4.png](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m4.png)
<br>
  [m5.png](https://github.com/googlemaps/js-marker-clusterer/blob/gh-pages/images/m5.png)
&emsp;&emsp;

```html

```


```css

```

```javascript

```