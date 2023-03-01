
import tkinter as tk
import tkinter.messagebox as tkMessageBox
from tkinter import ttk
import serial

import csv
import shutil
import webbrowser
import os

import serial.tools.list_ports

import time 


# -----------------------------Selecting com ports----------------------------------

ports = serial.tools.list_ports.comports()
serialObj = serial.Serial()

print(r"""
  _____             _ _  __ _          _   
 |  __ \           (_) |/ _(_)        | |  
 | |__) |   _ _ __  _| | |_ _ _ __ ___| |_ 
 |  ___/ | | | '_ \| | |  _| | '__/ __| __|
 | |   | |_| | |_) | | | | | | |  \__ \ |_ 
 |_|    \__,_| .__/|_|_|_| |_|_|  |___/\__|
             | |                           
             |_|                           
                    """)


availablePorts = len(ports)

print("\nAvailable COM Ports open in this PC....\n\n")

for i in ports:
    print(i)

COMport = input("\nType the COM port of your Arduino from the list above (Ex : COM6) and press enter...\n\n\n")
print("Selected " + COMport.upper())
ser = serial.Serial(COMport.upper(), 9600) 
print("Collecting Data from BMS...")
# -----------------------------Selecting com ports-----------------

window = tk.Tk()

window.title("Pupilfirst | Battery Management System Analytics")

p1 = tk.PhotoImage(file = 'icon.png')
  
# Setting icon of master window
window.iconphoto(False, p1)
window.geometry('1366x720')
window.maxsize(1366, 720) 

# -------------------------------------- Frames -----------------------------

frame_main = tk.LabelFrame(master=window, height= 720, width= 1366  ,text="Cell Data",relief= "groove")
frame_main.grid(row=0, column=0, padx=5, pady=10, columnspan=4)

frameS = tk.LabelFrame(master=frame_main, height= 50,width= 1350, text="System Details" ,relief= "groove")
frameS.grid(row=1, column=0, padx=5, pady=10, columnspan=12)
frameS.grid_propagate(0)

frame1 = tk.LabelFrame(master=frame_main,   height= 300, width= 665, text="CELL 1 Report" ,relief= "groove")
frame1.grid(row=2, column=0, padx=5, pady=10, columnspan=4)
frame1.grid_propagate(0)

frame2 = tk.LabelFrame(master=frame_main, height= 300,width= 665, text="CELL 2 Report" ,relief= "groove")
frame2.grid(row=2, column=6, padx=5, pady=10, columnspan=4)
frame2.grid_propagate(0)

frame3 = tk.LabelFrame(master=frame_main, height= 80,width= 1350, text="BMS Status" ,relief= "groove")
frame3.grid(row=4, column=0, padx=5, pady=10, columnspan=12)
frame3.grid_propagate(0)

frame4 = tk.LabelFrame(master=frame_main, height= 50,width= 1350, text="Analytics" ,relief= "groove")
frame4.grid(row=6, column=0, padx=5, pady=10, columnspan=12)
frame4.grid_propagate(0)

frame5 = tk.LabelFrame(master=frame_main, height= 50,width= 1350, text="Arduino Serial output" , relief=tk.SUNKEN , bg= "black" , foreground= "white" )
frame5.grid(row=8, column=0, padx=5, pady=10, columnspan=12)
frame5.grid_propagate(0)

# -------------------------------------- Frames -----------------------------

# -------------------------------------- Labels -----------------------------

#   Data sent via serial UART to python
#   | 0  | Iteration                          |
#   | 1  | LM35                               |
#   | 2  | Environment/ board NTC temperature |
#   | 3  | Cell 1 Temperature                 |
#   | 4  | cell 2 temperature                 |
#   | 5  | cell 1 voltage                     |
#   | 6  | cell 2 voltage                     |
#   | 7  | pack voltage                       |
#   | 8  | charging state                     |
#   | 9  | discharging state                  |
#   | 10 | cell_1 Balancing                   |
#   | 11 | cell_2 Balancing                   |
#   | 12 | power                              |
#   | 13 | current                            |
#   | 14 | bus voltage                        |



