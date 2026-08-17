#ifndef SENSORS_H
#define SENSORS_H

#include <Arduino.h>

class Sensors {
public:
    void begin() {
        // Init DHT, ADC, I2C etc.
    }

    float readSoilMoisture() {
        return (analogRead(34) / 4095.0) * 100.0; // Mock implementation
    }

    float readDHT22Temperature() {
        return 25.5; // Mock
    }

    float readDHT22Humidity() {
        return 60.2; // Mock
    }

    float readPH() {
        return 6.8; // Mock
    }

    float readRainfall() {
        return 0.0; // Mock
    }

    float readBattery() {
        return 4.2; // Mock Max LiPo
    }
};

#endif
