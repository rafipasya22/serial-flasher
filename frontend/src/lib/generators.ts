import * as Blockly from 'blockly'
import { arduinoGenerator, customDefinitions } from '../Blockly/generators/arduino'

// =====================================================
// Servo
// =====================================================

arduinoGenerator.forBlock['servo_declare'] = function (block) {
  const name = block.getFieldValue('NAME')

  customDefinitions['include_servo'] = `#include <Servo.h>`
  customDefinitions[`servo_${name}`] = `Servo ${name};`

  return ''
}

arduinoGenerator.forBlock['servo_attach'] = function (block) {
  const name = block.getFieldValue('NAME')
  const pin = block.getFieldValue('PIN')

  return `${name}.attach(${pin});\n`
}

arduinoGenerator.forBlock['servo_write'] = function (block) {
  const name = block.getFieldValue('NAME')
  const angle = block.getFieldValue('ANGLE')

  return `${name}.write(${angle});\n`
}

// =====================================================
// DHT
// =====================================================

arduinoGenerator.forBlock['dht_declare'] = function (block) {
  const name = block.getFieldValue('NAME')
  const pin = block.getFieldValue('PIN')
  const type = block.getFieldValue('TYPE')

  customDefinitions['include_dht'] = `#include <DHT.h>`
  customDefinitions[`dht_${name}`] = `DHT ${name}(${pin}, ${type});`

  return ''
}

arduinoGenerator.forBlock['dht_begin'] = function (block) {
  const name = block.getFieldValue('NAME')

  return `${name}.begin();\n`
}

arduinoGenerator.forBlock['dht_read_temp'] = function (block) {
  const name = block.getFieldValue('NAME')

  const code = `${name}.readTemperature()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

arduinoGenerator.forBlock['dht_read_humidity'] = function (block) {
  const name = block.getFieldValue('NAME')

  const code = `${name}.readHumidity()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// LiquidCrystal I2C
// =====================================================

arduinoGenerator.forBlock['lcd_declare'] = function (block) {
  const name = block.getFieldValue('NAME')
  const addr = block.getFieldValue('ADDR')
  const cols = block.getFieldValue('COLS')
  const rows = block.getFieldValue('ROWS')

  customDefinitions['include_lcd'] = `#include <LiquidCrystal_I2C.h>`
  customDefinitions[`lcd_${name}`] =
    `LiquidCrystal_I2C ${name}(${addr}, ${cols}, ${rows});`

  return ''
}

arduinoGenerator.forBlock['lcd_init'] = function (block) {
  const name = block.getFieldValue('NAME')

  return `${name}.init();\n${name}.backlight();\n`
}

arduinoGenerator.forBlock['lcd_print'] = function (block) {
  const name = block.getFieldValue('NAME')
  const text =
    arduinoGenerator.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC as any) ||
    '""'

  return `${name}.print(${text});\n`
}

arduinoGenerator.forBlock['lcd_clear'] = function (block) {
  const name = block.getFieldValue('NAME')

  return `${name}.clear();\n`
}

arduinoGenerator.forBlock['lcd_set_cursor'] = function (block) {
  const name = block.getFieldValue('NAME')
  const col = block.getFieldValue('COL')
  const row = block.getFieldValue('ROW')

  return `${name}.setCursor(${col}, ${row});\n`
}