# -------------------------------------- BMS State -----------------------------


iteration = tk.Label(frameS, text="Time(seconds)" , width = 15, font=("Helvetica", 12))
iteration.grid(row=0, column=0 )

iteration_Out = tk.Label(frameS, text="N/A" , width = 10, font=("Helvetica", 12),relief=tk.RIDGE)
iteration_Out.grid(row=0, column=1)

LM35 = tk.Label(frameS, text = "Calibration temp" , width = 20, font=("Helvetica", 12))
LM35.grid(row=0, column=2, pady=2)

LM35_out = tk.Label(frameS, text = "N/A" , width = 10, font=("Helvetica", 12),relief=tk.RIDGE)
LM35_out.grid(row=0, column=3, pady=2)


ambient_temp = tk.Label(frameS, text = "Ambient Temperature" , width = 20, font=("Helvetica", 12))
ambient_temp.grid(row=0, column=4, pady=2)

ambient_temp_out = tk.Label(frameS, text = "N/A" , width = 10, font=("Helvetica", 12),relief=tk.RIDGE)
ambient_temp_out.grid(row=0, column=5, pady=2)


# -------------------------------------- BMS State -----------------------------

# -------------------------------------- CEll 1 Report -----------------------------

Cell_1_Temperature  = tk.Label(frame1, text = "Temperature (Cell 1)" , width = 20, font=("Helvetica", 20), anchor="w")
Cell_1_Temperature .grid(row=3, column=0, padx=5, pady= 15)

Cell_1_Temperature_out = tk.Label(frame1, text = "N/A" , width = 10, font=("Helvetica", 20),relief=tk.RIDGE)
Cell_1_Temperature_out.grid(row=3, column=1)

cell_1_voltage = tk.Label(frame1, text = "Voltage (Cell 1)" , width = 20, font=("Helvetica", 20), anchor="w")
cell_1_voltage.grid(row=4, column=0, pady=15)

cell_1_voltage_out = tk.Label(frame1, text = "N/A" , width = 10, font=("Helvetica", 20),relief=tk.RIDGE)
cell_1_voltage_out.grid(row=4, column=1)

cell_1_State = tk.Label(frame1, text = "Cell 1 State" , width = 20, font=("Helvetica", 20), anchor="w") #Balanced state = overcharged/undercharged/charging
cell_1_State.grid(row=5, column=0, pady=15)

cell_1_State_out = tk.Label(frame1, text = "N/A" , width = 15, font=("Helvetica", 20),relief=tk.RIDGE) #Balanced state = overcharged/undercharged/charging
cell_1_State_out.grid(row=5, column=1, pady=15)

cell_1_Balancing = tk.Label(frame1, text = "Balance State (Cell 1)" , width = 20, font=("Helvetica", 20), anchor="w") #Balanced state = Disabled/Balancing
cell_1_Balancing.grid(row=6, column=0, pady=15)

cell_1_Balancing_out = tk.Label(frame1, text = "N/A" , width = 15, font=("Helvetica", 20),relief=tk.RIDGE) #Balanced state = Disabled/Balancing
cell_1_Balancing_out.grid(row=6, column=1, pady=15)

# -------------------------------------- CEll 1 Report -----------------------------

# -------------------------------------- CEll 2 Report -----------------------------
cell_2_temperature = tk.Label(frame2, text = "Temperature (Cell 2)" , width = 20, font=("Helvetica", 20), anchor="w")
cell_2_temperature.grid(row=1, column=0,padx=10, pady= 15)

Cell_2_Temperature_out = tk.Label(frame2, text = "N/A" , width = 10, font=("Helvetica", 20),relief=tk.RIDGE)
Cell_2_Temperature_out.grid(row=1, column=1)

cell_2_voltage = tk.Label(frame2, text = "Voltage (Cell 2)" , width = 20, font=("Helvetica", 20), anchor="w")
cell_2_voltage.grid(row=2, column=0, pady= 15)

cell_2_voltage_out = tk.Label(frame2, text = "N/A" , width = 10, font=("Helvetica", 20),relief=tk.RIDGE)
cell_2_voltage_out.grid(row=2, column=1)

