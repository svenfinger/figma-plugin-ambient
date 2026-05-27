# Ambient

A Figma plugin that toggles page background colors between light and dark mode with a single click.

## Features

- **One-click toggle** between light and dark page backgrounds
- **Quick action** — toggle without opening the plugin UI (from Quick Actions or the plugin submenu)
- **Custom colors** — configure your own light and dark values via color pickers
- **Per-page or all pages** — apply to the current page only or every page in the file
- **Persistent settings** — your chosen colors and scope preference are remembered across sessions

## Usage

The plugin exposes two commands under **Plugins → Page Background Toggle**:

| Command | What it does |
| --- | --- |
| **Toggle page background** | Switches between light and dark backgrounds without a UI |
| **Settings…** | Opens the settings panel (colors, scope, reset) |

### Quick toggle

1. Open **Quick Actions**.
2. Search for **Toggle page background** (or the plugin name) and run it.

The quick toggle uses your saved **Apply only to current page** preference. Set that in **Settings…** (or the last time you toggled from the panel); the default is all pages in the file.

You can also run **Toggle page background** from the plugin submenu without opening the panel.

### Settings panel

1. Run **Settings…** from the plugin submenu (or Quick Actions).
2. Click **Toggle page backgrounds** to switch between light and dark.
3. Check **Apply only to current page** if you don't want to affect other pages.
4. Use the color pickers to customise the light and dark colors.
5. Click **Reset to defaults** to restore the official Figma page colors (`#F5F5F5` / `#1E1E1E`).

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch

```bash
npm run watch
```

### Lint

```bash
npm run lint
npm run lint:fix
```

### Loading in Figma

1. Open the Figma desktop app.
2. Go to **Plugins > Development > Import plugin from manifest…**
3. Select the `manifest.json` file from this repository.

## License

[MIT](LICENSE)
