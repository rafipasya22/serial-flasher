import * as Blockly from 'blockly'

export const ARDUINO_CLI_LIB_NAME: Record<string, string> = {
  servo: 'Servo',
  dht: 'DHT sensor library',
  lcd_i2c: 'LiquidCrystal I2C',
}

export interface ArduinoLibrary {
  id: string
  name: string
  cliName: string
  header: string
  description: string
  registerBlocks: () => void
  toolboxBlocks: { kind: 'block'; type: string }[]
}

const registered = new Set<string>()

const servoLibrary: ArduinoLibrary = {
  id: 'servo',
  name: 'Servo',
  cliName: ARDUINO_CLI_LIB_NAME.servo,
  header: 'Servo.h',
  description: 'Control hobby servo motors',
  toolboxBlocks: [
    { kind: 'block', type: 'servo_declare' },
    { kind: 'block', type: 'servo_attach' },
    { kind: 'block', type: 'servo_write' },
  ],
  registerBlocks() {
    if (registered.has('servo')) return
    registered.add('servo')

    Blockly.Blocks['servo_declare'] = {
      init() {
        this.appendDummyInput()
          .appendField('create servo')
          .appendField(new Blockly.FieldTextInput('myServo'), 'NAME')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(290)
        this.setTooltip('Declare a Servo object')
      },
    }

    Blockly.Blocks['servo_attach'] = {
      init() {
        this.appendDummyInput()
          .appendField('servo')
          .appendField(new Blockly.FieldTextInput('myServo'), 'NAME')
          .appendField('attach to pin')
          .appendField(new Blockly.FieldNumber(9, 0, 39, 1), 'PIN')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(290)
        this.setTooltip('Attach servo to a pin')
      },
    }

    Blockly.Blocks['servo_write'] = {
      init() {
        this.appendDummyInput()
          .appendField('servo')
          .appendField(new Blockly.FieldTextInput('myServo'), 'NAME')
          .appendField('write angle')
          .appendField(new Blockly.FieldNumber(90, 0, 180, 1), 'ANGLE')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(290)
        this.setTooltip('Set servo angle (0-180)')
      },
    }
  },
}

const dhtLibrary: ArduinoLibrary = {
  id: 'dht',
  name: 'DHT sensor',
  cliName: ARDUINO_CLI_LIB_NAME.dht,
  header: 'DHT.h',
  description: 'Read temperature and humidity from DHT11/22',
  toolboxBlocks: [
    { kind: 'block', type: 'dht_declare' },
    { kind: 'block', type: 'dht_begin' },
    { kind: 'block', type: 'dht_read_temp' },
    { kind: 'block', type: 'dht_read_humidity' },
  ],
  registerBlocks() {
    if (registered.has('dht')) return
    registered.add('dht')

    Blockly.Blocks['dht_declare'] = {
      init() {
        this.appendDummyInput()
          .appendField('create DHT')
          .appendField(new Blockly.FieldTextInput('dht'), 'NAME')
          .appendField('on pin')
          .appendField(new Blockly.FieldNumber(2, 0, 39, 1), 'PIN')
          .appendField('type')
          .appendField(
            new Blockly.FieldDropdown([
              ['DHT11', 'DHT11'],
              ['DHT22', 'DHT22'],
            ]),
            'TYPE'
          )
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(20)
        this.setTooltip('Declare a DHT sensor object')
      },
    }

    Blockly.Blocks['dht_begin'] = {
      init() {
        this.appendDummyInput()
          .appendField('DHT')
          .appendField(new Blockly.FieldTextInput('dht'), 'NAME')
          .appendField('begin')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(20)
        this.setTooltip('Initialize the DHT sensor')
      },
    }

    Blockly.Blocks['dht_read_temp'] = {
      init() {
        this.appendDummyInput()
          .appendField('DHT')
          .appendField(new Blockly.FieldTextInput('dht'), 'NAME')
          .appendField('temperature °C')
        this.setOutput(true, 'Number')
        this.setColour(20)
        this.setTooltip('Read temperature in Celsius')
      },
    }

    Blockly.Blocks['dht_read_humidity'] = {
      init() {
        this.appendDummyInput()
          .appendField('DHT')
          .appendField(new Blockly.FieldTextInput('dht'), 'NAME')
          .appendField('humidity %')
        this.setOutput(true, 'Number')
        this.setColour(20)
        this.setTooltip('Read relative humidity percentage')
      },
    }
  },
}