cell_2_State = tk.Label(frame2, text = "Cell 2 State" , width = 20, font=("Helvetica", 20), anchor="w") #Balanced state = overcharged/undercharged/charging
cell_2_State.grid(row=3, column=0, pady=15)

cell_2_State_out = tk.Label(frame2, text = "N/A" , width = 15, font=("Helvetica", 20),relief=tk.RIDGE) #Balanced state = overcharged/undercharged/charging
cell_2_State_out.grid(row=3, column=1, pady=15)

cell_2_Balancing = tk.Label(frame2, text = "Balance State (Cell 2)" , width = 20, font=("Helvetica", 20), anchor="w")
cell_2_Balancing.grid(row=4, column=0 ,  pady= 15)

cell_2_Balancing_out = tk.Label(frame2, text = "N/A" , width = 15, font=("Helvetica", 20),relief=tk.RIDGE) #Balanced state = overcharged/undercharged
cell_2_Balancing_out.grid(row=4, column=1, pady=15)

# -------------------------------------- CEll 2 Report-----------------------------

# -------------------------------------- Pack Report -----------------------------
pack_voltage = tk.Label(frame3, text = "Battery Pack Voltage" , width = 20 , font=("Helvetica", 10) , anchor="e") # Pack voltage
pack_voltage.grid(row=0, column=0)

pack_voltage_out = tk.Label(frame3, text = "N/A" , width = 10, font=("Helvetica", 10),relief=tk.RIDGE) 
pack_voltage_out.grid(row=0, column=1, pady=15)

charging_state = tk.Label(frame3, text = "Charging" , width = 20, font=("Helvetica", 10), anchor="e") #charging = on/off
charging_state.grid(row=0, column=2)

charging_state_out = tk.Label(frame3, text = "N/A" , width = 10, font=("Helvetica", 10),relief=tk.RIDGE) 
charging_state_out.grid(row=0, column=3, pady=15)


discharging_state = tk.Label(frame3, text = "Discharging" , width = 20, font=("Helvetica", 10), anchor="e") #discharging = on/off
discharging_state.grid(row=0, column=4)

discharging_state_out = tk.Label(frame3, text = "N/A" , width = 10, font=("Helvetica", 10),relief=tk.RIDGE) 
discharging_state_out.grid(row=0, column=5, pady=15)


current = tk.Label(frame3, text = "Current" , width = 20, font=("Helvetica", 10), anchor="e")
current.grid(row=0, column=6)

current_out = tk.Label(frame3, text = "N/A" , width = 10, font=("Helvetica", 10),relief=tk.RIDGE) 
current_out.grid(row=0, column=7, pady=15)


power = tk.Label(frame3, text = "Power [mW]" , width = 20, font=("Helvetica", 10), anchor="e")
power.grid(row=0, column=8)

power_out = tk.Label(frame3, text = "N/A" , width = 10, font=("Helvetica", 10),relief=tk.RIDGE) 
power_out.grid(row=0, column=9, pady=15)

Arduino_serial_out = tk.Label(frame5, text = "N/A" , font=("Helvetica", 10) , bg= "black" , foreground= "white" ) 
Arduino_serial_out.grid(row=0, column=9)


# -------------------------------------- Pack Report -----------------------------

# --------------------------------------  Buttons -----------------------------



try:
    os.remove("Data.csv") # block raising an exception
except:
    pass # doing nothing on exception
   



# --------------------------------------  Buttons -----------------------------
# ,c2_bG, b2_bg, c1_bg
# c2_bG = "white" 
# b2_bg = "white"



def update_data():
    

    
    try:
        data = ser.readline().decode().strip().split(',') # read and decode the serial data
        
    except:
        time.sleep(3) # Sleep for 3 seconds
        data = ser.readline().decode().strip().split(',') # read and decode the serial data
    b1_bg = "white"
    b2_bg = "white"
    c1_bG = "white"
    c2_bG = "white"
    charge_bg = "white"
    discharge_bg = "white"
    cState1 = "N/A"
    cState2 = "N/A"
    bState1 = "N/A"
    bState2 = "N/A"
    CHState = "N/A"
    DState = "N/A"
