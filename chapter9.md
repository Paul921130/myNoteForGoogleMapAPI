# 樣式參考資料

## 範例

下列JSON樣式宣告會將所有地圖特征轉變成灰色，然後將主幹道的幾何形狀塗成藍色，并完全隱藏景色標籤：

```
[
  {
    "featureType": "all",
    "stylers": [
      { "color": "#C0C0C0" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#CCFFFF" }
    ]
  },{
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
]
```

## JSON物件

JSON樣式宣告包含下列元素：

* featureType（選擇性）要針對此樣式修稿選取的特征。特征是地圖的地理特性，包括道路、公園、水域等等。如果未指定特征，則會選取全部。

* elementType（選擇性）要選取的指定特征的屬性。元素是特征的子部分，包括標籤和幾何形狀。如果不指定元素，則會選取該特征的全部元素。

* stylers 要套用到所選特征與元素的規則。樣式工具指的是特征的色彩、能見度和粗細。您可將一個或多個樣式工具套用到特征。

若要指定樣式，必須將一組```featureType```和```elementType```選取工具與您的```stylers```結合成一個樣式陣列，可在單一陣列中將任何特征組合當做目標。不過一次可套用的樣式數量是有限的，一旦樣式陣列超過字元數目上線，則不會套用任何樣式。

##featureType

下列JSON程式碼片段會選取地圖上的全部道路：

```
{
  "featureType": "road"
}
```

特征會形成一個類別樹狀結構，根類別則是all。如果未指定特征，則會選取全部特征，指定```all```的特征，效果相同。

有些特征包含使用點標記法指定的子特征。例如，```landscape.natural```或```road.local```。如果只指定父項特征，例如```road```，則針對父項所指定的樣式會套用到其全部子項，例如```road.local```和```road.highway```。

請注意，父項特征可能包含某些元素，不一定是其全部子特征都有包含的。

```featureType``` 提供下列功能：

* ```all```（預設）會選取所有特征。

* ```administrative``` 會選取所有行政區域。樣式僅影響行政區域的標籤，不影響地理邊界或填滿。
  
  * ```administrative.country``` 會選取國家。
  
  * ```administrative.land_parcel``` 會選取土地區分。
  
  * ```administrative.locality``` 會選取地區。
  
  * ```administrative.neighborhood``` 會選取臨近地區。
  
  * ```administrative.province``` 會選取省份。

* ```landscape``` 會選取全部景色。
  
  * ```landscape.man_made``` 會選取人類建造的建築物。
  
  * ```landscape.natural``` 會選取自然特征。
  
  * ```landscape.natural.landcover``` 會選取土地覆蓋特征。
  
  * ```landscape.natural.terrain``` 會選取地形特征。

* ```poi``` 會選取所有搜尋點。
  
  * ```poi.attraction``` 會選取觀光景點。
  
  * ```poi.business``` 會選取商家。
  
  * ```poi.government``` 會選取政府大樓。
  
  * ```poi.medical``` 
  會選取緊急服務設施，包括醫院、藥房、警察、醫師等等。
  
  * ```poi.park``` 會選取公園。
  
  * ```poi.place_of_worship``` 會選取禮拜場所，包括教堂、廟宇、清真寺等等。
  
  * ```poi.school``` 會選取學校。
  
  * ```poi.sports_complex``` 會選取體育館。

* ```road``` 會選取所有道路。
  
  * ```road.arterial``` 會選取主幹道。
  
  * ```road.highway``` 會選取高速公路。
  
  * ```road.highway.controlled_access``` 
  會選取所有管制出入的高速公路。
  
  * ```road.local``` 會選取當地道路。

* ```transit``` 會選取全部大眾運輸車站和路線。
  
  * ```transit.line``` 會選取大眾運輸路線。
  
  * ```transit.station``` 會選取所有大眾運輸車站。
  
  * ```transit.station.airport``` 會選取機場。
  
  * ```transit.station.bus``` 會選取公車站。
  
  * ```transit.station.rail``` 會選取鐵路車站。

* ```water``` 會選取水域。


## elementType

下列JSON程式碼片段會選取所有當地道路的標籤：

```
{
  "featureType": "road.local",
  "elementType": "labels"
}
```

將特征細分后，得到的是元素。例如，道路是由地圖上的圖形線條（幾何形狀）組成，也包含指示其名稱的文字（標籤）。

以下是可用的元素，不過指定特征可能不支援這些元素，或僅支援部分或全部元素：

* ```all``` （預設）選取指定特征的所有元素。
* ```geometry``` 選取指定特征的所有幾何元素。
  * ```geometry.fill``` 只會選取該特征幾何形狀的填滿部分。
  * ```geometry.stroke``` 只會選取該特征幾何形狀的筆觸部分。
