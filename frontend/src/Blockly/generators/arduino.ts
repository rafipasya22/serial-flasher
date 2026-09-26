import * as Blockly from 'blockly'

export const arduinoGenerator = new Blockly.Generator('Arduino')

// =====================================================
// SETUP
// =====================================================

arduinoGenerator.forBlock['arduino_setup'] = function (block) {
  const code = arduinoGenerator.statementToCode(block, 'CODE')

  return `void setup() {\n${code}}\n\n`
}

// =====================================================
// LOOP
// =====================================================

arduinoGenerator.forBlock['arduino_loop'] = function (block) {
  const code = arduinoGenerator.statementToCode(block, 'CODE')

  return `void loop() {\n${code}}\n`
}

// =====================================================
// pinMode()
// =====================================================

arduinoGenerator.forBlock['arduino_pin_mode'] = function (block) {
  const pin = block.getFieldValue('PIN')
  const mode = block.getFieldValue('MODE')

  return `pinMode(${pin}, ${mode});\n`
}

// =====================================================
// digitalWrite()
// =====================================================

arduinoGenerator.forBlock['arduino_digital_write'] = function (block) {
  const pin = block.getFieldValue('PIN')
  const state = block.getFieldValue('STATE')

  return `digitalWrite(${pin}, ${state});\n`
}

// =====================================================
// digitalRead()
// =====================================================

arduinoGenerator.forBlock['arduino_digital_read'] = function (block) {
  const pin = block.getFieldValue('PIN')

  const code = `digitalRead(${pin})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// analogRead()
// =====================================================

arduinoGenerator.forBlock['arduino_analog_read'] = function (block) {
  const pin = block.getFieldValue('PIN')

  const code = `analogRead(${pin})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// analogWrite()
// =====================================================

arduinoGenerator.forBlock['arduino_analog_write'] = function (block) {
  const pin = block.getFieldValue('PIN')
  const value = block.getFieldValue('VALUE')

  return `analogWrite(${pin}, ${value});\n`
}

// =====================================================
// delay()
// =====================================================

arduinoGenerator.forBlock['arduino_delay'] = function (block) {
  const time = block.getFieldValue('TIME')

  return `delay(${time});\n`
}

// =====================================================
// delayMicroseconds()
// =====================================================

arduinoGenerator.forBlock['arduino_delay_microseconds'] = function (block) {
  const time = block.getFieldValue('TIME')

  return `delayMicroseconds(${time});\n`
}

// =====================================================
// millis()
// =====================================================

arduinoGenerator.forBlock['arduino_millis'] = function () {
  const code = `millis()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// micros()
// =====================================================

arduinoGenerator.forBlock['arduino_micros'] = function () {
  const code = `micros()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// tone()
// =====================================================

arduinoGenerator.forBlock['arduino_tone'] = function (block) {
  const pin = block.getFieldValue('PIN')
  const freq = block.getFieldValue('FREQ')

  return `tone(${pin}, ${freq});\n`
}

// =====================================================
// noTone()
// =====================================================

arduinoGenerator.forBlock['arduino_no_tone'] = function (block) {
  const pin = block.getFieldValue('PIN')

  return `noTone(${pin});\n`
}

// =====================================================
// map()
// =====================================================

arduinoGenerator.forBlock['arduino_map'] = function (block) {
  const value = arduinoGenerator.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const fromLow = arduinoGenerator.valueToCode(block, 'FROM_LOW', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const fromHigh = arduinoGenerator.valueToCode(block, 'FROM_HIGH', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const toLow = arduinoGenerator.valueToCode(block, 'TO_LOW', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const toHigh = arduinoGenerator.valueToCode(block, 'TO_HIGH', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'

  const code = `map(${value}, ${fromLow}, ${fromHigh}, ${toLow}, ${toHigh})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// constrain()
// =====================================================

arduinoGenerator.forBlock['arduino_constrain'] = function (block) {
  const value = arduinoGenerator.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const low = arduinoGenerator.valueToCode(block, 'LOW', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'
  const high = arduinoGenerator.valueToCode(block, 'HIGH', Blockly.JavaScript.ORDER_ATOMIC as any) || '0'

  const code = `constrain(${value}, ${low}, ${high})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// HIGH / LOW constant value
// =====================================================

arduinoGenerator.forBlock['arduino_pin_state_value'] = function (block) {
  const state = block.getFieldValue('STATE')

  return [state, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// Serial.begin()
// =====================================================

arduinoGenerator.forBlock['arduino_serial_begin'] = function (block) {
  const baud = block.getFieldValue('BAUD')

  return `Serial.begin(${baud});\n`
}

// =====================================================
// Serial.print() / Serial.println()
// =====================================================

arduinoGenerator.forBlock['arduino_serial_print'] = function (block) {
  const mode = block.getFieldValue('MODE')
  const text = arduinoGenerator.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC as any) || '""'

  const method = mode === 'PRINTLN' ? 'println' : 'print'
  return `Serial.${method}(${text});\n`
}

// =====================================================
// Serial.available()
// =====================================================

arduinoGenerator.forBlock['arduino_serial_available'] = function () {
  const code = `Serial.available()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// Serial.read()
// =====================================================

arduinoGenerator.forBlock['arduino_serial_read'] = function () {
  const code = `Serial.read()`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// pulseIn()
// =====================================================

arduinoGenerator.forBlock['arduino_pulse_in'] = function (block) {
  const pin = block.getFieldValue('PIN')
  const state = block.getFieldValue('STATE')

  const code = `pulseIn(${pin}, ${state})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC as any]
}

// =====================================================
// Comment / raw code line
// =====================================================

arduinoGenerator.forBlock['arduino_comment'] = function (block) {
  const text = block.getFieldValue('TEXT')

  return `// ${text}\n`
}

// =====================================================
// Handle blocks connected vertically
// =====================================================

arduinoGenerator.scrub_ = function (
  block: Blockly.Block,
  code: string,
  thisOnly?: boolean
) {
  const nextBlock = block.nextConnection?.targetBlock()

  if (nextBlock && !thisOnly) {
    return code + arduinoGenerator.blockToCode(nextBlock)
  }

  return code
}

export let customDefinitions: Record<string, string> = {}

const originalWorkspaceToCode = arduinoGenerator.workspaceToCode.bind(arduinoGenerator)

arduinoGenerator.workspaceToCode = function (workspace) {
  customDefinitions = {}

  const code = originalWorkspaceToCode(workspace)

  const defs = Object.values(customDefinitions).join('\n')

  console.log('[arduino-gen] collected definitions:', customDefinitions)

  return defs ? `${defs}\n\n${code}` : code
}