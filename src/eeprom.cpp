/***********************************************************************
* FILENAME: eeprom.cpp
*
* DESCRIPTION:
*       Arduino library for the EEPROM memory 24LC256. 
*
* URL:  https://github.com/EL-LAB/EL-LAB_EEPROM_24LC256_Arduino_Library
* 
* AUTHOR:  Diego Villalobos    START DATE :  July 17 2018
*
* CHANGES:
*
* VERSION      DATE         WHO         DETAIL
*  1.0.0   July 17 2018   Diego V.      Initial release
*
***********************************************************************/

#include "eeprom.h"

EEPROM::EEPROM(uint8_t address) {
    _devAddress = address;   // I2C address.
}

bool EEPROM::begin(void) {
    Wire.begin();
    Wire.beginTransmission(_devAddress);
    return (Wire.endTransmission() == 0);
}

void EEPROM::write_byte(uint16_t address, byte data) {
    Wire.beginTransmission(_devAddress);
    Wire.write((byte) (address >> 8));      // High address byte.
    Wire.write((byte) (address & 0xFF));    // Low address byte.
    Wire.write(data);                       // Data byte.
    Wire.endTransmission();

    delay(5);    // Wait 5ms for the writing cycle to be complete.
}

byte EEPROM::read_byte(uint16_t address) {
    byte data = 0xFF;

    Wire.beginTransmission(_devAddress);
    Wire.write((byte) (address >> 8));      // High address byte.
    Wire.write((byte) (address & 0xFF));    // Low address byte
    Wire.endTransmission();

    Wire.requestFrom((int) _devAddress, (int) 1);
    if (Wire.available()) {
        data = Wire.read();
    }

    return data;
}

void EEPROM::erase_byte(uint16_t address) {
    write_byte(address, 0xFF);
}

// NOTE: It's not possible to write more than 30 bytes at the time 
//       because the Wire library has a 32 bytes buffer size.
void EEPROM::write_string(uint16_t address, byte* data_string, uint8_t length) {
    Wire.beginTransmission(_devAddress);
    Wire.write((byte) (address >> 8));      // High address byte.
    Wire.write((byte) (address & 0xFF));    // Low address byte.

    for (uint8_t c = 0; c < length; c++) {
        Wire.write(data_string[c]);         // Data byte.
    }

    Wire.endTransmission();

    delay(5);    // Wait 5ms for the writing cycle to be complete.
}
