'use strict';











	//   Data sent via serial UART to python
	//   | 0  | Iteration                          |
	//   | 1  | LM35                               |
	//   | 2  | Environment/ board NTC temperature |
	//   | 3  | Cell 1 Temperature                 |
	//   | 4  | cell 2 temperature                 |
	//   | 5  | cell 1 voltage                     |
	//   | 6  | cell 2 voltage                     |
	//   | 7  | pack voltage                       |
	//   | 8  | charging state                     |
	//   | 8  | discharging state                  |
	//   | 10 | cell_1 Balancing                   |
	//   | 11 | cell_2 Balancing                   |
	//   | 12 | power                              |
	//   | 13 | current                            |
	//   | 14 | bus voltage                        |




// ---------------------------------------------------------------------------




/* Chart.js docs: https://www.chartjs.org/ */

window.chartColors = {
	green: '#75c181',
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed'
};

/* Random number generator for demo purpose */
var randomDataPoint = function(){ return Math.round(Math.random()*10000)};


//Chart.js Line Chart Example 

var lineChartConfig = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 1',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: lm35,
		}, {
			label: 'Cell 2',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: ambientTemp,
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

var lineChartConfig2 = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 3',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}, {
			label: 'Cell 4',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

var lineChartConfig3 = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 5',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}, {
			label: 'Cell 6',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

var lineChartConfig4 = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 7',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}, {
			label: 'Cell 8',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

var lineChartConfig5 = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 9',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}, {
			label: 'Cell 10',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

var lineChartConfig6 = {
	type: 'line',

	data: {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
		
		datasets: [{
			label: 'Cell 9',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
		}, {
			label: 'Cell 10',
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: [
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint(),
				randomDataPoint()
			],
			fill: false,
		}]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},
		
		title: {
			display: true,
			text: 'Cell temperatures',
			
		}, 
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

            callbacks: {
	            //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
                label: function(tooltipItem, data) {
	                if (parseInt(tooltipItem.value) >= 1000) {
                        return "$" + tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
	                    return '$' + tooltipItem.value;
                    }
                }
            },

		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true,
		            userCallback: function(value, index, values) {
		                return '$' + value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
		}
	}
};

// Chart.js Bar Chart Example 

// var barChartConfig = {
// 	type: 'bar',

// 	data: {
// 		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// 		datasets: [{
// 			label: 'Orders',
// 			backgroundColor: window.chartColors.green,
// 			borderColor: window.chartColors.green,
// 			borderWidth: 1,
// 			maxBarThickness: 16,
			
// 			data: [
// 				23,
// 				45,
// 				76,
// 				75,
// 				62,
// 				37,
// 				83
// 			]
// 		}]
// 	},
// 	options: {
// 		responsive: true,
// 		aspectRatio: 1.5,
// 		legend: {
// 			position: 'bottom',
// 			align: 'end',
// 		},
// 		title: {
// 			display: true,
// 			text: 'Chart.js Bar Chart Example'
// 		},
// 		tooltips: {
// 			mode: 'index',
// 			intersect: false,
// 			titleMarginBottom: 10,
// 			bodySpacing: 10,
// 			xPadding: 16,
// 			yPadding: 16,
// 			borderColor: window.chartColors.border,
// 			borderWidth: 1,
// 			backgroundColor: '#fff',
// 			bodyFontColor: window.chartColors.text,
// 			titleFontColor: window.chartColors.text,

// 		},
// 		scales: {
// 			xAxes: [{
// 				display: true,
// 				gridLines: {
// 					drawBorder: false,
// 					color: window.chartColors.border,
// 				},

// 			}],
// 			yAxes: [{
// 				display: true,
// 				gridLines: {
// 					drawBorder: false,
// 					color: window.chartColors.borders,
// 				},

				
// 			}]
// 		}
		
// 	}
// }







// Generate charts on load
window.addEventListener('load', function(){
	
	var lineChart = document.getElementById('canvas-linechart').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig);

	var lineChart = document.getElementById('canvas-linechart2').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig2);

	var lineChart = document.getElementById('canvas-linechart3').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig2);

	var lineChart = document.getElementById('canvas-linechart4').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig2);

	var lineChart = document.getElementById('canvas-linechart5').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig2);

	var lineChart = document.getElementById('canvas-linechart6').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig2);
	
	var barChart = document.getElementById('canvas-barchart').getContext('2d');
	window.myBar = new Chart(barChart, barChartConfig);
	

});	
	
