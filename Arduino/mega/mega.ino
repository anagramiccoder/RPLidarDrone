int motorStatus=0;//initial motor off
void setup() {
  // put your setup code here, to run once:
  delay(2000);//for ddebugging purposes
  Serial.begin(9600);//for debugging purposes
  Serial3.begin(115200);//serial comms with wifi
  int timeout=11;//max retry for connection
  while(!Serial3){
    timeout-=1;
    if(timeout<0){
      Serial.println("Timeout, please restart");
      while(1){}//loop forever till restart
    }
  }//passing here means connection success
  //inputs  will be here
  pinMode(3, OUTPUT);//motor

}

void loop() {
  // put your main code here, to run repeatedly:
  while (Serial3.available()<5){}//wait till data sent, "Motor" is the smallest possible so wait till there are at least 5 chars
  char* rcvdData;
  while(Serial3.available()>0){//exhaust all chars
    rcvdData+=Serial3.read();
  }
  if(strcmp(rcvdData,"Motor")==0){//do the motor Stuff
    digitalWrite(3,motorStatus);
    motorStatus=!motorStatus;//switch
    Serial3.print(motorStatus);//send current motor status to esp8266, to be sent to server
  }
  else if(strcmp(rcvdData,"getDa")==0){//do get data
    //gather data
    char* data="[";
    //set data in json format
    data+='{"Status":"OK"';
    //end data 
    data+='}]';
    Serial3.print(data);//send data to esp8266
  }
}
