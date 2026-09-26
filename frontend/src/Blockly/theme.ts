import * as Blockly from "blockly";

export const arduinoDarkTheme = Blockly.Theme.defineTheme("arduinoDark", {
  name: "arduinoDark",
  base: Blockly.Themes.Classic,

  blockStyles: {
    setup_blocks: {
      colourPrimary: "#22c55e",
      colourSecondary: "#16a34a",
      colourTertiary: "#15803d",
    },

    pin_blocks: {
      colourPrimary: "#3b82f6",
      colourSecondary: "#2563eb",
      colourTertiary: "#1d4ed8",
    },

    timing_blocks: {
      colourPrimary: "#f59e0b",
      colourSecondary: "#d97706",
      colourTertiary: "#b45309",
    },
  },

  categoryStyles: {
    setup_category: {
      colour: "#22c55e",
    },

    pin_category: {
      colour: "#3b82f6",
    },

    timing_category: {
      colour: "#f59e0b",
    },
  },

  componentStyles: {
    workspaceBackgroundColour: "#1e1e1e",
    toolboxBackgroundColour: "#111827",
    toolboxForegroundColour: "#e5e7eb",

    flyoutBackgroundColour: "#171717",
    flyoutForegroundColour: "#e5e7eb",

    flyoutOpacity: 1,

    scrollbarColour: "#4b5563",
    scrollbarOpacity: 0.7,

    insertionMarkerColour: "#ffffff",
    insertionMarkerOpacity: 0.3,

    cursorColour: "#ffffff",
  },
});
