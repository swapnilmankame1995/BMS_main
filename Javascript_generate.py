

import csv
import os


try:
    os.remove("Dashboard/assets/js/bms_data.js") # block raising an exception
except:
    pass # doing nothing on exception

# Read the CSV file into a 2D array
with open('Data_copy.csv', 'r') as file:
    reader = csv.reader(file)
    data = list(reader)

#

file_js = open("Dashboard/assets/js/bms_data.js", "w")
file_js.write(
'''
var data =''' + str(data) + '''

console.log(data.length);

var time= [];
var lm35= [];
var ambientTemp= [];
var cell_1_temp= [];
var cell_2_temp= [];
var cell_1_voltage= [];
var cell_2_voltage= [];
var pack_voltage = [];
var power= [];
var current= [];
var bus_voltage= [];


for (var i = 0; i < data.length; i++) {
time[i] = data[i][0];
lm35[i]  = data[i][1]
ambientTemp[i] = data[i][2]
cell_1_temp[i] = data[i][3]
cell_2_temp[i] = data[i][4]
cell_1_voltage[i] = data[i][5]
cell_2_voltage[i] = data[i][6]
pack_voltage[i] = data[i][7]
power[i] = data[i][12]
current[i] = data[i][13]
bus_voltage[i] = data[i][14]
// console.log(power[5]);
}
console.log(power);
console.log(lm35);
console.log(ambientTemp);
console.log(cell_1_temp);
console.log(cell_2_temp);
console.log(cell_1_voltage);
console.log(cell_2_voltage);
console.log(pack_voltage);

'''
)
# Saving the data into the HTML file
file_js.close()


