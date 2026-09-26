import * as Blockly from 'blockly'

// =====================================================
// SETUP
// =====================================================

Blockly.Blocks['arduino_setup'] = {
  init() {
    this.appendDummyInput()
      .appendField('SETUP')

    this.appendStatementInput('CODE')
      .setCheck(null)

    this.setColour(120)

    this.setTooltip('Code that runs once when the board starts')
  },
}

// =====================================================
// LOOP
// =====================================================

Blockly.Blocks['arduino_loop'] = {
  init() {
    this.appendDummyInput()
      .appendField('LOOP')

    this.appendStatementInput('CODE')
      .setCheck(null)

    this.setColour(120)

    this.setTooltip('Code that runs repeatedly')
  },
}

// =====================================================
// pinMode()
// =====================================================

Blockly.Blocks['arduino_pin_mode'] = {
  init() {
    this.appendDummyInput()
      .appendField('set pin')
      .appendField(
        new Blockly.FieldNumber(13, 0, 39, 1),
        'PIN'
      )
      .appendField('as')
      .appendField(
        new Blockly.FieldDropdown([
          ['OUTPUT', 'OUTPUT'],
          ['INPUT', 'INPUT'],
          ['INPUT_PULLUP', 'INPUT_PULLUP'],
        ]),
        'MODE'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(230)

    this.setTooltip('Configure an Arduino/ESP pin mode')
  },
}

// =====================================================
// digitalWrite()
// =====================================================

Blockly.Blocks['arduino_digital_write'] = {
  init() {
    this.appendDummyInput()
      .appendField('set digital pin')
      .appendField(
        new Blockly.FieldNumber(13, 0, 39, 1),
        'PIN'
      )
      .appendField('to')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'HIGH'],
          ['LOW', 'LOW'],
        ]),
        'STATE'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(230)

    this.setTooltip('Set a digital pin HIGH or LOW')
  },
}

// =====================================================
// digitalRead()
// =====================================================

Blockly.Blocks['arduino_digital_read'] = {
  init() {
    this.appendDummyInput()
      .appendField('digital read pin')
      .appendField(
        new Blockly.FieldNumber(13, 0, 39, 1),
        'PIN'
      )

    this.setOutput(true, 'Boolean')

    this.setColour(230)

    this.setTooltip('Read a digital pin value (HIGH/LOW)')
  },
}

// =====================================================
// analogRead()
// =====================================================

Blockly.Blocks['arduino_analog_read'] = {
  init() {
    this.appendDummyInput()
      .appendField('analog read pin')
      .appendField(
        new Blockly.FieldNumber(0, 0, 39, 1),
        'PIN'
      )

    this.setOutput(true, 'Number')

    this.setColour(230)

    this.setTooltip('Read an analog pin value (0-1023)')
  },
}

// =====================================================
// analogWrite()
// =====================================================

