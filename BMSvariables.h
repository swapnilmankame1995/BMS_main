
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
void control(void);

//NTC sensor AND temperature ----------------------------------- https://learn.adafruit.com/thermistor/using-a-thermistor

int NUMSAMPLES = 10 ;
float Te,Tb1,Tb2,Tt;
float average_calibration = 0;


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
int Contactor = 10;
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
