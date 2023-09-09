 float batt_voltage() { 
  // Battery 1 voltage  --------------------------
  digitalWrite(muxA, LOW);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  float batt1 = sensorValue*2;
  voltage1 = (batt1 * (5.00 / 1023.00));

  // Battery 2 voltage -------------------------
  digitalWrite(muxA, HIGH);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  float batt2 = sensorValue*2;
  totVoltage  = (batt2 * (5.00 / 1023.00));
  
  voltage2 =(totVoltage-voltage1);// totVoltage - voltage1;
}
