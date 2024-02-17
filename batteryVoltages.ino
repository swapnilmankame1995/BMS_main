 float batt_voltage() { 
  // Battery 1 voltage  --------------------------
  digitalWrite(muxA, LOW);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  float batt1 = sensorValue;
  voltage1 = (batt1 * (5.00 / 1023.00) * 2);

  // Battery 2 voltage -------------------------
  digitalWrite(muxA, HIGH);
  digitalWrite(muxB, HIGH);
  sensorValue = analogRead(muxOut);
  float batt2 = sensorValue;
  totVoltage  = (batt2 * (5.00 / 1023.00) * 2);
  
  voltage2 =(busvoltage-voltage1);
}
