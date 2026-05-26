# Figma Plugin: Page Background Toggle

A Figma plugin that toggles page background colors between light and dark mode with a single click.

## Features

- **One-click toggle** between light and dark page backgrounds
- **Custom colors** — configure your own light and dark values via color pickers
- **Per-page or all pages** — apply to the current page only or every page in the file
- **Persistent settings** — your chosen colors are remembered across sessions

## Usage

1. Run the plugin from **Plugins > Page Background Toggle**.
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
