#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#ifndef APSSID
#define APSSID "ESPap"
#define APPSK "thereisnospoon"
#endif

/* Set these to your desired credentials. */
const char *ssid = APSSID;
const char *password = APPSK;

ESP8266WebServer server(80);
void initialConnection(){
  server.send(200,"text/html","<h1>Ready for upload</h1>");
}
void checkConnection(){
server.send(200,"application/json","[{\"status\":\"connected\"}]");
}
void getData(){
  Serial.print("getData");//communicate with mega to send data
  while(Serial.available()<6){//will be receiving a json formatted string to be sent to  server, wait while threshold low
  }
  // after waiting, will have enough chars
  char* data; //initiate data json input
  while(Serial.available()){
    data+=Serial.read();
  }
  //after reading all
  server.send(200,"application/json",data);
}
void turnMotor(){//for motor on/off
  Serial.print("Motor");// "code" to mega to switch the motor, assume initially off
  while(Serial.available()<6){//will be receiving a json formatted string to be sent to  server, wait while threshold low
  }
  // after waiting, will have enough chars
  char* data; //initiate data json input
  while(Serial.available()){
    data+=Serial.read();
  }
  server.send(200,"application/json",data);//will return status of Motor
}
void setup() {
  delay(1000);
  Serial.begin(115200);//Serial for communication with mega
  WiFi.softAP(ssid, password);
  IPAddress myIP = WiFi.softAPIP();//since own wifi network, assume hardcoded 192.168.4.1
  server.on("/",initialConnection);
  server.on("/checkConnection",checkConnection);
  server.on("/getData",getData);
  server.on("/turnMotor",turnMotor);
  server.begin();

}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();
}
