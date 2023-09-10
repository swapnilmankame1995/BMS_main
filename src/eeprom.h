/***********************************************************************
* FILENAME: eeprom.h
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

#ifndef _EEPROM_H_
#define _EEPROM_H_

#ifdef ARDUINO
    #if ARDUINO < 100
        #include "WProgram.h"
    #else
        #include "Arduino.h"
    #endif
#endif // ARDUINO

#include <Wire.h>

class EEPROM {
    public:
        EEPROM(uint8_t address);

        bool begin(void);

        void write_byte(uint16_t address, byte data);
        byte read_byte(uint16_t address);
        void erase_byte(uint16_t address);
        void write_string(uint16_t address, byte* data_string, byte length);

    private:
        uint8_t _devAddress;

};

#endif // _EEPROM_H_
