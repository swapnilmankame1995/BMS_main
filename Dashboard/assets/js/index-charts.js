'use strict';


//   Data sent via serial UART to python
//   | 0  | Iteration                          |
//   | 1  | LM35                               |
//   | 2  | Environment/ board NTC temperature |
//   | 3  | Cell 1 Temperature                 |
//   | 4  | cell 2 temperature                 |
//   | 6  | cell 2 voltage                     |
//   | 7  | pack voltage                       |
//   | 8  | charging state                     |
//   | 8  | discharging state                  |
//   | 10 | cell_1 Balancing                   |
//   | 11 | cell_2 Balancing                   |
//   | 12 | power                              |
//   | 13 | current                            |
//   | 14 | bus voltage                        |
//   | 15 | Serial Number                      |

// ---------------------------------------------------------------------------

// ---------------- Available Datasets ---------------

// var time= [];
// var lm35= [];
// var ambientTemp= [];
// var cell_1_temp= [];
// var cell_2_temp= [];
// var cell_1_voltage= [];
// var cell_2_voltage= [];
// var pack_voltage = [];
// var power= [];
// var current= [];
// var bus_voltage= [];
// var serial_number= [];



window.chartColors = {
	green: '#75c181',
	gray: '#FF0000',
	text: '#252930',
	border: '#4f6c9e',
	Ticks: '#a7adb8',
	blue: '#1b91bd'
	
};

var ArraySize =  data.length;





// Cell 1 vs Cell 2 Voltages
var lineChartConfig = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Cell 1 [V]',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: cell_1_voltage, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			{ 
			label: 'Cell 2 [V]',
			
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			
			data: cell_2_voltage, // ------------------------- Dataset 2 ---------------------
			fill: false,
			
			} //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},


		
		title: {
			display: true,
			text: 'Cell 1 vs Cell 2 Voltages ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
					
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString() + " V" ;   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
			
		}
	}
};

// Cell 1 Voltage Compared to Cell 1 Temperature
var lineChartConfig_2 = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Cell 1 Voltage [V]',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: cell_1_voltage, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			{ 
			label: 'Cell 1 Temperature [C]',
			
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: cell_1_temp, // ------------------------- Dataset 2 ---------------------
			fill: false,
			
			} //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},

		
		title: {
			display: true,
			text: 'Cell 1 Voltage Compared to Cell 1 Temperature ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString()  ;   // ---------  measurement Units ------------
		            }
		        },
			}]
			
		}
	}
};


// Cell 2 Voltage Compared to Cell 2 Temperature
var lineChartConfig_3 = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Cell 2 Voltage [V]',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: cell_2_voltage, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			{ 
			label: 'Cell 2 Temperature [C]',
			
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: cell_2_temp, // ------------------------- Dataset 2 ---------------------
			fill: false,
			
			} //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},


		
		title: {
			display: true,
			text: 'Cell 2 Voltage Compared to Cell 2 Temperature ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString();     // ---------  measurement Units ------------
		            }
		        },
			}]
			
		}
	}
};


// Current Output over Time

var lineChartConfig_4 = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Current',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: current, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			// { 
			// label: 'Cell 2',
			
		    // borderDash: [3, 5],
			// backgroundColor: window.chartColors.gray,
			// borderColor: window.chartColors.gray,
			
			// data: ambientTemp, // ------------------------- Dataset 2 ---------------------
			// fill: false,
			
			// } //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},

		
		title: {
			display: true,
			text: 'Current Output over Time ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString() + " A" ;   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
			
		}
	}
};


// Cell temperature compared to current output

var lineChartConfig_5 = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Current [A]',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: current, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			{ 
			label: 'Temperature [C]',
			
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: cell_1_temp, // ------------------------- Dataset 2 ---------------------
			fill: false,
			
			} //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},


		
		title: {
			display: true,
			text: 'Cell temperature compared to current output ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString();     // ---------  measurement Units ------------
		            }
		        },
			}]
			
		}
	}
};

// Cell Temperature Vs Power Output

