$('document').ready(function () { 
	
	function create_widget(url,type) {
		$.ajax({
			type: 'get',
			url: url,
			datatype: 'json',
			success: function(data){
				var myChart = Highcharts.chart('container', {
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Crime type'
					},
					xAxis: {
						categories: data['types']
					},
					yAxis: {
					},
					series: [{
						data: data['values']
					}]
				});
			}
		});
	}

	$.ajax({
		type: 'get',
		url: '/get_primary_type',
		datatype: 'json',
		success: function(data){
			types = [];
				values = [];
				
				for(var i = 0; i<data.length; i++){
					types[i] = data[i]['column'];
					values[i] = parseInt(data[i]['count']);
				}
				
				var myChart = Highcharts.chart('container', {
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Crime type'
					},
					xAxis: {
						categories: types
					},
					yAxis: {
					},
					series: [{
						data: values
					}]
				});
			}
		});

	$('button').on('click', function(){
		$.ajax({
			type: 'post',
			url: '/update_date',
			datatype: 'json',
			success: function(data){
				types = [];
				values = [];
				
				for(var i = 0; i<data.length; i++){
					types[i] = data[i]['column'];
					values[i] = parseInt(data[i]['count']);
				}
				
				var myChart = Highcharts.chart('container', {
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Crime type'
					},
					xAxis: {
						categories: types
					},
					yAxis: {
					},
					series: [{
						data: values
					}]
				});
			}
		});
	});

	$(function () {
	    $('.datepicker').datepicker();
	});

});
