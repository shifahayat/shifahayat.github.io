//highlight function
var highlightLayer;
function highlightFeature(e) {
  highlightLayer = e.target;

  if (e.target.feature.geometry.type === 'LineString') {
    highlightLayer.setStyle({
      //color: '#ffff00',
      weight: 6
    });
  } else {
    highlightLayer.setStyle({
      //fillColor: '#ffff00',
      //fillOpacity: 1,
      weight: 6
    });
  }
  highlightLayer.openPopup();
}
// initialize the map
var map = L.map('map', {
  zoomControl:true, maxZoom:17, minZoom:9
});
map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
// interactve layer control:
var baseMaps = {};
var overLays = {};
var layerControl = new L.control.layers(baseMaps, overLays).addTo(map);

// load a tile layer
map.createPane('pane_OpenStreetMapmonochrome_0');
map.getPane('pane_OpenStreetMapmonochrome_0').style.zIndex = 380;
  var layer_OpenStreetMapmonochrome_0 = L.tileLayer('https://a.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMapmonochrome_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 18
});
layer_OpenStreetMapmonochrome_0;
//map.addLayer(layer_OpenStreetMapmonochrome_0);
map.createPane('Stamen');
map.getPane('Stamen').style.zIndex = 380;
  var layer_Stamen= L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    pane: 'Stamen',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 17,
    minNativeZoom: 0,
    maxNativeZoom: 16
});
layer_Stamen;
map.addLayer(layer_Stamen);
var bounds_group = new L.featureGroup([]);
//adding parkingLots


function style_ParkingLots_1_0(feature) {
  switch(String(feature.properties['ACCESS'])) {
      case 'Accessible':
          return {
      pane: 'pane_ParkingLots_1',
      opacity: 1,
      color: 'rgba(20,176,15,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 4.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(186,186,186,1.0)',
      interactive: true,
  }
          break;
      case 'Inaccessible':
          return {
      pane: 'pane_ParkingLots_1',
      opacity: 1,
      color: 'rgba(176,2,5,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 4.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(186,186,186,1.0)',
      interactive: true,
  }
          break;
      default:
          return {
      pane: 'pane_ParkingLots_1',
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(201,134,62,1.0)',
      interactive: true,
  }
          break;
  }
}
map.createPane('pane_ParkingLots_1');
map.getPane('pane_ParkingLots_1').style.zIndex = 395;
map.getPane('pane_ParkingLots_1').style['mix-blend-mode'] = 'normal';
/*var layer_ParkingLots_1 = new L.geoJson(json_ParkingLots_1, {
  attribution: '',
  interactive: true,
  dataVar: 'json_ParkingLots_1',
  layerName: 'layer_ParkingLots_1',
  pane: 'pane_ParkingLots_1',
  onEachFeature: pop_ParkingLots_1,
  style: style_ParkingLots_1_0,
});
bounds_group.addLayer(layer_ParkingLots_1);
map.addLayer(layer_ParkingLots_1);*/
var layer_ParkingLots_1;
let xhr = new XMLHttpRequest();
xhr.open('GET', '../data/ParkingLots_1.geojson');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status !== 200) return
    function pop_ParkingLots_1(feature, layer) {
      layer.on({
          mouseout: function(e) {
              for (i in e.target._eventParents) {
                  e.target._eventParents[i].resetStyle(e.target);
              }
              if (typeof layer.closePopup == 'function') {
                  layer.closePopup();
              } else {
                  layer.eachLayer(function(feature){
                      feature.closePopup()
                  });
              }
          },
          mouseover: highlightFeature,
      });
      var popupContent = "Parking " + (feature.properties['Lot_Name'] !== null ? autolinker.link(feature.properties['Lot_Name'].toLocaleString()) : '') + '<br>' +
      (feature.properties['ACCESS'] !== null ? autolinker.link(feature.properties['ACCESS'].toLocaleString()) : '') + '<br>' +
        (feature.properties['NUM_ACCESS'] !== null ? autolinker.link(feature.properties['NUM_ACCESS'].toLocaleString()) : '') + ' accessible stalls out of ' +
        (feature.properties['NUM_TOTAL_'] !== null ? autolinker.link(feature.properties['NUM_TOTAL_'].toLocaleString()) : '') + ' stalls in total';
        layer.bindPopup(popupContent, {maxHeight: 400});
    }
    layer_ParkingLots_1 = L.geoJSON(xhr.response,{
      attribution: '',
    interactive: true,
  dataVar: 'json_ParkingLots_1',
  layerName: 'layer_ParkingLots_1',
  pane: 'pane_ParkingLots_1',
  onEachFeature: pop_ParkingLots_1,
  style: style_ParkingLots_1_0,}).addTo(map);
    bounds_group.addLayer(layer_ParkingLots_1);
    //map.addLayer(layer_ParkingLots_1);
      layerControl.addOverlay(layer_ParkingLots_1,'Parking Lots<br /><img src="../images/ParkingLots_1_Accessible0.png" style="display:inline;margin-left:10px;" /> Accessible<br><img src="../images/ParkingLots_1_Inaccessible1.png" style="display:inline;margin-left:10px;" /> Inaccessible');
    };
