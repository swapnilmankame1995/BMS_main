
float batt1_voltage() {

  digitalWrite(muxA, LOW);
  digitalWrite(muxB, LOW);
  sensorValue = analogRead(muxOut);
  float batt1 = sensorValue;
  voltage1 = batt1 * (5.00 / 1023.00);
//Serial.println((String)"batt1" + muxOut);
}

float batt2_voltage() {

//  digitalWrite(muxA, HIGH);
//  digitalWrite(muxB, LOW);
//  sensorValue = analogRead(muxOut);
//  float batt2 = sensorValue;
//  voltage2 = batt2 * (5.00 / 1023.00) * 2;
////Serial.println((String)"batt2" + muxOut);
////  Serial.print("\t| ");
////  Serial.print((String) "Bat 2 volt: " + voltage2 + (String) "v");

voltage2 = busvoltage - voltage1;



}

float pack_Voltage() {


   totVoltage = voltage1 + voltage2;
//
//  Serial.print((String) "Pack Volt: " + totVoltage + (String) "v");
//  delay(1000);
}
