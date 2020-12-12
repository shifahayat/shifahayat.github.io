
	var MapBoxLayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9',
		tileSize: 512,
		zoomOffset: -1
	});

	var geojson = L.geoJson(albertaData, {
		style: style,
		onEachFeature: onEachFeature
	});
	var geojson2 = L.geoJson(albertaData, {
		style: style2,
		onEachFeature: onEachFeature
	});
	var map = L.map('map2', {
		center: [55, -115],
		zoom: 5,
		layers: [MapBoxLayer,geojson2]
	});


	var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Alberta Census</h4>' +  (props ?
			'<b>Total population: </b><br />' + props.TOTAL_8 + ' people<br/><b>Population > 65:</b><br />' + props.TOTAL_24 + ' people<br/><b>Population percentage > 65:</b><br />' + Math.round(props.TOTAL_24/props.TOTAL_8*100) + ' %'
			: 'Hover over a census division');

	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 1000 ? '#800026' :
				d > 500  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 100  ? '#FC4E2A' :
				d > 50   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
	}


	function getColor2(d) {
		return d >35 ? '#800026' :
				d > 30  ? '#BD0026' :
				d > 25  ? '#E31A1C' :
				d > 20  ? '#FC4E2A' :
				d > 15   ? '#FD8D3C' :
				d > 10   ? '#FEB24C' :
				d > 5   ? '#FED976' :
							'#FFEDA0';
	}


	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.TOTAL_24)
		};
	}
	function style2(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor2((feature.properties.TOTAL_24/feature.properties.TOTAL_8)*100)
		};
	}
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}



	function resetHighlight(e) {
		//geojson.resetStyle(e.target);
		geojson2.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}




	map.attributionControl.addAttribution('Census data &copy; Alberta Government</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [5,10,15,20,25,30,35],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor2(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

	var baseLayers = {
		"Base map": MapBoxLayer
	};
	var overlays = {
		"Base map": MapBoxLayer,
		/*"Population above 65 (absolute)": geojson,*/
		"Population above 65 (percentage)": geojson2
	};
	L.control.layers(null,overlays).addTo(map);
