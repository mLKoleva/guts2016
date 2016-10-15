$('document').ready(function () { 
	var charts_definition = {
			line:{
					chart: {
						renderTo : "wd1"
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
					renderTo : "wd2"
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
					renderTo : "wd3"
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
					renderTo : "wd4"
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

	function create_widget(title,categories,yAxis_title,) {

	}

	$.ajax({
		type: 'get',
		url: '/get_primary_type',
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

	$('button').on('click', function(){
		$.ajax({
			type: 'post',
			url: '/update_date',
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
	});

	$(function () {
	    $('.datepicker').datepicker();
	});

});
