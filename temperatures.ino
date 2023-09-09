void temperature() { // Temperature readings

  // DHT11 sensor code  ----------------------------------------
  Temperature_sensor = dht.readTemperature();

  // PCB environment NTC sensor  ----------------------------------------
  int thermistor_adc_val=0;
  double output_voltage, thermistor_resistance, therm_res_ln, temperature; 
  for (int i=0; i< NUMSAMPLES; i++) {
   thermistor_adc_val += analogRead(THERMISTORPIN);
   delay(10);
  }
  thermistor_adc_val /= NUMSAMPLES;
  output_voltage = ( (thermistor_adc_val * 5.0) / 1023.0 );
  thermistor_resistance = ( ( output_voltage / ( 5 - output_voltage ) ) * 10 ); /* Resistance in kilo ohms */
  thermistor_resistance = thermistor_resistance * 1000 ; /* Resistance in ohms   */
  therm_res_ln = log(thermistor_resistance);
  /*  Steinhart-Hart Thermistor Equation: */
  /*  Temperature in Kelvin = 1 / (A + B[ln(R)] + C[ln(R)]^3)   */
  /*  where A = 0.001129148, B = 0.000234125 and C = 8.76741*10^-8  */
  temperature = ( 1 / ( 0.001129148 + ( 0.000234125 * therm_res_ln ) + ( 0.0000000876741 * therm_res_ln * therm_res_ln * therm_res_ln ) ) ); /* Temperature in Kelvin */
  temperature = temperature - 273.15; /* Temperature in degree Celsius */
  //Serial.print((String) "Environment Temperature = " + temperature + "\t\t" + "Resistance in ohms = " + thermistor_resistance + "\n\n");
  Te = temperature ;
 


  // Battery 1 NTC sensor  ----------------------------------------
  digitalWrite(muxA, LOW);
  digitalWrite(muxB, LOW);
  thermistor_adc_val=0;
  for (int i=0; i< NUMSAMPLES; i++) {
   thermistor_adc_val += analogRead(muxOut);
   delay(10);
  }
  thermistor_adc_val /= NUMSAMPLES;
  output_voltage = ( (thermistor_adc_val * 5.0) / 1023.0 );
  thermistor_resistance = ( ( output_voltage / ( 5 - output_voltage ) ) * 10 ); /* Resistance in kilo ohms */
  thermistor_resistance = thermistor_resistance * 1000 ; /* Resistance in ohms   */
  therm_res_ln = log(thermistor_resistance);
  /*  Steinhart-Hart Thermistor Equation: */
  /*  Temperature in Kelvin = 1 / (A + B[ln(R)] + C[ln(R)]^3)   */
  /*  where A = 0.001129148, B = 0.000234125 and C = 8.76741*10^-8  */
  temperature = ( 1 / ( 0.001129148 + ( 0.000234125 * therm_res_ln ) + ( 0.0000000876741 * therm_res_ln * therm_res_ln * therm_res_ln ) ) ); /* Temperature in Kelvin */
  temperature = temperature - 273.15; /* Temperature in degree Celsius */
  //Serial.print((String) "Cell 1 Temperature = " + temperature + "\t\t" + "Resistance in ohms = " + thermistor_resistance + "\n\n");
  Tb1 = temperature ;


  // Battery 2 NTC sensor  ----------------------------------------
  digitalWrite(muxA, HIGH);
  digitalWrite(muxB, LOW);
  thermistor_adc_val=0;
  for (int i=0; i< NUMSAMPLES; i++) {
   thermistor_adc_val += analogRead(muxOut);
   delay(10);
  }
  thermistor_adc_val /= NUMSAMPLES;
  output_voltage = ( (thermistor_adc_val * 5.0) / 1023.0 );
  thermistor_resistance = ( ( output_voltage / ( 5 - output_voltage ) ) * 10 ); /* Resistance in kilo ohms */
  thermistor_resistance = thermistor_resistance * 1000 ; /* Resistance in ohms   */
  therm_res_ln = log(thermistor_resistance);
  /*  Steinhart-Hart Thermistor Equation: */
  /*  Temperature in Kelvin = 1 / (A + B[ln(R)] + C[ln(R)]^3)   */
  /*  where A = 0.001129148, B = 0.000234125 and C = 8.76741*10^-8  */
  temperature = ( 1 / ( 0.001129148 + ( 0.000234125 * therm_res_ln ) + ( 0.0000000876741 * therm_res_ln * therm_res_ln * therm_res_ln ) ) ); /* Temperature in Kelvin */
  temperature = temperature - 273.15; /* Temperature in degree Celsius */
  //Serial.print((String) "Cell 2 Temperature = " + temperature + "\t\t" + "Resistance in ohms = " + thermistor_resistance + "\n\n");
  Tb2 = temperature ;
  //Serial.println("");
  //Serial.println("");

  // Transistor NTC sensor  ----------------------------------------
  thermistor_adc_val=0;
  for (int i=0; i< NUMSAMPLES; i++) {
   thermistor_adc_val += analogRead(A7);
   delay(10);
  }
  thermistor_adc_val /= NUMSAMPLES;
  output_voltage = ( (thermistor_adc_val * 5.0) / 1023.0 );
  thermistor_resistance = ( ( output_voltage / ( 5 - output_voltage ) ) * 10 ); /* Resistance in kilo ohms */
  thermistor_resistance = thermistor_resistance * 1000 ; /* Resistance in ohms   */
  therm_res_ln = log(thermistor_resistance);
  /*  Steinhart-Hart Thermistor Equation: */
  /*  Temperature in Kelvin = 1 / (A + B[ln(R)] + C[ln(R)]^3)   */
  /*  where A = 0.001129148, B = 0.000234125 and C = 8.76741*10^-8  */
  temperature = ( 1 / ( 0.001129148 + ( 0.000234125 * therm_res_ln ) + ( 0.0000000876741 * therm_res_ln * therm_res_ln * therm_res_ln ) ) ); /* Temperature in Kelvin */
  temperature = temperature - 273.15; /* Temperature in degree Celsius */
  //Serial.print((String) "Environment Temperature = " + temperature + "\t\t" + "Resistance in ohms = " + thermistor_resistance + "\n\n");
  Tt = temperature ;

  
// /*
  //Calibration  ----------------------------------------
  //average_calibration += Te;
  average_calibration += Tt;
  if(Loop == 20){
    average_calibration /= 20;
    if(average_calibration > (Temperature_sensor+0.5)){
      //Calibration = average_calibration-Temperature_sensor ;
      Calibration = average_calibration-Temperature_sensor;
    }
    else if(average_calibration < (Temperature_sensor-0.5)){
      //Calibration = Temperature_sensor-average_calibration ;
      Calibration = Temperature_sensor-average_calibration;
    }
  }
  if(Te >= (Temperature_sensor+1)){
    Te = Te-Calibration;
    Tb2 = Tb2-Calibration;
    Tb1 = Tb1-Calibration;
    Tt = Tt-Calibration;
  }
  else if(Te <= (Temperature_sensor-1)){
    Te = Te+Calibration;
    Tb2 = Tb2+Calibration;
    Tb1 = Tb1+Calibration;
    Tt = Tt+Calibration;
  }
//   */  
  
}
