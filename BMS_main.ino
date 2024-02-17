// Personal code
#include <math.h>
#include "BMSvariables.h"
#include <Wire.h>
#include <Adafruit_INA219.h>       //Install Adafruit INA219 library from manage library
#include "DHT.h"                 //Install DHT sensor library by Adafruit from manage library

#define THERMISTORPIN A3          // Analog pin connected to environment NTC sensor 
#define DHTPIN 11               // Analog pin connected to DHT11 sensor 
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
Adafruit_INA219 ina219;

int incomingByte;      // a variable to read incoming serial data into

byte eepromByte;


#include "src/eeprom.h"

EEPROM myEEPROM(0x50); // I2C address.

//#include "SparkFun_External_EEPROM.h"

String serial_no ;

void resetBms() {
  digitalWrite(Bal_1, LOW);
  digitalWrite(Bal_2, LOW);
  digitalWrite(Charge, LOW);
  digitalWrite(Discharge, LOW);
  digitalWrite(Contactor, HIGH);
  chargingState = 0;
  dischargingState = 0;
  cellOne_balaningState = 0;
  cellTwo_balaningState = 0;
}
void setup() {
  Serial.begin(9600);
  //analogReference(EXTERNAL); // use AREF for reference voltage
  Wire.begin();
 // ----------------- EEPROM Read --------------
  myEEPROM.begin();
  for (uint16_t address = 0x0000; address < 10; address++) {
    
    serial_no += char(myEEPROM.read_byte(address));
  }
// ----------------- EEPROM Read --------------

  pinMode(muxA, OUTPUT);
  pinMode(muxB, OUTPUT);
  pinMode(Bal_1, OUTPUT);
  pinMode(Bal_2, OUTPUT);
  pinMode(Discharge, OUTPUT);
  pinMode(Charge, OUTPUT);
  pinMode(Contactor, OUTPUT);

  digitalWrite(Bal_1, LOW);
  digitalWrite(Bal_2, LOW);
  digitalWrite(Discharge, LOW);
  digitalWrite(Charge, LOW);
  digitalWrite(Contactor, HIGH);

  dht.begin();
  if (! ina219.begin()) {
    Serial.println("Failed to find INA219 current sensor chip");
    while (1) {
      delay(10);
    }
  }
  //ina219.setCalibration_16V_400mA();
  //resetBms();
}


void Bbal1() {
  digitalWrite(Bal_1, HIGH);
  cellOne_balaningState = 1; // Battery 1 Balance on

}
void Bbal2() {
  digitalWrite(Bal_2, HIGH);
  cellTwo_balaningState = 1; //Battery 2 Balance on

}
void charge() {
  //if (voltage1 < 4 || voltage2 < 4){
  digitalWrite(Charge, HIGH);
  chargingState = 1; //Charging
  }

void discharge() {
  digitalWrite(Discharge, HIGH);
  dischargingState = 1; //Discharging
  digitalWrite(Contactor, LOW);
}

void I2C() {   //I2c communication -------------------------
    Wire.beginTransmission(4); // transmit to device #4
    
    //-----------Logic---------- (write your own logic here)
    if(totVoltage < 10 || Tb1 > 38 || Tb2 > 38)
      Wire.write(0);     // Send "0" if total battery pack voltage less than 5.6V and temperature is above 38 degrees
    else
      Wire.write(1); // Send "1" if total battery pack voltage and temperature is normal 
    //-----------Logic---------- 
    
    Wire.endTransmission();    // stop transmitting
}



void loop() {

  //Data sent via serial UART to python
  //| 1  | Iteration                          |
  //| 2  | DHT11                              |
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
  //| 16 | PCB serial numner                  |
  //| 17 | Transistor NTC temperature         |


    if (Serial.available() > 0) {
      incomingByte = Serial.read();
      Serial.flush();
      control();
    }
    temperature();
    delay(100);
    current_sensor();
    delay(100);
    batt_voltage();
    delay(100);
    Loop += 1;
    delay(400);
    I2C();
    // CSV format sent to Python
    // Iteration, LM35,Environment/board NTC temperature,Cell 1 Temperature, cell 2 temperature, cell 1 voltage, cell 2 voltage, pack voltage, charging state,discharging state, cell_1 Balancing, Cell_2 Balancing,power,current,bus voltage,Student serial number,Transistor NTC temperature
    Serial.println((String) Loop + "," +  Temperature_sensor + "," + Te + "," + Tb1 + "," + Tb2 + "," + voltage1 + "," + voltage2 + "," + busvoltage + "," + chargingState + "," + dischargingState + "," + cellOne_balaningState + "," + cellTwo_balaningState + "," + power_mW + "," + current_mA + "," + busvoltage + "," + serial_no + "," + Tt);
}