xhr.send();
// adding buildings
  function pop_Buildings_2(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = (feature.properties['NAME'] !== null ? autolinker.link(feature.properties['NAME'].toLocaleString()) : '') + '<br>' +
      //(feature.properties['NOTES'] !== null ? autolinker.link(feature.properties['NOTES'].toLocaleString()) : '') + '<<br>' +
      //(feature.properties['Abbrev'] !== null ? autolinker.link(feature.properties['Abbrev'].toLocaleString()) : '') + '<br>' +
      (feature.properties['ACCESS'] !== null ? autolinker.link(feature.properties['ACCESS'].toLocaleString()) : '') + "% of accessible entrances";
    layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_Buildings_2_0(feature) {
    if (feature.properties['q2wHide_Percent_Ac'] >= 0.000000 && feature.properties['q2wHide_Percent_Ac'] <= 0.100000 ) {
        return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(153,0,0,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['q2wHide_Percent_Ac'] >= 0.100000 && feature.properties['q2wHide_Percent_Ac'] <= 25.000000 ) {
        return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(249,255,65,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['q2wHide_Percent_Ac'] >= 25.000000 && feature.properties['q2wHide_Percent_Ac'] <= 50.000000 ) {
        return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(254,201,129,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['q2wHide_Percent_Ac'] >= 50.000000 && feature.properties['q2wHide_Percent_Ac'] <= 75.000000 ) {
        return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(196,230,135,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['q2wHide_Percent_Ac'] >= 75.000000 && feature.properties['q2wHide_Percent_Ac'] <= 100.000000 ) {
        return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(26,150,65,1.0)',
        interactive: true,
    }
    }
}
map.createPane('pane_Buildings_2');
map.getPane('pane_Buildings_2').style.zIndex = 394;
map.getPane('pane_Buildings_2').style['mix-blend-mode'] = 'normal';
var layer_Buildings_2;
/*var layer_Buildings_2 = new L.geoJson(json_Buildings_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Buildings_2',
    layerName: 'layer_Buildings_2',
    pane: 'pane_Buildings_2',
    onEachFeature: pop_Buildings_2,
    style: style_Buildings_2_0,
});*/
let xhr2 = new XMLHttpRequest();
xhr2.open('GET', '../data/Buildings_2.geojson');
xhr2.setRequestHeader('Content-Type', 'application/json');
xhr2.responseType = 'json';
xhr2.onload = function() {
    if (xhr.status !== 200) return
    layer_Buildings_2 = L.geoJSON(xhr2.response,{
      attribution: '',
      interactive: true,
      dataVar: 'json_Buildings_2',
      layerName: 'layer_Buildings_2',
      pane: 'pane_Buildings_2',
      onEachFeature: pop_Buildings_2,
      style: style_Buildings_2_0}).addTo(map);
    bounds_group.addLayer(layer_Buildings_2);
    //map.addLayer(layer_Buildings_2);
    var i = 0;
    layer_Buildings_2.eachLayer(function(layer) {
      var context = {
          feature: layer.feature,
          variables: {}
      };
      layer.bindTooltip((layer.feature.properties['Abbrev'] !== null?String('<div>' +   layer.feature.properties['Abbrev']) + '</div>':''), {permanent: true, className: 'css_Buildings_2'});
      labels.push(layer);
      totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
      });
      resetLabels([layer_Buildings_2]);
      map.on("zoomend", function(){
          resetLabels([layer_Buildings_2]);
      });
      map.on("layeradd", function(){
          resetLabels([layer_Buildings_2]);
      });
      map.on("layerremove", function(){
          resetLabels([layer_Buildings_2]);
      });
      //'Buildings [% entrance acessible]<br /><img src="../images/Buildings_2_00.png" style="display:inline;margin-left:10px;" /> 0<br><img src="../images/Buildings_2_251.png" style="display:inline;margin-left:10px;" /> < 25 <br><img src="../images/Buildings_2_502.png" style="display:inline;margin-left:10px;" /> < 50<br><img src="../images/Buildings_2_753.png" style="display:inline;margin-left:10px;" /> < 75<br><img src="../images/Buildings_2_1004.png" style="display:inline;margin-left:10px;" /> < 100': layer_Buildings_2,
      layerControl.addOverlay(layer_Buildings_2, 'Buildings [% entrance acessible]<br /><img src="../images/Buildings_2_00.png" style="display:inline;margin-left:10px;" /> 0<br><img src="../images/Buildings_2_251.png" style="display:inline;margin-left:10px;" /> < 25 <br><img src="../images/Buildings_2_502.png" style="display:inline;margin-left:10px;" /> < 50<br><img src="../images/Buildings_2_753.png" style="display:inline;margin-left:10px;" /> < 75<br><img src="../images/Buildings_2_1004.png" style="display:inline;margin-left:10px;" /> < 100');
};
xhr2.send();



//adding croswalks_inacc
function pop_CrosswalksInaccessible_3(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = "Inaccessible crosswalk"
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_CrosswalksInaccessible_3_0() {
  return {
      pane: 'pane_CrosswalksInaccessible_3',
      opacity: 1,
      color: 'rgba(255,0,0,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_CrosswalksInaccessible_3');
map.getPane('pane_CrosswalksInaccessible_3').style.zIndex = 383;
map.getPane('pane_CrosswalksInaccessible_3').style['mix-blend-mode'] = 'normal';
var layer_CrosswalksInaccessible_3 = new L.geoJson(json_CrosswalksInaccessible_3, {
  attribution: '',
  interactive: true,
  dataVar: 'json_CrosswalksInaccessible_3',
  layerName: 'layer_CrosswalksInaccessible_3',
  pane: 'pane_CrosswalksInaccessible_3',
  onEachFeature: pop_CrosswalksInaccessible_3,
  style: style_CrosswalksInaccessible_3_0,
});
bounds_group.addLayer(layer_CrosswalksInaccessible_3);
map.addLayer(layer_CrosswalksInaccessible_3);
layerControl.addOverlay(layer_CrosswalksInaccessible_3,'<img src="../images/CrosswalksInaccessible_3.png" style="display:inline;" /> Crosswalks Inaccessible');
//adding crosswalksMidAcc
function pop_CrosswalksModAccessible_4(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = "Moderately accessible crosswalk"
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_CrosswalksModAccessible_4_0() {
  return {
      pane: 'pane_CrosswalksModAccessible_4',
      opacity: 1,
      color: 'rgba(229,182,54,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_CrosswalksModAccessible_4');
map.getPane('pane_CrosswalksModAccessible_4').style.zIndex = 384;
map.getPane('pane_CrosswalksModAccessible_4').style['mix-blend-mode'] = 'normal';
var layer_CrosswalksModAccessible_4 = new L.geoJson(json_CrosswalksModAccessible_4, {
  attribution: '',
  interactive: true,
  dataVar: 'json_CrosswalksModAccessible_4',
  layerName: 'layer_CrosswalksModAccessible_4',
  pane: 'pane_CrosswalksModAccessible_4',
  onEachFeature: pop_CrosswalksModAccessible_4,
  style: style_CrosswalksModAccessible_4_0,
});
bounds_group.addLayer(layer_CrosswalksModAccessible_4);
map.addLayer(layer_CrosswalksModAccessible_4);
layerControl.addOverlay(layer_CrosswalksModAccessible_4, '<img src="../images/CrosswalksModAccessible_4.png" style="display:inline;" /> Crosswalks Mod Accessible');
function pop_CrosswalksFullyAccessible_5(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = "Fully accessible crosswalk"
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_CrosswalksFullyAccessible_5_0() {
  return {
      pane: 'pane_CrosswalksFullyAccessible_5',
      opacity: 1,
      color: 'rgba(190,207,80,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_CrosswalksFullyAccessible_5');
map.getPane('pane_CrosswalksFullyAccessible_5').style.zIndex = 385;
map.getPane('pane_CrosswalksFullyAccessible_5').style['mix-blend-mode'] = 'normal';
var layer_CrosswalksFullyAccessible_5 = new L.geoJson(json_CrosswalksFullyAccessible_5, {
  attribution: '',
  interactive: true,
  dataVar: 'json_CrosswalksFullyAccessible_5',
  layerName: 'layer_CrosswalksFullyAccessible_5',
  pane: 'pane_CrosswalksFullyAccessible_5',
  onEachFeature: pop_CrosswalksFullyAccessible_5,
  style: style_CrosswalksFullyAccessible_5_0,
});
bounds_group.addLayer(layer_CrosswalksFullyAccessible_5);
map.addLayer(layer_CrosswalksFullyAccessible_5);
layerControl.addOverlay(layer_CrosswalksFullyAccessible_5,'<img src="../images/CrosswalksFullyAccessible_5.png" style="display:inline;" /> Crosswalks Fully Accessible');
function pop_SidewalksInaccessible_6(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = "Inaccessible sidewalk<br>" +
    (feature.properties['BarrierTyp'] !== null ? autolinker.link(feature.properties['BarrierTyp'].toLocaleString()) : '');
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_SidewalksInaccessible_6_0() {
  return {
      pane: 'pane_SidewalksInaccessible_6',
      opacity: 1,
      color: 'rgba(255,0,0,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_SidewalksInaccessible_6');
map.getPane('pane_SidewalksInaccessible_6').style.zIndex = 386;
map.getPane('pane_SidewalksInaccessible_6').style['mix-blend-mode'] = 'normal';
var layer_SidewalksInaccessible_6 = new L.geoJson(json_SidewalksInaccessible_6, {
  attribution: '',
  interactive: true,
  dataVar: 'json_SidewalksInaccessible_6',
  layerName: 'layer_SidewalksInaccessible_6',
  pane: 'pane_SidewalksInaccessible_6',
  onEachFeature: pop_SidewalksInaccessible_6,
  style: style_SidewalksInaccessible_6_0,
});
bounds_group.addLayer(layer_SidewalksInaccessible_6);
map.addLayer(layer_SidewalksInaccessible_6);
layerControl.addOverlay(layer_SidewalksInaccessible_6,'<img src="../images/SidewalksInaccessible_6.png" style="display:inline;" /> Sidewalks Inaccessible');
function pop_SidewalksModAccessible_7(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = //(feature.properties['Width'] !== null ? autolinker.link(feature.properties['Width'].toLocaleString()) : '') + '<br>' +
    "Moderately accessible sidewalk<br>" +
    (feature.properties['BarrierTyp'] !== null ? autolinker.link(feature.properties['BarrierTyp'].toLocaleString()) : '');
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_SidewalksModAccessible_7_0() {
  return {
      pane: 'pane_SidewalksModAccessible_7',
      opacity: 1,
      color: 'rgba(229,182,54,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_SidewalksModAccessible_7');
map.getPane('pane_SidewalksModAccessible_7').style.zIndex = 387;
map.getPane('pane_SidewalksModAccessible_7').style['mix-blend-mode'] = 'normal';
var layer_SidewalksModAccessible_7 = new L.geoJson(json_SidewalksModAccessible_7, {
  attribution: '',
  interactive: true,
  dataVar: 'json_SidewalksModAccessible_7',
  layerName: 'layer_SidewalksModAccessible_7',
  pane: 'pane_SidewalksModAccessible_7',
  onEachFeature: pop_SidewalksModAccessible_7,
  style: style_SidewalksModAccessible_7_0,
});
bounds_group.addLayer(layer_SidewalksModAccessible_7);
map.addLayer(layer_SidewalksModAccessible_7);
layerControl.addOverlay(layer_SidewalksModAccessible_7,'<img src="../images/SidewalksModAccessible_7.png" style="display:inline;" /> Sidewalks Mod Accessible');
function pop_SidewalksFullyAccessible_8(feature, layer) {
  layer.on({
      mouseout: function(e) {
          for (i in e.target._eventParents) {
              e.target._eventParents[i].resetStyle(e.target);
          }
          if (typeof layer.closePopup == 'function') {
              layer.closePopup();
          } else {
              layer.eachLayer(function(feature){
                  feature.closePopup()
              });
          }
      },
      mouseover: highlightFeature,
  });
  var popupContent = //(feature.properties['Width'] !== null ? autolinker.link(feature.properties['Width'].toLocaleString()) : '') + '<br>' +
  "Fully accessible sidewalk"
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_SidewalksFullyAccessible_8_0() {
  return {
      pane: 'pane_SidewalksFullyAccessible_8',
      opacity: 1,
      color: 'rgba(190,207,80,1.0)',
      dashArray: '',
      lineCap: 'square',
      lineJoin: 'bevel',
      weight: 4.0,
      fillOpacity: 0,
      interactive: true,
  }
}
map.createPane('pane_SidewalksFullyAccessible_8');
map.getPane('pane_SidewalksFullyAccessible_8').style.zIndex = 388;
map.getPane('pane_SidewalksFullyAccessible_8').style['mix-blend-mode'] = 'normal';
var layer_SidewalksFullyAccessible_8 = new L.geoJson(json_SidewalksFullyAccessible_8, {
  attribution: '',
  interactive: true,
  dataVar: 'json_SidewalksFullyAccessible_8',
  layerName: 'layer_SidewalksFullyAccessible_8',
  pane: 'pane_SidewalksFullyAccessible_8',
  onEachFeature: pop_SidewalksFullyAccessible_8,
  style: style_SidewalksFullyAccessible_8_0,
});
bounds_group.addLayer(layer_SidewalksFullyAccessible_8);
map.addLayer(layer_SidewalksFullyAccessible_8);
layerControl.addOverlay(layer_SidewalksFullyAccessible_8,'<img src="../images/SidewalksFullyAccessible_8.png" style="display:inline;" /> Sidewalks Fully Accessible');
//curbs
function pop_inaccessible_curbs_0(feature, layer) {
  layer.on({
    mouseout: function(e) {
        for (i in e.target._eventParents) {
            e.target._eventParents[i].resetStyle(e.target);
        }
        if (typeof layer.closePopup == 'function') {
            layer.closePopup();
        } else {
            layer.eachLayer(function(feature){
                feature.closePopup()
            });
        }
    },
    mouseover: highlightFeature,
  });
  var popupContent =    (feature.properties['ACCESS'] !== null ? autolinker.link(feature.properties['ACCESS'].toLocaleString()) : '') + ' curb ramp<br>' +
  (feature.properties['BARRIERTYP'] !== null ? autolinker.link(feature.properties['BARRIERTYP'].toLocaleString()) : '');
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_inaccessible_curbs_0_0() {
  return {
      pane: 'pane_inaccessible_curbs_0',
      radius: 4.0,
      opacity: 1,
      color: 'RGBA(153, 153, 153, 1)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(219,30,42,1.0)',
      interactive: true,
  }
}
map.createPane('pane_inaccessible_curbs_0');
map.getPane('pane_inaccessible_curbs_0').style.zIndex = 390;
map.getPane('pane_inaccessible_curbs_0').style['mix-blend-mode'] = 'normal';
var layer_inaccessible_curbs_0 = new L.geoJson(json_inaccessible_curbs_0, {
  attribution: '',
  interactive: true,
  dataVar: 'json_inaccessible_curbs_0',
  layerName: 'layer_inaccessible_curbs_0',
  pane: 'pane_inaccessible_curbs_0',
  onEachFeature: pop_inaccessible_curbs_0,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.circleMarker(latlng, style_inaccessible_curbs_0_0(feature));
  },
});
bounds_group.addLayer(layer_inaccessible_curbs_0);
//map.addLayer(layer_inaccessible_curbs_0);
layerControl.addOverlay(layer_inaccessible_curbs_0, '<img src="../images/inaccessible_curbs_0.png" style="display:inline;" /> Curbs Inaccessible ');
function pop_accessible_curbs_1(feature, layer) {
  layer.on({
    mouseout: function(e) {
        for (i in e.target._eventParents) {
            e.target._eventParents[i].resetStyle(e.target);
        }
        if (typeof layer.closePopup == 'function') {
            layer.closePopup();
        } else {
            layer.eachLayer(function(feature){
                feature.closePopup()
            });
        }
    },
    mouseover: highlightFeature,
  });
  var popupContent = (feature.properties['ACCESS'] !== null ? autolinker.link(feature.properties['ACCESS'].toLocaleString()) : '') + ' curb ramp<br>' +
  (feature.properties['BARRIERTYP'] !== null ? autolinker.link(feature.properties['BARRIERTYP'].toLocaleString()) : '');
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_accessible_curbs_1_0() {
  return {
      pane: 'pane_accessible_curbs_1',
      radius: 4.0,
      opacity: 1,
      color: 'RGBA(153, 153, 153, 1)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(84,176,74,1.0)',
      interactive: true,
  }
}
map.createPane('pane_accessible_curbs_1');
map.getPane('pane_accessible_curbs_1').style.zIndex = 391;
map.getPane('pane_accessible_curbs_1').style['mix-blend-mode'] = 'normal';
var layer_accessible_curbs_1 = new L.geoJson(json_accessible_curbs_1, {
  attribution: '',
  interactive: true,
  dataVar: 'json_accessible_curbs_1',
  layerName: 'layer_accessible_curbs_1',
  pane: 'pane_accessible_curbs_1',
  onEachFeature: pop_accessible_curbs_1,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.circleMarker(latlng, style_accessible_curbs_1_0(feature));
  },
});
bounds_group.addLayer(layer_accessible_curbs_1);
//map.addLayer(layer_accessible_curbs_1);
layerControl.addOverlay(layer_accessible_curbs_1,'<img src="../images/accessible_curbs_1.png" style="display:inline;" /> Curbs Accessible ');

function pop_moderate_curbs_2(feature, layer) {
  layer.on({
    mouseout: function(e) {
        for (i in e.target._eventParents) {
            e.target._eventParents[i].resetStyle(e.target);
        }
        if (typeof layer.closePopup == 'function') {
            layer.closePopup();
        } else {
            layer.eachLayer(function(feature){
                feature.closePopup()
            });
        }
    },
    mouseover: highlightFeature,
  });
  var popupContent =    (feature.properties['ACCESS'] !== null ? autolinker.link(feature.properties['ACCESS'].toLocaleString()) : '') + ' curb ramp<br>' +
  (feature.properties['BARRIERTYP'] !== null ? autolinker.link(feature.properties['BARRIERTYP'].toLocaleString()) : '');
  layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_moderate_curbs_2_0() {
  return {
      pane: 'pane_moderate_curbs_2',
      radius: 4.0,
      opacity: 1,
      color: 'RGBA(153, 153, 153, 1)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255, 165, 0, 1)',
      interactive: true,
  }
}
map.createPane('pane_moderate_curbs_2');
map.getPane('pane_moderate_curbs_2').style.zIndex = 392;
map.getPane('pane_moderate_curbs_2').style['mix-blend-mode'] = 'normal';
var layer_moderate_curbs_2 = new L.geoJson(json_moderate_curbs_2, {
  attribution: '',
  interactive: true,
  dataVar: 'json_moderate_curbs_2',
  layerName: 'layer_moderate_curbs_2',
  pane: 'pane_moderate_curbs_2',
  onEachFeature: pop_moderate_curbs_2,
  pointToLayer: function (feature, latlng) {
      var context = {
          feature: feature,
          variables: {}
      };
      return L.circleMarker(latlng, style_moderate_curbs_2_0(feature));
  },
});
bounds_group.addLayer(layer_moderate_curbs_2);
layerControl.addOverlay(layer_moderate_curbs_2, '<img src="../images/moderate_curbs_2.png" style="display:inline;" /> Curbs Moderately Accessible ');
//map.addLayer(layer_moderate_curbs_2);


var baseMaps = {};

  // wait until DOM has loaded before running code
//$(document).ready(function() {

  // this code is only run once the DOM has loaded
  /*L.control.layers(baseMaps,{
    '<img src="../images/accessible_curbs_1.png" style="display:inline;" /> Curbs Accessible ': layer_accessible_curbs_1,
    '<img src="../images/moderate_curbs_2.png" style="display:inline;" /> Curbs Moderately Accessible ': layer_moderate_curbs_2,
    '<img src="../images/inaccessible_curbs_0.png" style="display:inline;" /> Curbs Inaccessible ': layer_inaccessible_curbs_0,
    '<img src="../images/SidewalksFullyAccessible_8.png" style="display:inline;" /> Sidewalks Fully Accessible': layer_SidewalksFullyAccessible_8,
    '<img src="../images/SidewalksModAccessible_7.png" style="display:inline;" /> Sidewalks Mod Accessible': layer_SidewalksModAccessible_7,
    '<img src="../images/SidewalksInaccessible_6.png" style="display:inline;" /> Sidewalks Inaccessible': layer_SidewalksInaccessible_6,
    '<img src="../images/CrosswalksFullyAccessible_5.png" style="display:inline;" /> Crosswalks Fully Accessible': layer_CrosswalksFullyAccessible_5,
    '<img src="../images/CrosswalksModAccessible_4.png" style="display:inline;" /> Crosswalks Mod Accessible': layer_CrosswalksModAccessible_4,
    '<img src="../images/CrosswalksInaccessible_3.png" style="display:inline;" /> Crosswalks Inaccessible': layer_CrosswalksInaccessible_3,
    //'Buildings [% entrance acessible]<br /><img src="../images/Buildings_2_00.png" style="display:inline;margin-left:10px;" /> 0<br><img src="../images/Buildings_2_251.png" style="display:inline;margin-left:10px;" /> < 25 <br><img src="../images/Buildings_2_502.png" style="display:inline;margin-left:10px;" /> < 50<br><img src="../images/Buildings_2_753.png" style="display:inline;margin-left:10px;" /> < 75<br><img src="../images/Buildings_2_1004.png" style="display:inline;margin-left:10px;" /> < 100': layer_Buildings_2,
    'Parking Lots<br /><img src="../images/ParkingLots_1_Accessible0.png" style="display:inline;margin-left:10px;" /> Accessible<br><img src="../images/ParkingLots_1_Inaccessible1.png" style="display:inline;margin-left:10px;" /> Inaccessible': layer_ParkingLots_1,
    "Terrain ": layer_Stamen,
    "OpenStreetMap monochrome": layer_OpenStreetMapmonochrome_0},{collapsed:false, id:"LayerControl"}).addTo(map);*/
//});
map.fitBounds([[51.069150756757764,-114.14864845733861],[51.08612491756922,-114.11165913466205]]);
//map.fitBounds([[50.82823823643107,-114.43890601034177],[51.2279077695121,-113.58878643821647]]);
map.setMaxBounds(new L.latLngBounds([[50.82823823643107,-114.43890601034177],[51.2279077695121,-113.58878643821647]]))
//function setBounds() {
//  map.(map.getBounds());
//}
//setBounds();
//map.zoomIn();
console.log(map.getZoom());
//add measuretool
var measureControl = new L.Control.Measure({
  position: 'topleft',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'hectares',
  activeColor: '#2c2c2c',
  completedColor: '#000000',
});
measureControl.addTo(map);
//document.getElementsByClassName('leaflet-control-measure-toggle')[0]
//.innerHTML = '';
//document.getElementsByClassName('leaflet-control-measure-toggle')[0]
//.className += ' fas fa-ruler';
map.zoomIn();

//adding labels:
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("rbush")):"function"==typeof define&&define.amd?define(["rbush"],t):"object"==typeof exports?exports.labelgun=t(require("rbush")):e.labelgun=t(e.rbush)}(this,function(e){return function(e){function t(l){if(a[l])return a[l].exports;var n=a[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,l){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,a){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),i=a(1),s=function(e){return e&&e.__esModule?e:{default:e}}(i),r=function(){function e(t,a,n){l(this,e);var i=n||10;this.tree=(0,s.default)(i),this.allLabels={},this.hasChanged=[],this.allChanged=!1,this.hideLabel=t,this.showLabel=a}return n(e,[{key:"_total",value:function(e){for(var t=0,a=0,l=Object.keys(this.allLabels);a<l.length;a++)this.allLabels[l[a]].state==e&&(t+=1);return t}},{key:"totalShown",value:function(){return this._total("show")}},{key:"totalHidden",value:function(){return this._total("hide")}},{key:"_getLabelsByState",value:function(e){for(var t=[],a=0,l=Object.keys(this.allLabels);a<l.length;a++)this.allLabels[l[a]].state==e&&t.push(this.allLabels[l[a]]);return t}},{key:"getHidden",value:function(){return this._getLabelsByState("hide")}},{key:"getShown",value:function(){return this._getLabelsByState("show")}},{key:"getCollisions",value:function(e){var t=this.allLabels[e];if(void 0===t)throw Error("Label doesn't exist :"+JSON.stringify(e));var a=this.tree.search(t),l=a.indexOf(t);return void 0!==l&&a.splice(l,1),a}},{key:"getLabel",value:function(e){return this.allLabels[e]}},{key:"reset",value:function(){this.tree.clear(),this.allLabels={},this.hasChanged=[],this.allChanged=!1}},{key:"_callLabelCallbacks",value:function(e){var t=this;Object.keys(this.allLabels).forEach(function(a){t._callLabelStateCallback(t.allLabels[a],e)})}},{key:"_callLabelStateCallback",value:function(e,t){var a=t||e.state;"show"===a&&this.showLabel(e),"hide"===a&&this.hideLabel(e)}},{key:"_compareLabels",value:function(){var e=this;this.orderedLabels=Object.keys(this.allLabels).map(function(t){return e.allLabels[t]}).sort(this._compare),this.orderedLabels.forEach(function(t){var a=e.tree.search(t);(0===a.length||e._allLower(a,t)||t.isDragged)&&(e.allLabels[t.id].state="show")})}},{key:"_allLower",value:function(e,t){for(var a=void 0,l=0;l<e.length;l++)if(a=e[l],"show"===a.state||a.weight>t.weight||a.isDragged)return!1;return!0}},{key:"_compare",value:function(e,t){return e.weight>t.weight?-1:e.weight<t.weight?1:0}},{key:"_setupLabels",value:function(){var e=this;this.allChanged?(this.allChanged=!1,this.hasChanged=[],this.tree.clear(),Object.keys(this.allLabels).forEach(function(t){e._handleLabelIngestion(t)})):this.hasChanged.length>0&&(this.hasChanged.forEach(function(t){e._handleLabelIngestion(t)}),this.hasChanged=[])}},{key:"_handleLabelIngestion",value:function(e){var t=this.allLabels[e];this.ingestLabel({bottomLeft:[t.minX,t.minY],topRight:[t.maxX,t.maxY]},t.id,t.weight,t.labelObject,t.name,t.isDragged)}},{key:"update",value:function(e){this.allChanged=!e,this._setupLabels(),this._compareLabels(),this._callLabelCallbacks()}},{key:"removeLabel",value:function(e){var t=this.allLabels[e];this.tree.remove(t),delete this.allLabels[e]}},{key:"_addToTree",value:function(e){this.allLabels[e.id]=e,this.tree.insert(e)}},{key:"ingestLabel",value:function(e,t,a,l,n,i){if(void 0!==a&&null!==a||(a=0),!e||!e.bottomLeft||!e.topRight)throw Error("Bounding box must be defined with bottomLeft and topRight properties");if("string"!=typeof t&&"number"!=typeof t)throw Error("Label IDs must be a string or a number");var s=this.allLabels[t];s&&this.removeLabel(s.id);var r={minX:e.bottomLeft[0],minY:e.bottomLeft[1],maxX:e.topRight[0],maxY:e.topRight[1],state:"hide",id:t,weight:a,labelObject:l,name:n,isDragged:i};this._addToTree(r)}},{key:"labelHasChanged",value:function(e){-1===this.hasChanged.indexOf(e)&&this.hasChanged.push(e)}}]),e}();t.default=r},function(t,a){t.exports=e}])});
var hideLabel = function(label) {
  label.labelObject.style.opacity = 0;
  label.labelObject.style.transition = 'opacity 0s';
};
var showLabel = function(label) {
  label.labelObject.style.opacity = 1;
  label.labelObject.style.transition = 'opacity 1s';
};
labelEngine = new labelgun.default(hideLabel, showLabel);

var id = 0;
var labels = [];
var totalMarkers = 0;

function resetLabels(markers) {
  labelEngine.reset();
  var i = 0;
  for (var j = 0; j < markers.length; j++) {
      markers[j].eachLayer(function(label){
          addLabel(label, ++i);
      });
  }
labelEngine.update();
}

function addLabel(layer, id) {

// This is ugly but there is no getContainer method on the tooltip :(
if (layer.getTooltip()) {
    var label = layer.getTooltip()._source._tooltip._container;
    if (label) {

      // We need the bounding rectangle of the label itself
      var rect = label.getBoundingClientRect();

      // We convert the container coordinates (screen space) to Lat/lng
      var bottomLeft = map.containerPointToLatLng([rect.left, rect.bottom]);
      var topRight = map.containerPointToLatLng([rect.right, rect.top]);
      var boundingBox = {
        bottomLeft : [bottomLeft.lng, bottomLeft.lat],
        topRight   : [topRight.lng, topRight.lat]
      };

      // Ingest the label into labelgun itself
      labelEngine.ingestLabel(
        boundingBox,
        id,
        parseInt(Math.random() * (5 - 1) + 1), // Weight
        label,
        "Test " + id,
        false
      );

      // If the label hasn't been added to the map already
      // add it and set the added flag to true
      if (!layer.added) {
        layer.addTo(map);
        layer.added = true;
      }
    }
}
}



//notes/abstract/about info
var abstract = new L.Control({'position':'bottomright'});
abstract.onAdd = function (map) {
  this._div = L.DomUtil.create('div',
  'leaflet-control abstract');
  this._div.id = 'abstract'
      this._div.setAttribute("onmouseenter", "abstract.show()");
      this._div.setAttribute("onmouseleave", "abstract.hide()");
      this.hide();
      return this._div;
  };
  abstract.hide = function () {
      this._div.classList.remove("abstractUncollapsed");
      this._div.classList.add("abstract");
      this._div.innerHTML = 'i'
  }
  abstract.show = function () {
      this._div.classList.remove("abstract");
      this._div.classList.add("abstractUncollapsed");
      this._div.innerHTML = 'Based on Hayat and Fast (2019)';
};
abstract.addTo(map);