* ```labels``` 選取與指定特征相關    
  * ```labels.icon``` 只會選取該特征標籤內顯示的圖示。
  * ```labels.text``` 只會選取標籤的文字。
  * ```label.text.fill``` 只會選取標籤的填滿部分。標籤的填滿部分通常轉譯為包圍標籤文字的著色輪廓。
  * ```labels.text.stroke``` 只會選取標籤文字的筆觸。

## stylers

樣式工具是格式化選項，可用來套用到地圖特征和元素。

下列JSON程式碼片段會使用一個RGB值，將某個特征顯示為亮綠色：

```
"stylers": [
  { "color": "#99FF33" }
]
```

這個程式碼片段會移除某特征色彩的所有濃度，不論其起始色為何。其效果是將該特征轉譯為灰階：

```
"stylers": [
  { "saturation": -100 }
]
```

這個程式碼片段會將某個特征完全隱藏：

```
"stylers": [
  { "visibility": "off" }
]
```

支援下列樣式選項：

* ```hue``` （#RRGGBB格式的RGB十六進位字串）顯示基本色彩。
  
  注意：本選項會設定色調，同時保留預設Google樣式（或是在地圖上定義的其他樣式選項）中指定的飽和度和光度。所產生的色彩是相對於基本地圖的樣式。如果Google對基本地圖樣式有任何變更，那些變更就會影響您地圖上以hue設定樣式的特征。如果可行，最好是使用絕對```color```樣式。

* ```lightness``` （介於-100到100之間的浮點數值）指出元素亮度的百分比變更。負值會降低亮度（其中-100指定黑色），而正值會提高亮度（其中+100指定白色）。
  
  注意：本選項會設定光度，同時保留預設Google樣式（或您在地圖上定義的其他樣式選項）中指定的飽和度和色調。所產生的色彩是相對於基本地圖的樣式，如果Google對基本地圖樣式有任何變更，那些變更就會影響您地圖上以Lightness設定樣式的特征。如果可行，最好使用絕對```color```樣式。

* ```saturation```（介於-100到100之間的浮點數值）指出套用到元素之基本色彩濃度的百分比變更。

  注意：本選項會設定飽和度，同事保留預設Google樣式（或您在地圖上定義的其他樣式選項）中指定的色調和光度。所產生的色彩是相對於基本地圖的樣式。如果Google對基本地圖樣式有任何變更，那些變更就會影響您地圖上以```saturation```設定樣式的特征。如果可行，最好是使用絕對```color```樣式。

* ```gamma```（介於0.01到10.0之間的浮點數值，其中1.0表示不套用校正）指出套用到元素的色差補正校正數目。色差補正校正會以非線性方式修改色彩光度，同事不影響白色或黑色值。色差補正校正通常用來修改多個元素的對比。例如，您可以修改色差補正來提高或降低元素邊緣和內部兩者之間的對比。
  
  注意：此選項會使用色差補正曲線來調整相對於預設Google樣式的光度。如果Google對基本地圖樣式有任何變更，那些變更就會影響您地圖上以 gamma 設定樣式的特徵。如果可行，最好是使用絕對 color 樣式。

* ```invert_lightness```(如果為true)會反轉現有的光度。例如，如果要快速切換到具有白色文字的深色地圖時，這個選擇很有用。

  注意：此選項會反轉預設 Google 樣式。如果 Google 對基本地圖樣式有任何變更，那些變更就會影響您地圖上以 invert_lightness 設定樣式的特徵。如果可行，最好是使用絕對 color 樣式。

* ```visibility``` （on、off或simplified）指出地圖上是否顯示元素，以及其顯示方式。```simplified```能見度會從受影響的特征移除一些樣式特征；例如，道路會簡化成沒有輪廓的較細線條，而公園的標籤文字則會被移除但保留標籤圖示。 

* ```color```(#RRGGBB格式的RGB十六進位字串)可設定特征的色彩。

* ```weight```（大於或等於0的整數值）可設定特征的粗細（像素）。將粗細設定在高值可能會裁剪到靠近地圖方塊邊界的地方。

樣式規則是以您所指定的順序套用。請勿將多個操作結合成一個樣式操作。反之，要將每一個操作定義成樣式陣列中的個別項目。

>注意：順序很重要，因為某些操作不能相互交換。透過樣式操作修改的特征和/或元素（通常）已經有現有樣式。那些操作會針對這些現有樣式（如果有的話）執行。

以上資料來自[自訂 Google 地圖：自訂圖例](https://developers.google.com/maps/documentation/javascript/adding-a-legend?hl=zh-tw)。

&emsp;&emsp;

&nbsp;
