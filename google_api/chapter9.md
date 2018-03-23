# 控制項

## 控制項總覽

透過Google Maps JavaScript API顯示的地圖包含UI元素，可以讓使用者與地圖互動，而這些元素也被稱為「控制項」

### 以下是可以在地圖中使用的完整控制項集合清單：

* 「縮放控制項」顯示“+”和“-”按鈕，用來變更地圖和縮放層級。此控制項預設顯示在地圖的右下角。

* 「地圖類型控制項」可透過下拉式清單中或呈現水平的按鈕列樣式使用，可讓使用者選取地圖類型 (```ROADMAP```、```SATELLITE```、```HYBRID``` 或 ```TERRAIN```)。此控制項預設顯示在地圖的左上角。

* 「街景服務控制項」包含「小黃人」圖示，可以拖曳到地圖上以啟用街景功能。此控制項預設顯示在靠近地圖的右下角。

* 「旋轉控制項」會提供傾斜和旋轉選項的組合，供包含傾斜影像的地圖使用。此控制項預設顯示在靠近地圖的右下角。請參閱 [45° 影像](https://developers.google.com/maps/documentation/javascript/maptypes?hl=zh-tw#45DegreeImagery)瞭解更多資訊。

* 「比例控制項」顯示地圖比例元素。此控制項預設是停用的。

* 「全螢幕控制項」提供可用來以全螢幕模式開啟地圖的選項。此控制項預設會在行動裝置上啟用，而且預設會在電腦上停用。注意：iOS 不支援全螢幕功能。因此，全螢幕控制項在 iOS 裝置上是不可見的。

不是直接存取或修改這些地圖控制項，而是修改地圖的 MapOptions 欄位，影響控制項的能見度和呈現方式。可以在具現化地圖時調整控制項的呈現方式（使用適當的 ```MapOptions```）或呼叫 ```setOptions()``` 變更地圖的選項來動態修改地圖。

並非所有控制項預設都會啟用。若要瞭解預設的 UI 行為（以及如何修改這類行為），可以參閱下面的[預設 UI](https://developers.google.com/maps/documentation/javascript/controls?hl=zh-tw#DefaultUI)。

以上資料來自[自訂 Google 地圖：自訂圖例](https://developers.google.com/maps/documentation/javascript/adding-a-legend?hl=zh-tw)。

&emsp;&emsp;

&nbsp;
