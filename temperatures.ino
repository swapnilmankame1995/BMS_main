void temperature() { // Temperature readings
  
  // LM35 sensor reading
  float rawTemperature = analogRead(A2);
  float mv = (rawTemperature / 1024.0) * 5000;
  Temperature_sensor = mv / 10;
//Serial.println(Temperature_sensor);

  
  // PCB environment NTC sensor
  sensorValue = analogRead(A3);
  R2 = R1 * (1023.0 / (float)sensorValue - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Te = T - 273.15; 
//Serial.println(Te);




  // Battery 1 NTC sensor
  digitalWrite(muxA, LOW);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  R2 = R1 * (1023.0 / (float)sensorValue - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tb1 = T - 273.15; 



  
  // Battery 2 NTC sensor
  digitalWrite(muxA, HIGH);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  R2 = R1 * (1023.0 / (float)sensorValue - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tb2 = T - 273.15; 

//  //Calibration
//  if(Loop%10 == 0){
//  if(Te > (Temperature_sensor+1)){
//    Calibration = Te-Temperature_sensor ;
//  }
//  else if(Te < (Temperature_sensor-1)){
//    Calibration = Temperature_sensor-Te ;
//  }
//  }
//  if(Te > (Temperature_sensor+1)){
////    Te = Te-Calibration;
//    Tb1 = Tb1-Calibration;
//    Tb2 = Tb2-Calibration;
//  }
//  else if(Te < (Temperature_sensor-1)){
////    Te = Te+Calibration;
//    Tb1 = Tb1+Calibration;
//    Tb2 = Tb2+Calibration;
//  }



  
}
