
float ch0(void);
float ch1(void);
void ch3(void);
void temperature(void);
float Temperature_sensor;
void Bbal1(void);
void Bbal2(void);
void charge(void);
void discharge(void);
void resetBms(void);



//const int lm35_pin = A1;  /* LM35 O/P pin */

//NTC sensor AND temperature -----------------------------------
int ThermistorPin = 0;
int Vo;
float R1 = 10000;
float logR2, R2, T, Te, Tb1,Tb2;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;


// Calculate Voltage -----------------------------------
int  muxA = 5;
int  muxB = 6;
int  muxOut = A0;
int sensorValue = 0;
float voltage1 = 0;
float voltage2 = 0;
float totVoltage = 0;

// BMS Control -----------------------------------
int Bal_1 = 8;
int Bal_2 = 7;
int Discharge = 4;
int Charge = 3;
int Loop =0;
float Calibration = 0;
bool chargingState = 0;
bool dischargingState = 0;
bool cellOne_balaningState = 0;
bool cellTwo_balaningState =0;


//Current sensor -----------------------------------
float shuntvoltage = 0;
float busvoltage = 0;
float current_mA = 0;
float loadvoltage = 0;
float power_mW = 0;
