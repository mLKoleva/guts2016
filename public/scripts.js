$('document').ready(function () { 
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