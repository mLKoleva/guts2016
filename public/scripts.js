$('document').ready(function () { 
	$.ajax({
		type: 'get',
		url: '/get_primary_type',
		datatype: 'json',
		success: function(data){
			types = [];
				values = [];
				var title = $('#display option:selected').text() + " - " + $('#type option:selected').text();
				for(var i = 0; i<data.length; i++){
					types[i] = data[i]['column'];
					values[i] = parseInt(data[i]['count']);
				}
				
				var wd1 = Highcharts.chart('wd1', {
					chart: {
						type: 'bar'
					},
					title: {
						text: title
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

				var wd2 = Highcharts.chart('wd2', {
					chart: {
						type: 'column'
					},
					title: {
						text: title
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

				var wd3 = Highcharts.chart('wd3', {
					chart: {
						type: 'line'
					},
					title: {
						text: title
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

				var wd4 = Highcharts.chart('wd4', {
					chart: {
						type: 'pie'
					},
					title: {
						text: title
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

	$('button').on('click', function(event){
		event.preventDefault();
		$.ajax({
			type: 'post',
			url: '/',
			data: {
				display: $("#display").val(),
				type: $("#type").val(),
				dateFrom: $('#dateFrom').val(),
				dateTo : $('#dateTo').val()
			},
			datatype: 'json',
			success: function(data){
				types = [];
				values = [];
				var title = $('#display option:selected').text() + " - " + $('#type option:selected').text();
				
				if($('#display').val() === '2'){
					for(var i = 0; i<2; i++){
						if(data[i]['column'] === 'true'){
						data[i]['column'] = 'Domestic';
						}
						else
						{
							data[i]['column'] = 'Street';
						}
					}
				}
				else if($('#display').val() === '3'){
					for(var i = 0; i<2; i++){
						if(data[i]['column'] === 'true'){
						data[i]['column'] = 'Arrest(s) made';
						}
						else
						{
							data[i]['column'] = 'No arrest(s)';
						}
					}
				}
				for(var i = 0; i<data.length; i++){
					types[i] = data[i]['column'];
					values[i] = parseInt(data[i]['count']);
				}
				
				var wd1 = Highcharts.chart('wd1', {
					chart: {
						type: 'bar'
					},
					title: {
						text: title
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

				var wd2 = Highcharts.chart('wd2', {
					chart: {
						type: 'column'
					},
					title: {
						text: title
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

				var wd3 = Highcharts.chart('wd3', {
					chart: {
						type: 'line'
					},
					title: {
						text: title
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

				var wd4 = Highcharts.chart('wd4', {
					chart: {
						type: 'pie'
					},
					title: {
						text: title
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
	    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
	});
	


});
