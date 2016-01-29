//=================== Map Configuration =====================
var apeldoornLonLat = [ 5.96992310, 52.21115700 ]
var apeldoornWebMercator = ol.proj.fromLonLat(apeldoornLonLat)

var map = new ol.Map({
	layers : [ new ol.layer.Tile({
		source : new ol.source.OSM()
	}) ],
	controls : ol.control.defaults({
		attributionOptions : /** @type {olx.control.AttributionOptions} */
		({
			collapsible : false
		})
	}),
	target : 'map',
	view : new ol.View({
		center : apeldoornWebMercator,
		zoom : 10
	})
});

//==================== General =========================================

$(document).ready(function() {
	
	$("#polygon").val("POLYGON((5.66992310 52.01115700, 5.86992310 52.51115700, 6.36992310 52.21115700, 5.96992310 52.31115700, 6.16992310 52.21115700))");
	$("#wmsurl").val("http://demo.boundlessgeo.com/geoserver/wms")
	
	$("#wms_submit").click(function() {

		//=============== LOAD NEW WMS LAYER ================================
		var wmsSource = new ol.source.TileWMS({
	        url: $("#wmsurl").val(),
	        params: {'LAYERS': 'ne:ne'},
	        serverType: 'geoserver',
	        crossOrigin: 'anonymous'
	      });

	      var wmsLayer = new ol.layer.Tile({
	        source: wmsSource
	      });
		
		map.addLayer(wmsLayer);

		
    
	});
	
	
	$("#poly_submit").click(function() {
		//=============== LOAD NEW VECTOR SHAPE ================================
		var wkt = $("#polygon").val();

		var format = new ol.format.WKT();
    
		var feature = format.readFeature(wkt, {
			dataProjection: 'EPSG:4326',
			featureProjection: 'EPSG:3857'
		});

		var vector = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [feature]
			})
		});
    
		map.addLayer(vector);
	
	});
})