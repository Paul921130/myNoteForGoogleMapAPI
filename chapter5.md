# 標記(Marker)

## 簡介
標記能識別地圖上的位置，同時也可以自訂影像(圖示)，兩者皆屬Marker類型的物件如果要設定自訂圖示，您可以在標記的建構函式內設定，或是藉由在標記上呼叫 setIcon()。

標記是以提供互動性為前提而設計的。例如，標記預設能接收 'click' 事件，讓您可以新增事件接聽程式，以帶出能顯示自訂資訊的資訊視窗。將標記的 draggable 屬性設定成 true，即可讓使用者移動地圖上的標記

## 新增標記

google.maps.Marker 建構函式使用單一 Marker options 物件常值，用來指定標記的初始屬性。
下列欄位特別重要，並時常會在建構標記時設定：(如Map的center)

&emsp;●&nbsp;position （必要）指定識別標記初始位置的 LatLng。擷取 LatLng 的一種方法是使用地理編碼服務。

&emsp;●&nbsp;map（選擇性）指定放置標記的Map。如果您沒有在建構標記時指定地圖，系統還是會建立標記，但是該標記將不會附加到地圖（或是在地圖上顯示）。您可以透過呼叫標記的 setMap() 方法來於稍後新增標記。

下列範例會將一個簡單的標記新增到位於澳洲中央烏盧魯的地圖：
```js
function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
```

在上面的範例中，建構標記時可以透過標記選項中的 map 屬性，將標記放置在地圖上。或者，您可以使用標記的 setMap() 方法直接將標記新增到地圖，如下列範例中所示：

```js
var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
var mapOptions = {
  zoom: 4,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);
```
標記的title會顯示為工具提示。

如果您不想在標記的建構函式中傳遞任何 Marker options，請在建構函式的最後一個引數中傳遞一個空的物件 {}。

## 移除標記

如果要從地圖上移除標記，請呼叫setMap()方法，並傳遞null作為引數。

```js
marker.setMap(null);
```
但實際上這種方法並不會刪除標記。它只會從地圖移除標記。如果您想要刪除標記，便應該先從地圖移除它，然後將標記自身設為 null。

如果你想要管理一組標記，則應該建立一個陣列來容納那些標記。透過這個陣列，您可以在需要移除標記時，於陣列中的該標記上呼叫 setMap()。從地圖移除標記，然後將陣列的 length 設成 0 來移除對標記的所有參照，即可刪除標記。

## 建立動畫標記

建立動畫標記來使它們在各種不同的情況下展現動態的動作。如果要指定標記的動畫方式，請使用標記的 animation 屬性，它屬於 google.maps.Animation 類型。
以下是支援的 Animation 值：

&emsp;●&nbsp;DROP 指出標記在一開始放置於地圖上時，要從地圖的上方掉落到最終位置。標記停止時，動畫也會停止，animation 會回復到 null。這個動畫類型通常是在建立 Marker 時指定。

&emsp;●&nbsp;BOUNCE 指出標記在原地彈跳。彈跳標記會持續彈跳，直到它的 animation 屬性明確設成 null 才會停止。
在 Marker 物件上呼叫 setAnimation()，可在現有標記上初始化一個動畫。

```js
// The following example creates a marker in Stockholm, Sweden using a DROP
// animation. Clicking on the marker will toggle the animation between a BOUNCE
// animation and no animation.

var marker;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 59.325, lng: 18.070}
  });

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 59.327, lng: 18.067}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
```

如果您有許多標記，則可能不希望它們一次全部落在地圖上。您可以使用 setTimeout()，透過下面所示的模式來建立標記動畫的間隔：
```js
function drop() {
  for (var i =0; i < markerArray.length; i++) {
    setTimeout(function() {
      addMarkerMethod();
    }, i * 200);
  }
}
```

## 自訂標記影像

如果您要在標記上顯示單一字母或數字，您可以使用標記標籤。如果需要更大的自訂空間，您可以定義顯示圖示而不是顯示預設的標記影像。定義圖示將牽涉到設定一些可以決定標記視覺行為的屬性。

下面各節將說明標記標籤、簡單圖示、複雜圖示及符號（向量圖示）。

### 標記標籤

標記標籤是顯示在標記內的字母或數字。此節中的標記影像顯示其上有字母 'B' 的標記標籤。您可以將標記標籤指定為字串，或指定為包含字串及其他標籤屬性的 MarkerLabel 物件。

建立標記時，您可以在 MarkerOptions 物件中指定 label 屬性。或者，您可以在 Marker 物件上呼叫 setLabel()，來在現有標記上設定標籤。

下列範例會在使用者在地圖上按一下時顯示具有標籤的標記：

```js
// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize() {
  var bangalore = { lat: 12.97, lng: 77.59 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: bangalore
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
```

### 簡單圖示

在大部分的基本情況中，圖示可以單純指示用來取代預設「Google 地圖」大頭針圖示的影像。如果要指定這種圖示，請將標記的 icon 屬性設成該影像的 URL。Google Maps JavaScript API 將自動調整圖示的大小。

```js
// This example adds a marker to indicate the position of Bondi Beach in Sydney,
// Australia.
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -33, lng: 151}
  });

  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var beachMarker = new google.maps.Marker({
    position: {lat: -33.890, lng: 151.274},
    map: map,
    icon: image
  });
}
```

### 複雜圖示

您可能想要指定複雜的形狀來指示可點選地區，以及指定圖示相對於其他疊加層（它們的「堆疊順序」）的顯示方式。如果要以這種方式指定圖示，應該將該圖示的 icon 屬性設成 Icon 類型的物件。

Icon 物件可定義影像。它們也定義圖示的 size、origin （例如，如果您想要的影像屬於較大影像的一部分），以及應該放置圖示熱點的 anchor （根據原點來決定）。

如果您的自訂標記使用 label，則可以使用 Icon 物件中的 labelOrigin 屬性來指定標籤的位置。

```js
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3]
    });
  }
}
```

### 將 MarkerImage 物件轉換為 Icon 類型

在 Google Maps JavaScript API 版本 3.10 之前，複雜圖示都是定義為 MarkerImage 物件。Icon 物件常值於版本 3.10 新增，並從版本 3.11 開始取代 MarkerImage。Icon 物件常值支援與 MarkerImage 相同的參數，以便您透過移除建構函式，將之前的參數包覆在{}內，然後新增每個參數的名稱，來輕鬆地將 MarkerImage 轉換為 Icon。例如：

```js
var image = new google.maps.MarkerImage(
    place.icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));
```

變成

```js
var image = {
  url: place.icon,
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(17, 34),
  scaledSize: new google.maps.Size(25, 25)
};
```

### 符號

標記除了支援光柵影像之外，也支援顯示稱為 Symbols 的向量路徑。如果要顯示向量路徑，請傳遞一個 Symbol 物件常值，其中包含前往標記 icon 屬性的所需路徑。您可以使用 google.maps.SymbolPath 的其中一個預先定義路徑，或使用 SVG 路徑標記法定義自訂路徑。

如需詳細資訊，請參閱[符號文件](https://developers.google.com/maps/documentation/javascript/symbols?hl=zh-tw)。

## 建立可拖曳的標記

為了讓使用者能夠將標記拖曳到地圖上的其他位置，請在標記選項中將 draggable 設成 true。

```js
var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
var mapOptions = {
  zoom: 4,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// Place a draggable marker on the map
var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable:true,
    title:"Drag me!"
});
```

以上資料來自[Google Maps API：標記](https://developers.google.com/maps/documentation/javascript/markers?hl=zh-tw)。

&emsp;&emsp;

&nbsp;
