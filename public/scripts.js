$('document').ready(function () { 
	var charts_definition = {
			line:{
					chart: {
						renderTo : "wd1",
		            	type: 'line'
		        	},
		        	title: {
		            	text: ''
		        	},
		        	xAxis: {
		            	categories: []
		        	},
		        	yAxis: {
		            	title: {
		                	text: ''
		            	}
		        	},
		        	series: [{
		            	name: '',
		            	data: []
		        	}, {
		            	name: '',
		            	data: []
		        	}]
			},
			bar:{
				chart: {
					renderTo : "wd2",
	            	type: 'bar'
	        	},
	        	title: {
	            	text: ''
	        	},
	        	xAxis: {
	            	categories: []
	        	},
	        	yAxis: {
	            	title: {
	                	text: ''
	            	}
	        	},
	        	series: [{
	            	name: '',
	            	data: []
	        	}, {
	            	name: '',
	            	data: []
	        	}]				
			},
			column:{
				chart: {
					renderTo : "wd3",
	            	type: 'column'
	        	},
	        	title: {
	            	text: ''
	        	},
	        	xAxis: {
	            	categories: []
	        	},
	        	yAxis: {
	            	title: {
	                	text: ''
	            	}
	        	},
	        	series: [{
	            	name: '',
	            	data: []
	        	}, {
	            	name: '',
	            	data: []
	        	}]
			},
			pie:{
				chart: {
					renderTo : "wd4",
	            	type: 'pie'
	        	},
	        	title: {
	            	text: ''
	        	},
	        	xAxis: {
	            	categories: []
	        	},
	        	yAxis: {
	            	title: {
	                	text: ''
	            	}
	        	},
	        	series: [{
	            	name: '',
	            	data: []
	        	}, {
	            	name: '',
	            	data: []
	        	}]
			}
	};

	function create_widget(title,categories,yAxis_title) {

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
						text: 'Crime type - All'
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
				
				var myChart = Highcharts.chart('container', {
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
			}
		});
	});

	$(function () {
	    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
	});
	


});
