#include <Arduino.h>
#include <WiFi.h>
#include "sensors.h"
#include "mqtt_client.h"

const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";

Sensors sensorModule;
MQTTManager mqtt("mqtt.agrimind.ai", 8883, "admin", "secret", "device_esp32_01");

unsigned long lastSensorRead = 0;
unsigned long lastHeartbeat = 0;
const long sensorInterval = 300000; // 5 minutes
const long heartbeatInterval = 60000; // 1 minute

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    
    sensorModule.begin();
    mqtt.connect();
}

void loop() {
    mqtt.loop();

    unsigned long currentMillis = millis();

    // Heartbeat
    if (currentMillis - lastHeartbeat >= heartbeatInterval) {
        lastHeartbeat = currentMillis;
        mqtt.publish("agrimind/farm_01/device_esp32_01/heartbeat", "{\"status\":\"online\"}");
    }

    // Sensor Readings
    if (currentMillis - lastSensorRead >= sensorInterval) {
        lastSensorRead = currentMillis;
        
        float t = sensorModule.readDHT22Temperature();
        float h = sensorModule.readDHT22Humidity();
        float s = sensorModule.readSoilMoisture();
        float p = sensorModule.readPH();
        float bat = sensorModule.readBattery();

        // Construct JSON
        String payload = "{";
        payload += "\"device_id\":\"device_esp32_01\",";
        payload += "\"battery_level\":" + String(bat) + ",";
        payload += "\"readings\":[";
        payload += "{\"sensor_type\":\"temperature\",\"value\":" + String(t) + ",\"unit\":\"C\"},";
        payload += "{\"sensor_type\":\"humidity\",\"value\":" + String(h) + ",\"unit\":\"%\"},";
        payload += "{\"sensor_type\":\"soil_moisture\",\"value\":" + String(s) + ",\"unit\":\"%\"},";
        payload += "{\"sensor_type\":\"ph\",\"value\":" + String(p) + ",\"unit\":\"\"}";
        payload += "]}";

        mqtt.publish("agrimind/farm_01/device_esp32_01/sensors", payload.c_str());
    }
}
