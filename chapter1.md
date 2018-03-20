# 新增含標記的 Google 地圖到您的網站

## 簡介

### 自己試試看

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
<script>
async defer
src ="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
</script>
```
script 會從指定的網址載入 API。 當 API 完全載入之後，callback 參數會執行 initMap 函式。 載入 API 時，async 屬性可讓瀏覽器繼續轉譯網頁的剩餘部分。key 參數包含您的 API 金鑰。 在 JSFiddle 中實驗此教學課程時，您不需要自己的 API 金鑰。 請參閱步驟 3：取得 API 金鑰以取得有關如何在稍後取得 API 金鑰的操作說明。

```html
<script>
  function initMap() {
  }
</script>
```
initMap 函式會在網頁載入時初始化並新增地圖。 使用 script 標記包含您自己的 JavaScript （其中包含 initMap 函式）。

```javascript
getElementById
```
新增此函式以在網頁上尋找地圖 div。

```javascript
{
  var uluru = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

}
```
新增屬性（包括中心與縮放層級）到地圖。 請參閱 其他屬性選項的文件。 
center 屬性會告知 API 要在哪裡放置地圖中心。 地圖座標是以下列順序設定：緯度、經度。 
zoom 屬性指定地圖的縮放層級。 
縮放：0 是最低的縮放，而且會顯示整個地球。設定較高的縮放值可以較高的解析度放大地球。

```javascript
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
```
新增此程式碼以在地圖上放置標記。 position 屬性可設定標記的位置。

以上資料來自[新增含標記的Google](https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=zh-tw)。



