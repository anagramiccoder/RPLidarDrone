int motorStatus=0;//initial motor off
void setup() {
  // put your setup code here, to run once:
  delay(2000);//for ddebugging purposes
  Serial.begin(115200);//for debugging purposes
  Serial3.begin(115200);//serial comms with wifi
  int timeout=400;//max retry for connection
  while(!Serial3){
    timeout-=1;
    delay(5)
    if(timeout<0){
      Serial.println("Timeout, please restart");
      while(1){}//loop forever till restart
    }
  }
  Serial.println("connected");//passing here means connection success
  //inputs  will be here
  pinMode(3, OUTPUT);//motor

}

void loop() {
  // put your main code here, to run repeatedly:
  while (!Serial3.available()){
}
  String rcvdData;
  if(Serial3.available()){//exhaust all chars
  rcvdData=Serial3.readString();
  }
  Serial.print("Data received:");
  Serial.println(rcvdData);
  Serial.print("length:");
  Serial.println(rcvdData.length());
  if(rcvdData.indexOf("Motor")>-1){//do the motor Stuff
    Serial.println("Motor command");
    digitalWrite(3,motorStatus);
    motorStatus=!motorStatus;//switch
    String data="{";
    //set data in json format
    data+="\"Status\":\"OK\",";
    data+="\"motor\":";
    data+=motorStatus;

    //end data 
    data+="}";
    Serial.println(data);
    Serial3.print(data);//send current motor status to esp8266, to be sent to server
  }
  else if(rcvdData.indexOf("getData")>-1){//do get data
    //gather data
    Serial.println("getData Command");
    String data="{";
    //set data in json format
    data+="\"Status\":\"OK\"";
    //end data 
    data+="}";
    Serial.println(data);
    Serial3.print(data);//send data to esp8266
  }
}
