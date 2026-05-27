const DEFAULT_LIGHT = "#F5F5F5";
const DEFAULT_DARK = "#1E1E1E";

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 0xff) / 255, g: ((n >> 8) & 0xff) / 255, b: (n & 0xff) / 255 };
}

function colorDistance(a: RGB, b: RGB): number {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

function getCurrentPageColor(): RGB | null {
  const bg = figma.currentPage.backgrounds;
  if (bg.length === 0) return null;
  const first = bg[0];
  if (first.type !== "SOLID") return null;
  return first.color;
}

async function getColors(): Promise<{ light: string; dark: string }> {
  const light = await figma.clientStorage.getAsync("lightColor") || DEFAULT_LIGHT;
  const dark = await figma.clientStorage.getAsync("darkColor") || DEFAULT_DARK;
  return { light, dark };
}

async function toggleBackground(currentPageOnly: boolean): Promise<void> {
  const { light, dark } = await getColors();
  const lightRgb = hexToRgb(light);
  const darkRgb = hexToRgb(dark);

  const lastApplied = await figma.clientStorage.getAsync("lastApplied") as string | undefined;
  let nextMode: string;

  if (lastApplied === "light" || lastApplied === "dark") {
    nextMode = lastApplied === "dark" ? "light" : "dark";
  } else {
    const current = getCurrentPageColor();
    if (!current) {
      nextMode = "dark";
    } else {
      nextMode = colorDistance(current, lightRgb) <= colorDistance(current, darkRgb) ? "dark" : "light";
    }
  }

  const nextColor = nextMode === "dark" ? darkRgb : lightRgb;
  const nextBackground: SolidPaint = { type: "SOLID", color: nextColor };

  if (currentPageOnly) {
    figma.currentPage.backgrounds = [nextBackground];
  } else {
    for (const page of figma.root.children) {
      await page.loadAsync();
      page.backgrounds = [nextBackground];
    }
  }

  await figma.clientStorage.setAsync("lastApplied", nextMode);
  const scope = currentPageOnly ? "current page" : "all pages";
  figma.notify(`Set ${scope} background to ${nextMode}`);
}

function runSettings(): void {
  figma.showUI(__html__, { width: 240, height: 183 });

  (async () => {
    const colors = await getColors();
    const currentPageOnly = await figma.clientStorage.getAsync("currentPageOnly") === true;
    figma.ui.postMessage({
      type: "init",
      light: colors.light,
      dark: colors.dark,
      currentPageOnly,
    });
  })();

  figma.ui.onmessage = async (msg) => {
    if (msg.type === "save-colors") {
      await figma.clientStorage.setAsync("lightColor", msg.light);
      await figma.clientStorage.setAsync("darkColor", msg.dark);
      return;
    }

    if (msg.type === "save-scope") {
      await figma.clientStorage.setAsync("currentPageOnly", msg.currentPageOnly);
      return;
    }

    if (msg.type !== "toggle") return;

    await figma.clientStorage.setAsync("currentPageOnly", msg.currentPageOnly);
    await toggleBackground(msg.currentPageOnly);
  };
}

if (figma.command === "toggle") {
  (async () => {
    const currentPageOnly = await figma.clientStorage.getAsync("currentPageOnly") === true;
    await toggleBackground(currentPageOnly);
    figma.closePlugin();
  })();
} else {
  runSettings();
}
