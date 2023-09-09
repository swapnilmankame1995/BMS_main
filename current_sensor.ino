void current_sensor() { // Current and output voltage readings.


shuntvoltage = ina219.getShuntVoltage_mV();
busvoltage = ina219.getBusVoltage_V(); // Voltage output
current_mA = ina219.getCurrent_mA();
power_mW = ina219.getPower_mW();
loadvoltage = busvoltage + (shuntvoltage / 1000); // Voltage from the batteries



}
