# 地圖事件

### 使用者界面事件

瀏覽器中的JavaScript是「受到事件驅動」，表示會產生各種事件來回應各種互動，事件類型分為兩種：

* 使用者類型是從DOM傳播到Google Maps JavaScript API。這些事件是獨立的事件，且與標準DOM事件不同。
* MVC狀態變更通知會反映出Maps JavaScript API物件中的變更，并使用```property_changed```慣例命名。

當透過在物件上呼叫```addListener()```註冊事件處理常式受到那些事件時，對某些事件有興趣的程式會為那些事件註冊JavaScript事件接聽程式并執行程式碼：

如果需要完整的事件清單，可查閱[Google Maps JavaScript API參考資料](https://developers.google.com/maps/documentation/javascript/reference?hl=zh-tw)。

UI事件

Google Maps JavaScript API 內某些物件是專門設計來回應使用者事件的（例如滑鼠或鍵盤事件）。例如，以下是```google.map.Marker```物件可以接聽一些使用者事件：

* ```'click'```

* ```'dblclick'```

* ```'mouseup'```

* ```'mousedown'```

* ```'mouseover'```

* ```'mouseout'```

如需完整的清單，可參閱[Marker](https://developers.google.com/maps/documentation/javascript/reference?hl=zh-tw#Marker)類別。

### MVC狀態變更

MVC物件通常包含狀態，每當物件的屬性變更時，Google Maps JavaScript API 都會引發屬性已變更的事件。可以透過呼叫addListener()在物件上註冊處理常式，以攔截這些狀態變更。

MVC事件不會在其事件內傳遞引數，需要在該物件上呼叫適當的```getProperty```方法，檢查MVC狀態變更時的變更的屬性。

### 處理事件

如果要註冊事件通知，請使用addListener()事件處理常式，此方法接受要接聽的事件，以及當事件發生時要執行的函式。

### 範例：地圖和標記事件

下列程式碼混合使用者事件和狀態變更事件。我們將一個事件處理常式附加到標記，當此標記被點選時，此事件處理常式會縮放地圖。我們也將事件處理常式加入 center 屬性已變更的地圖，然後在收到 center_changed 事件之後的 3 秒鐘將地圖平移回到標記：

```js
function initMap() {
  var myLatlng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom'
  });

  map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener('click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}
```

秘訣：如果您嘗試偵測檢視點的變更，請務必使用特定的 ```bounds_changed``` 事件而不是組合 ```zoom_changed``` 和 ```center_changed``` 事件。因為 Maps JavaScript API 會分別引發後面的兩個事件，所以 ```getBounds()``` 可能要到檢視點已確定變更之後才會回報有用的結果。如果您要在這類事件之後執行```getBounds()```，請務必改為接聽 ```bounds_changed``` 事件。

### 範例：形狀編輯和拖曳事件

編輯或拖曳形狀時，會在動作完成時引發一個事件。如需事件清單和部分程式碼片段，請參閱[形狀](https://developers.google.com/maps/documentation/javascript/shapes?hl=zh-tw#editable_events)。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Rectangle Events</title>
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
      // This example adds a user-editable rectangle to the map.
      // When the user changes the bounds of the rectangle,
      // an info window pops up displaying the new bounds.

      var rectangle;
      var map;
      var infoWindow;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 44.5452, lng: -78.5389},
          zoom: 9
        });

        var bounds = {
          north: 44.599,
          south: 44.490,
          east: -78.443,
          west: -78.649
        };

        // Define the rectangle and set its editable property to true.
        rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: true,
          draggable: true
        });

        rectangle.setMap(map);

        // Add an event listener on the rectangle.
        rectangle.addListener('bounds_changed', showNewRect);

        // Define an info window on the map.
        infoWindow = new google.maps.InfoWindow();
      }
      // Show the new coordinates for the rectangle in an info window.

      /** @this {google.maps.Rectangle} */
      function showNewRect(event) {
        var ne = rectangle.getBounds().getNorthEast();
        var sw = rectangle.getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```

### 存取UI事件中的引數

Google Maps JavaScript API內的UI事件通常會傳遞可由事件接聽程式存取的事件引數，標示事件發生時的UI狀態。像是UI'click'事件通常會傳遞一個包含```latLng```屬性的```MouseEvent```，標示地圖上點選的位置。請注意，這種行為是UI事件獨有;MVC狀態變更不會在其事件中傳遞引數。

可以在事件接聽程式內存取事件的引數，方式就和存取吳建德屬性相同。以下範例就是為地圖新增一個事件接聽程式，當使用者按一下地圖時在點選位置建立一個標記（Marker）。

```js
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363882, lng: 131.044922 }
  });

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}
```

## 在事件接聽程式中使用Closure

執行事件接聽程式時，對物件同時附加私人和永久的資料通常會很有幫助。JavaScript 不支援「私人」的實例資料，但是支援 Closure (可讓內部函式存取外部的變數)。Closure 在事件接聽程式內很好用，可在事件發生時存取一般不會附加到物件的變數。

下列範例在事件接聽程式中使用函式 Closure，對一組標記指派一個祕密訊息。按一下每個標記會顯示一部分的秘密訊息，但這個訊息並未包含在標記本身當中。

```js
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363882, lng: 131.044922 }
  });

  var bounds = {
    north: -25.363882,
    south: -31.203405,
    east: 131.044922,
    west: 125.244141
  };

  // Display the area between the location southWest and northEast.
  map.fitBounds(bounds);

  // Add 5 markers to map at random locations.
  // For each of these markers, give them a title with their index, and when
  // they are clicked they should open an infowindow with text from a secret
  // message.
  var secretMessages = ['This', 'is', 'the', 'secret', 'message'];
  var lngSpan = bounds.east - bounds.west;
  var latSpan = bounds.north - bounds.south;
  for (var i = 0; i < secretMessages.length; ++i) {
    var marker = new google.maps.Marker({
      position: {
        lat: bounds.south + latSpan * Math.random(),
        lng: bounds.west + lngSpan * Math.random()
      },
      map: map
    });
    attachSecretMessage(marker, secretMessages[i]);
  }
}

// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}
```

### 取得和設定事件處理常式內的屬性

Google Maps JavaScript API 事件系統中的 MVC 狀態變更事件，不會在事件觸發時傳遞引數。（使用者事件則會傳遞可檢查的引數）。如果您需要檢查 MVC 狀態變更時的屬性，必須在該物件上明確呼叫適當的 getProperty() 方法。這個檢查只會擷取到 MVC 物件的「目前狀態」，但這不一定會是事件第一次引發時的狀態。

在下列範例中，我們設定事件處理常式，帶出一個顯示程度的資訊視窗來回應縮放事件。

```
function initMap() {
  var originalMapCenter = new google.maps.LatLng(-25.363882, 131.044922);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: originalMapCenter
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'Change the zoom level',
    position: originalMapCenter
  });
  infowindow.open(map);

  map.addListener('zoom_changed', function() {
    infowindow.setContent('Zoom: ' + map.getZoom());
  });
}
```

### 接聽 DOM 事件

Google Maps JavaScript API 事件模型會建立和管理自己的自訂事件。然而，瀏覽器內的 DOM（文件物件模型）也會根據使用中的特定瀏覽器事件模型，建立和分派自己的事件。如果您要擷取和回應這些事件，Maps JavaScript API 提供 addDomListener() 靜態方法來接聽和繫結至 DOM 事件。

用法如下：

```
addDomListener(instance:Object, eventName:string, handler:Function)
```

其中```instance```可以是瀏覽器支援的任一種 DOM 元素，包括：

* DOM 的階層式成員，例如 ```window``` 或 ```document.body.myform```
* 具名元素，例如 ```document.getElementById("foo")```

window.onload 事件，這是我們已經在 < body > 標記內處理的事件。我們使用這個事件，在 HTML 頁面完全載入時觸發初始的 JavaScript 程式碼，如下所示：

```
<script>
  function initialize() {

    // Map initialization

  }
</script>
<body onload="initialize()">
  <div id="map"></div>
</body>
```

雖然這個事件是附加到此處的 < body > 元素，但是這個事件其實是一個 window 事件，表示 window 元素下方的 DOM 階層已經完全建立和轉譯。

雖然很容易理解，但是在 < body > 標記內放入 onload 事件會讓內容和行為混合在一起。一般而言，將內容程式碼 (HTML) 和行為程式碼 (JavaScript) 分開，也同時分開提供呈現程式碼 (CSS) 是比較好的作法。您可以在 Maps JavaScript API 程式碼內，將內嵌的 onload 事件處理常式取代為 DOM 接聽程式來進行，例如：

```
<script>
  function initialize() {

    // Map initialization

  }

  google.maps.event.addDomListener(window, 'load', initialize);
</script>
<body>
  <div id="map"></div>
</body>
```

雖然上面的程式碼是 Maps JavaScript API 程式碼，但是 addDomListener() 方法會繫結至瀏覽器的 window 物件，讓 API 可與 API 標準網域外的物件通訊。

## 移除事件接聽程序

如果要移除特定事件接聽程式，必須已對該接聽程式指派變數。然後您就能呼叫 ```removeListener()```，傳遞已指派接聽程式的變數名稱。

```
var listener1 = marker.addListener('click', aFunction);

google.maps.event.removeListener(listener1);
```

如果要從特定實例移除所有接聽程式，請呼叫 clearInstanceListeners()，傳遞實例名稱。

```
var listener1 = marker.addListener('click', aFunction);
var listener2 = marker.addListener('mouseover', bFunction);

// Remove listener1 and listener2 from marker instance.
google.maps.event.clearInstanceListeners(marker);
```

如果要移除特定實例特定事件類型的所有接聽程式，請呼叫 clearListeners()，傳遞實例名稱和事件名稱。

```
marker.addListener('click', aFunction);
marker.addListener('click', bFunction);
marker.addListener('click', cFunction);

// Remove all click listeners from marker instance.
google.maps.event.clearListeners(marker, 'click');
```

詳細資訊可參閱[google.maps.event 命名空間](https://developers.google.com/maps/documentation/javascript/reference?csw=1&hl=zh-tw#event)的參考文件。

### 接聽驗證錯誤

如果要以程式設計方式偵測驗證失敗（例如，若要自動傳送指標），您可以準備回呼函式。如果已定義下列全域函式，驗證失敗時會呼叫此函式。

```
function gm_authFailure() { /* Code */ };
```

以上資料來自[自訂 Google 地圖：自訂圖例](https://developers.google.com/maps/documentation/javascript/adding-a-legend?hl=zh-tw)。

&emsp;&emsp;

&nbsp;