Blockly.Blocks['arduino_analog_write'] = {
  init() {
    this.appendDummyInput()
      .appendField('set analog pin')
      .appendField(
        new Blockly.FieldNumber(9, 0, 39, 1),
        'PIN'
      )
      .appendField('to')
      .appendField(
        new Blockly.FieldNumber(0, 0, 255, 1),
        'VALUE'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(230)

    this.setTooltip('Write a PWM value (0-255) to an analog pin')
  },
}

// =====================================================
// delay()
// =====================================================

Blockly.Blocks['arduino_delay'] = {
  init() {
    this.appendDummyInput()
      .appendField('wait')
      .appendField(
        new Blockly.FieldNumber(1000, 0, 60000, 1),
        'TIME'
      )
      .appendField('milliseconds')

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(230)

    this.setTooltip('Pause the program')
  },
}

// =====================================================
// delayMicroseconds()
// =====================================================

Blockly.Blocks['arduino_delay_microseconds'] = {
  init() {
    this.appendDummyInput()
      .appendField('wait')
      .appendField(
        new Blockly.FieldNumber(1000, 0, 1000000, 1),
        'TIME'
      )
      .appendField('microseconds')

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(230)

    this.setTooltip('Pause the program (microsecond precision)')
  },
}

// =====================================================
// millis()
// =====================================================

Blockly.Blocks['arduino_millis'] = {
  init() {
    this.appendDummyInput()
      .appendField('millis()')

    this.setOutput(true, 'Number')

    this.setColour(230)

    this.setTooltip('Milliseconds since the board started running')
  },
}

// =====================================================
// micros()
// =====================================================

Blockly.Blocks['arduino_micros'] = {
  init() {
    this.appendDummyInput()
      .appendField('micros()')

    this.setOutput(true, 'Number')

    this.setColour(230)

    this.setTooltip('Microseconds since the board started running')
  },
}

// =====================================================
// tone()
// =====================================================

Blockly.Blocks['arduino_tone'] = {
  init() {
    this.appendDummyInput()
      .appendField('tone on pin')
      .appendField(
        new Blockly.FieldNumber(9, 0, 39, 1),
        'PIN'
      )
      .appendField('frequency')
      .appendField(
        new Blockly.FieldNumber(440, 0, 65535, 1),
        'FREQ'
      )
      .appendField('Hz')

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(160)

    this.setTooltip('Generate a square wave tone on a pin')
  },
}

// =====================================================
// noTone()
// =====================================================

Blockly.Blocks['arduino_no_tone'] = {
  init() {
    this.appendDummyInput()
      .appendField('stop tone on pin')
      .appendField(
        new Blockly.FieldNumber(9, 0, 39, 1),
        'PIN'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(160)

    this.setTooltip('Stop generating a tone on a pin')
  },
}

// =====================================================
// map()
// =====================================================

Blockly.Blocks['arduino_map'] = {
  init() {
    this.appendValueInput('VALUE')
      .setCheck('Number')
      .appendField('map')

    this.appendValueInput('FROM_LOW')
      .setCheck('Number')
      .appendField('from')

    this.appendValueInput('FROM_HIGH')
      .setCheck('Number')
      .appendField('to')

    this.appendValueInput('TO_LOW')
      .setCheck('Number')
      .appendField('into')

    this.appendValueInput('TO_HIGH')
      .setCheck('Number')
      .appendField('to')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')

    this.setColour(160)

    this.setTooltip('Re-map a number from one range to another')
  },
}

// =====================================================
// constrain()
// =====================================================

Blockly.Blocks['arduino_constrain'] = {
  init() {
    this.appendValueInput('VALUE')
      .setCheck('Number')
      .appendField('constrain')

    this.appendValueInput('LOW')
      .setCheck('Number')
      .appendField('min')

    this.appendValueInput('HIGH')
      .setCheck('Number')
      .appendField('max')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')

    this.setColour(160)

    this.setTooltip('Constrain a number between a min and max')
  },
}

// =====================================================
// HIGH / LOW constant value
// =====================================================

Blockly.Blocks['arduino_pin_state_value'] = {
  init() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'HIGH'],
          ['LOW', 'LOW'],
        ]),
        'STATE'
      )

    this.setOutput(true, 'Boolean')

    this.setColour(160)

    this.setTooltip('HIGH or LOW constant value')
  },
}

// =====================================================
// Serial.begin()
// =====================================================

Blockly.Blocks['arduino_serial_begin'] = {
  init() {
    this.appendDummyInput()
      .appendField('Serial begin')
      .appendField(
        new Blockly.FieldDropdown([
          ['9600', '9600'],
          ['19200', '19200'],
          ['38400', '38400'],
          ['57600', '57600'],
          ['115200', '115200'],
        ]),
        'BAUD'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(60)

    this.setTooltip('Initialize serial communication at the given baud rate')
  },
}

// =====================================================
// Serial.print() / Serial.println()
// =====================================================

Blockly.Blocks['arduino_serial_print'] = {
  init() {
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField('Serial print')
      .appendField(
        new Blockly.FieldDropdown([
          ['inline', 'PRINT'],
          ['with newline', 'PRINTLN'],
        ]),
        'MODE'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(60)

    this.setTooltip('Print a value to the serial monitor')
  },
}

// =====================================================
// Serial.available()
// =====================================================

Blockly.Blocks['arduino_serial_available'] = {
  init() {
    this.appendDummyInput()
      .appendField('Serial available()')

    this.setOutput(true, 'Number')

    this.setColour(60)

    this.setTooltip('Number of bytes available to read from serial')
  },
}

// =====================================================
// Serial.read()
// =====================================================

Blockly.Blocks['arduino_serial_read'] = {
  init() {
    this.appendDummyInput()
      .appendField('Serial read()')

    this.setOutput(true, 'Number')

    this.setColour(60)

    this.setTooltip('Read one byte from the serial buffer')
  },
}

// =====================================================
// pulseIn()
// =====================================================

Blockly.Blocks['arduino_pulse_in'] = {
  init() {
    this.appendDummyInput()
      .appendField('pulse in pin')
      .appendField(
        new Blockly.FieldNumber(2, 0, 39, 1),
        'PIN'
      )
      .appendField('state')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'HIGH'],
          ['LOW', 'LOW'],
        ]),
        'STATE'
      )

    this.setOutput(true, 'Number')

    this.setColour(160)

    this.setTooltip('Measure the duration of a pulse on a pin (microseconds)')
  },
}

// =====================================================
// Raww
// =====================================================

Blockly.Blocks['arduino_comment'] = {
  init() {
    this.appendDummyInput()
      .appendField('//')
      .appendField(
        new Blockly.FieldTextInput('comment'),
        'TEXT'
      )

    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)

    this.setColour(0)

    this.setTooltip('Insert a comment line into the generated code')
  },
}