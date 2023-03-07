#include "BMSvariables.h"
#include <Wire.h>
#include <Adafruit_INA219.h>

Adafruit_INA219 ina219;


const int ledPin = 13; // the pin that the LED is attached to
int incomingByte;      // a variable to read incoming serial data into


#include "SparkFun_External_EEPROM.h"
ExternalEEPROM myMem;

String myRead2;
String serial_no = "Null";

void setup() {
  Serial.begin(9600);
  analogReference(EXTERNAL); // use AREF for reference voltage
  Wire.begin();
  if (myMem.begin() == false)
  {
    Serial.println("No memory detected. Freezing.");
    while (1)
      ;
  }
 

  serial_no = myMem.get(10, myRead2);




  pinMode(muxA, OUTPUT);
  pinMode(muxB, OUTPUT);
  pinMode(Bal_1, OUTPUT);
  pinMode(Bal_2, OUTPUT);
  pinMode(Discharge, OUTPUT);
  pinMode(Charge, OUTPUT);

  digitalWrite(Bal_1, LOW);
  digitalWrite(Bal_2, LOW);
  digitalWrite(Discharge, LOW);
  digitalWrite(Charge, LOW);
  pinMode(ledPin, OUTPUT);

  if (! ina219.begin()) {
    Serial.println("Failed to find INA219 current sensor chip");
    while (1) {
      delay(10);
    }
  }
  ina219.setCalibration_16V_400mA();
  //analogReference(INTERNAL);
}


void Bbal1() {
  digitalWrite(Bal_1, HIGH);
  cellOne_balaningState = 1;
  //  Serial.println("\t ");
  //  Serial.print("Battery 1 Balance on");
}
void Bbal2() {
  digitalWrite(Bal_2, HIGH);
  cellTwo_balaningState = 1;
  //  Serial.println("\t ");
  //  Serial.print("Battery 2 Balance on");
}
void charge() {
  digitalWrite(Charge, HIGH);
  chargingState = 1;
  //  Serial.println("\t ");
  //  Serial.print("Charging");
}
void discharge() {
  digitalWrite(Discharge, HIGH);
  dischargingState = 1;
  //  Serial.println("\t ");
  //  Serial.print("Discharging");
}

void resetBms() {
  digitalWrite(Bal_1, LOW);
  digitalWrite(Bal_2, LOW);
  digitalWrite(Charge, LOW);
  digitalWrite(Discharge, LOW);
  chargingState = 0;
  dischargingState = 0;
  cellOne_balaningState = 0;
  cellTwo_balaningState = 0;
}


void loop() {

  //  Serial.print("I read: ");

//  Serial.println(serial_no);


  //Data sent via serial UART to python
  //| 1  | Iteration                          |
  //| 2  | LM35                               |
  //| 3  | Environment/ board NTC temperature |
  //| 4  | Cell 1 Temperature                 |
  //| 5  | cell 2 temperature                 |
  //| 6  | cell 1 voltage                     |
  //| 7  | cell 2 voltage                     |
  //| 8  | pack voltage                       |
  //| 9  | charging state                     |
  //| 10 | discharging state                  |
  //| 11 | cell_1 Balancing                   |
  //| 12 | cell_2 Balancing                   |
  //| 13 | power                              |
  //| 14 | current                            |
  //| 15 | bus voltage                        |
  //| 16 |                                    |


  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    Serial.flush();
    //    Serial.println(incomingByte);
    // if it's a capital H (ASCII 72), turn on the LED:
    control();
    //    delay(1000);

  }
  else {
    temperature();
    delay(250);
    batt1_voltage();
    delay(250);
    batt2_voltage();
    delay(250);
    pack_Voltage();
    delay(250);
    current_sensor();
    delay(250);
    //

    Loop += 1;
    // CSV format sent to Python
    // Iteration, LM35,Environment/board NTC temperature,Cell 1 Temperature, cell 2 temperature, cell 1 voltage, cell 2 voltage, pack voltage, charging state,discharging state, cell_1 Balancing, Cell_2 Balancing,power,current,bus voltage,Student serial number

    Serial.println((String) Loop + "," +  Temperature_sensor + "," + Te + "," + Tb1 + "," + Tb2 + "," + voltage1 + "," + voltage2 + "," + totVoltage + "," + chargingState + "," + dischargingState + "," + cellOne_balaningState + "," + cellTwo_balaningState + "," + power_mW + "," + current_mA + "," + busvoltage + "," + serial_no);

  }


}
