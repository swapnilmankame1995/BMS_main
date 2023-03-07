
import tkinter as tk
import tkinter.messagebox as tkMessageBox
from tkinter import ttk
import serial

import csv
import shutil
import webbrowser
import os

import serial.tools.list_ports

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



try:
    COMport = input("\nType the COM port of your Arduino from the list above (Ex : COM6) and press enter...\n\n\n")
    print("Selected " + COMport.upper())
    ser = serial.Serial(COMport.upper(), 9600, timeout=10) # block raising an exception
except:
    COMport = input("\n Wrong selected COM port of your Arduino from the list above (Ex : COM6) and press enter...\n\n\n")
    print("Selected " + COMport.upper())
    ser = serial.Serial(COMport.upper(), 9600, timeout=10) # block raising an exception
    
print(ser.readline().decode().strip().split(',')) 