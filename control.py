def control_algorithm(data,ser):

    iteration = float(data[0])
    Ambient_temperature = float(data[1])
    cell_1_temperature  = float(data[3])
    cell_2_temperature  = float(data[4])
    current  = float(data[13])
    pack_voltage = float(data[14])
    cell_1_voltage  = float(data[5])
    cell_2_voltage  = float(data[6])
    current = float(data[13])
    power = float(data[12])


    def charge():
        ser.write(bytes("1", 'utf-8'))
        print("\nCharging....\n", end='\r')
    def Discharge():
        ser.write(bytes("2", 'utf-8'))
        print("\ndischarging....\n", end='\r')
    def Balance_1():
        ser.write(bytes("3", 'utf-8'))
        print("\nBalancing cell 1....\n", end='\r')
    def Balance_2():
        ser.write(bytes("4", 'utf-8'))
        print("\nBalancing cell 2\n", end='\r')
    def stop():
        ser.write(bytes("5", 'utf-8'))
        print("\nMonitoring...\n", end='\r')

# -----------------------------------Add Your Code/Algorithm here ----------------

# Instructions
        ## cell_1_voltage =  Voltage of Cell number 1
        ## cell_2_voltage =  Voltage of Cell number 2
        ## pack_voltage = Voltage of the entire battery pack (cell 1 + cell 2)

        ## Balance_1 = Switch on balancing for cell 1
        ## Balance_2 = Switch on balancing for cell 2

        ## charge = Switch on Charging
        ## discharge = Switch on Discharging

        ## Stop = Stop all operations

        ## ambient_temperature = Room temperature value


        ## cell_1_temperature =  temperature of Cell number 1
        ## cell_2_temperature =  temperature of Cell number 2

        ## current = Total current passing through the circuit




    if iteration == 10:
        charge()
    elif iteration == 15:
        Discharge()
    elif iteration == 20:
        Balance_1()
    elif iteration == 25:
        Balance_2()
    elif iteration == 30:
        stop()

# ----------------------------------- Your Code/Algorithm here ----------------


    # if pack_voltage <= 5.5 :
    #     charge()
    # elif cell_1_voltage =< :
    #     Discharge()
    # elif iteration == 20:
    #     Balance_1()
    # elif iteration == 25:
    #     Balance_2()
    # elif pack_voltage <= 6.4:
    #     stop()
