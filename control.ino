
void control(){

switch (incomingByte) {
  case 49:
    resetBms();
    charge();
    break;
  case 50:
    resetBms();
    discharge();
    break;
  case 51:
    resetBms();
    Bbal1();
    break;
  case 52:
    resetBms();
    Bbal2();
    break;
  case 53:
    resetBms();
    
    break;
}
}