const lcdLibrary: ArduinoLibrary = {
  id: 'lcd_i2c',
  name: 'LiquidCrystal I2C',
  cliName: ARDUINO_CLI_LIB_NAME.lcd_i2c,
  header: 'LiquidCrystal_I2C.h',
  description: 'Control an I2C character LCD',
  toolboxBlocks: [
    { kind: 'block', type: 'lcd_declare' },
    { kind: 'block', type: 'lcd_init' },
    { kind: 'block', type: 'lcd_print' },
    { kind: 'block', type: 'lcd_clear' },
    { kind: 'block', type: 'lcd_set_cursor' },
  ],
  registerBlocks() {
    if (registered.has('lcd_i2c')) return
    registered.add('lcd_i2c')

    Blockly.Blocks['lcd_declare'] = {
      init() {
        this.appendDummyInput()
          .appendField('create LCD')
          .appendField(new Blockly.FieldTextInput('lcd'), 'NAME')
          .appendField('addr')
          .appendField(new Blockly.FieldTextInput('0x27'), 'ADDR')
          .appendField('cols')
          .appendField(new Blockly.FieldNumber(16, 1, 40, 1), 'COLS')
          .appendField('rows')
          .appendField(new Blockly.FieldNumber(2, 1, 8, 1), 'ROWS')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(200)
        this.setTooltip('Declare an I2C LCD object')
      },
    }

    Blockly.Blocks['lcd_init'] = {
      init() {
        this.appendDummyInput()
          .appendField('LCD')
          .appendField(new Blockly.FieldTextInput('lcd'), 'NAME')
          .appendField('init + backlight on')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(200)
        this.setTooltip('Initialize LCD and turn on backlight')
      },
    }

    Blockly.Blocks['lcd_print'] = {
      init() {
        this.appendValueInput('TEXT')
          .setCheck(null)
          .appendField('LCD')
          .appendField(new Blockly.FieldTextInput('lcd'), 'NAME')
          .appendField('print')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(200)
        this.setTooltip('Print text to the LCD at current cursor position')
      },
    }

    Blockly.Blocks['lcd_clear'] = {
      init() {
        this.appendDummyInput()
          .appendField('LCD')
          .appendField(new Blockly.FieldTextInput('lcd'), 'NAME')
          .appendField('clear')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(200)
        this.setTooltip('Clear the LCD screen')
      },
    }

    Blockly.Blocks['lcd_set_cursor'] = {
      init() {
        this.appendDummyInput()
          .appendField('LCD')
          .appendField(new Blockly.FieldTextInput('lcd'), 'NAME')
          .appendField('set cursor col')
          .appendField(new Blockly.FieldNumber(0, 0, 40, 1), 'COL')
          .appendField('row')
          .appendField(new Blockly.FieldNumber(0, 0, 8, 1), 'ROW')
        this.setPreviousStatement(true, null)
        this.setNextStatement(true, null)
        this.setColour(200)
        this.setTooltip('Move LCD cursor to column/row')
      },
    }
  },
}

export const libraryRegistry: ArduinoLibrary[] = [
  servoLibrary,
  dhtLibrary,
  lcdLibrary,
]

export function registerAllLibraryBlocks() {
  for (const lib of libraryRegistry) {
    lib.registerBlocks()
  }
}

export function getRequiredLibraries(usedBlockTypes: string[]): string[] {
  const usedSet = new Set(usedBlockTypes)
  const required = new Set<string>()

  for (const lib of libraryRegistry) {
    const uses = lib.toolboxBlocks.some(b => usedSet.has(b.type))
    if (uses) required.add(lib.cliName)
  }

  return Array.from(required)
}

// Given the cliNames that are actually installed (from /libraries/installed),
// return only the toolbox blocks whose library is installed.
export function getInstalledLibraryToolboxContents(
  installedCliNames: string[]
) {
  const installedSet = new Set(installedCliNames)

  const relevant = libraryRegistry.filter(lib =>
    installedSet.has(lib.cliName)
  )

  // Only register blocks (init() defs) for libraries actually installed —
  // no point defining blocks nobody can compile against.
  relevant.forEach(lib => lib.registerBlocks())

  return relevant.flatMap(lib => lib.toolboxBlocks)
}