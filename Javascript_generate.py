
# --------------------------Readme-------------------------

# This Program builds a Javascript file called bms_data.js with all relevant data ghathered from the BMS. That is then later fed to index-charts.js to generate Plots

# --------------------------Readme-------------------------


import csv
import os


try:
    os.remove("Dashboard/assets/js/bms_data.js") # block raising an exception
except:
    pass # doing nothing on exception

input_filename = 'Data_copy.csv'
output_filename = 'Data_copy.csv'

with open(input_filename, 'r', encoding='utf-8', errors='replace') as input_file:
    lines = input_file.readlines()

cleaned_lines = [line.replace('\x00', '') for line in lines]

with open(output_filename, 'w', encoding='utf-8') as output_file:
    output_file.writelines(cleaned_lines)


# Read the CSV file into a 2D array
with open('Data_copy.csv', 'r') as file:
    reader = csv.reader(file)
    data = list(reader)
    print(data)

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
var serial_number = [];
var trans_temp = [];

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
serial_number[i] = data[i][15]
trans_temp[i] = data[i][16];
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


