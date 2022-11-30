#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
#define sensorPower 7
#define sensorPin A0

int val = 0;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  pinMode(sensorPower, OUTPUT);
  digitalWrite(sensorPower, LOW);
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(30000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  
  int level = readSensor();
 
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(">>>water_level: ");
  Serial.print(level);
  Serial.print(">>>humidity: ");
  Serial.print(h);
  Serial.print(">>>temperature: ");
  Serial.println(t);
}

int readSensor() {
  digitalWrite(sensorPower, HIGH);
  delay(10);
  val = analogRead(sensorPin);
  digitalWrite(sensorPower, LOW);
  return val;
}
