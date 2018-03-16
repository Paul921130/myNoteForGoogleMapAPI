# 新增含標記的 Google 地圖到您的網站

## 簡介

## 自己試試看

```html
<!DOCTYPE html>
	<html>
	  <head>
	    <style>
	       #map {
	        height: 400px;
	        width: 100%;
	       }
	    </style>
	  </head>
	  <body>
	    <h3>My Google Maps Demo</h3>
	    <div id="map"></div>
	    <script>
	      function initMap() {
	        var uluru = {lat: -25.363, lng: 131.044};
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 4,
	          center: uluru
	        });
	        var marker = new google.maps.Marker({
	          position: uluru,
	          map: map
	        });
	      }
	    </script>
	    <script async defer
	    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
	    </script>
	  </body>
	</html>

```

## 新增含標記的地圖
如何將 Google Maps JavaScript API 載入到您的網頁，以及如何撰寫自己的 Javascript 以使用 API 在其上新增含標記的地圖。
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #map {
        height: 400px;
        width: 100%;
       }
    </style>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <div id="map"></div>
    <script>
      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```


```html

```


```css

```

```javascript

```