# --------------------Charge state------------------------
    # print(data)
    
    if float(data[5]) < 4.1:
        cState1 = "UnderCharged" #cState = charge state
        c1_bG = "yellow" # Textbox background colour
    elif float(data[5]) < 4.1:
        cState1 = "OverCharged" #cState = charge state
        c1_bG = "red" # Textbox background colour
    elif float(data[5]) == 4.1:
        cState1 = "Charged" #cState = charge state
        c1_bG = "green" # Textbox background colour

    if float(data[6]) < 4.1:
        cState2 = "UnderCharged" #cState = charge state
        c2_bG = "yellow" # Textbox background colour
    elif float(data[6]) < 4.1:
        cState2 = "OverCharged" #cState = charge state
        c2_bG = "red" # Textbox background colour
    elif float(data[6]) == 4.1:
        cState2 = "Charged" #cState = charge state
        c2_bG = "green" # Textbox background colour
# ---------------------------------------------------
# -------------------Balance State-----------------------

    if float(data[10]) == 0:
        bState1 = "Disabled" #bState = Balance state
        
    elif float(data[10]) == 1:
        bState1 = "Balancing" #bState = Balance state
        b1_bg = "orange" # Textbox background colour

    if float(data[11]) == 0:
        bState2 = "Disabled" #bState = Balance state
    elif float(data[11]) == 1:
        bState2 = "Balancing" #bState = Balance state
        b2_bg = "orange" # Textbox background colour

# ---------------------------------------------------

# -------------------BMS State -----------------------


    if float(data[8]) == 0:
        CHState = "Disabled" #CHState = charge transistor state
        # ser.write(bytes("1", 'utf-8'))
        
    elif float(data[8]) == 1:
        CHState = "Enabled" #bState = Balance state
        charge_bg = "green" # Textbox background colour

    if float(data[9]) == 0:
        DState = "Disabled" #DState = discharge transistor state
    elif float(data[9]) == 1:
        DState = "Enabled" #bState = Balance state
        discharge_bg = "green" # Textbox background col

# ---------------------------------------------------



    iteration_Out.config(text=data[0])
    LM35_out.config(text=data[1])
    ambient_temp_out.config(text=data[2])
    Cell_1_Temperature_out.config(text=data[3])
    cell_1_voltage_out.config(text=data[5])
    cell_1_Balancing_out.config( text=bState1 , bg= b1_bg )
    Cell_2_Temperature_out.config(text=data[4])
    cell_2_voltage_out.config(text=data[6])
    cell_2_Balancing_out.config(text=bState2 , bg= b2_bg)
    pack_voltage_out.config(text=data[14])
    charging_state_out.config(text=CHState , bg=charge_bg)
    discharging_state_out.config(text=DState , bg= discharge_bg)
    current_out.config(text=data[13])
    power_out.config(text=data[12])
    cell_1_State_out.config(text=cState1 , bg=c1_bG)
    cell_2_State_out.config(text=cState2 , bg=c2_bG)
    Arduino_serial_out.config(text=data )
    

    with open('Data.csv', 'a', newline='') as csvfile:
        serialData = csv.writer(csvfile, delimiter=',')
        serialData.writerow([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14]])
    # csvfile.close
    
    print("Total time : " + data[0] + " Seconds", end='\r')


    window.after(1000, update_data) # call the function again after 1 second
    def analyticsCallBack():
        csvfile.close
        shutil.copy('Data.csv', 'Data_copy.csv')
        exec(open('Javascript_generate.py').read())
        
        webbrowser.open_new_tab('Dashboard\index.html')

    Js_analytics = tk.Button(frame4, text ="Plot Graphs", command = analyticsCallBack , width = 30, font=("Helvetica", 10), anchor="c")
    Js_analytics.grid(row=0, column=0, padx=20)
    # ser.write(bytes("3", 'utf-8'))
     
    import control

    control.control_algorithm(data,ser)
    control.data = data
    control.ser = ser


window.after(1000, update_data)


# window.after(2000, window.focus_force)

window.mainloop()