var lineChartConfig_6 = {
	type: 'line',


	data: {
		labels: time, // ------------------------- Dataset for Y Axis ------------------
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		
		datasets: [

			//--------------------------
			{  
			label: 'Temperature [C]',
			fill: false,
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,

			data: cell_1_temp, // -------------------------------- Dataset 1 --------------------
			
			}, 
			//---------------------------
			//---------------------------
			{ 
			label: 'Power {mW}',
			
		    borderDash: [3, 5],
			backgroundColor: window.chartColors.gray,
			borderColor: window.chartColors.gray,
			
			data: power, // ------------------------- Dataset 2 ---------------------
			fill: false,
			
			} //---------------------------



	]
	},
	options: {
		responsive: true,	
		aspectRatio: 1.5,
		backgroundColor: '#FF0000',
		
		legend: {
			display: true,
		
			position: 'bottom',
			align: 'end',
			
		},

	
		
		title: {
			display: true,
			text: 'Cell Temperature Vs Power Output ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
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
			

            // callbacks: {
	        //     //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
            //     label: function(tooltipItem, data) {
	        //         if (parseInt(tooltipItem.value) >= 1000) {
            //             return  tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g  + "V", ",");
            //         } else {
	        //             return    tooltipItem.value + " volt" ;
            //         }
            //     }
            // },

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
				
				},
				ticks: {
					fontColor: window.chartColors.Ticks,
					
		        },
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
					fontColor: window.chartColors.Ticks,
					
				},
				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString() ;   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
		            }
		        },
			}]
			
		}
	}
};



// Time range

var sliced = time.slice(ArraySize - 50, ArraySize);

var barChartConfig = {
	type: 'bar',

	data: {
		labels: sliced,
		ticks: {
			fontColor: window.chartColors.Ticks,
		},
		datasets: [
			
			{
			label: 'Cell 1 Voltage',
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			borderWidth: 1,
			maxBarThickness: 100,
			
			data: cell_1_voltage
		},
		{
			label: 'Cell 2 Voltage',
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth: 1,
			maxBarThickness: 100,
			
			data: cell_2_voltage
		}
	
	]
	},
	options: {
		responsive: true,
		aspectRatio: 3.5,
		legend: {
			position: 'top',
			align: 'center',
		},
		title: {
			display: true,
			text: 'Cell Voltages ' + '['+ serial_number[0]+ ']',
			fontColor: window.chartColors.Ticks,
			
			
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

		},
		scales: {
			xAxes: [{
				display: true,
				
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},

			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},

				ticks: {
		            beginAtZero: true,
					fontColor: window.chartColors.Ticks,
		            userCallback: function(value, index, values) {
		                return  value.toLocaleString();     // ---------  measurement Units ------------
		            }
		        },
			}]
		}
		
	}
}



const date = new Date(null);
date.setSeconds(ArraySize); // specify value for SECONDS here
const total_time = date.toISOString().slice(11, 19);


// Generate charts on load
window.addEventListener('load', function(){
	
	var lineChart = document.getElementById('canvas-linechart').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig);

	var lineChart = document.getElementById('canvas-linechart2').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig_2);

	var lineChart = document.getElementById('canvas-linechart3').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig_3);

	var lineChart = document.getElementById('canvas-linechart4').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig_4);

	var lineChart = document.getElementById('canvas-linechart5').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig_5);

	var lineChart = document.getElementById('canvas-linechart6').getContext('2d');
	window.myLine = new Chart(lineChart, lineChartConfig_6);
	
	var barChart = document.getElementById('canvas-barchart_batteryBal').getContext('2d');
	window.myBar = new Chart(barChart, barChartConfig);

	document.getElementById('Tot_time').innerHTML = total_time; 
	document.getElementById('Ambient_temp').innerHTML = ambientTemp[ArraySize -1] + " C";
	document.getElementById('cell_temp_1').innerHTML = cell_1_temp[ArraySize-1]  + " C";
	document.getElementById('cell_temp_2').innerHTML = cell_2_temp[ArraySize-1]  + " C";
	document.getElementById('cell_temp_2').innerHTML = cell_2_temp[ArraySize-1]  + " C";
	document.getElementById('serialNumber').innerHTML = serial_number[ArraySize-1];
	document.getElementById('Tot_voltage').innerHTML = pack_voltage[ArraySize-1] + " V";
	// document.getElementById('SOC').innerHTML = pack_voltage[ArraySize-1] + " %";
	// document.getElementById('coloumb').innerHTML = pack_voltage[ArraySize-1] + " V";
	console.log(ambientTemp[ArraySize-1]);
	console.log(cell_1_temp[ArraySize-1]);
	console.log(pack_voltage[ArraySize-1]);

});	
	
