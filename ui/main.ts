import "@rogieking/figui3/fig.css";
import "./styles.css";

const DEFAULT_LIGHT = "#F5F5F5";
const DEFAULT_DARK = "#1E1E1E";

function normalizeHex(color: string): string {
  const hex = color.startsWith("#") ? color : `#${color}`;
  return (hex.length === 9 ? hex.slice(0, 7) : hex).toUpperCase();
}

function getColor(el: HTMLElement): string {
  const value =
    "value" in el && typeof el.value === "string"
      ? el.value
      : el.getAttribute("value") || "#000000";
  return normalizeHex(value);
}

function setColor(el: HTMLElement, hex: string): void {
  if ("value" in el) (el as { value: string }).value = hex;
  el.setAttribute("value", hex);
}

async function bootstrap(): Promise<void> {
  await import("@rogieking/figui3/fig.js");

  await Promise.all([
    customElements.whenDefined("fig-button"),
    customElements.whenDefined("fig-checkbox"),
    customElements.whenDefined("fig-input-color"),
    customElements.whenDefined("fig-field"),
  ]);

  const lightColor = document.getElementById("light-color");
  const darkColor = document.getElementById("dark-color");
  const currentPageOnly = document.getElementById("current-page-only");
  const toggle = document.getElementById("toggle");
  const reset = document.getElementById("reset");

  if (!lightColor || !darkColor || !currentPageOnly || !toggle || !reset) {
    throw new Error("Ambient UI: missing required elements");
  }

  function saveColors(): void {
    parent.postMessage(
      {
        pluginMessage: {
          type: "save-colors",
          light: getColor(lightColor),
          dark: getColor(darkColor),
        },
      },
      "*",
    );
  }

  lightColor.addEventListener("change", saveColors);
  darkColor.addEventListener("change", saveColors);

  toggle.addEventListener("click", () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "toggle",
          currentPageOnly:
            "checked" in currentPageOnly && currentPageOnly.checked === true,
        },
      },
      "*",
    );
  });

  reset.addEventListener("click", () => {
    setColor(lightColor, DEFAULT_LIGHT);
    setColor(darkColor, DEFAULT_DARK);
    saveColors();
  });

  currentPageOnly.addEventListener("change", () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "save-scope",
          currentPageOnly:
            "checked" in currentPageOnly && currentPageOnly.checked === true,
        },
      },
      "*",
    );
  });

  window.onmessage = (event: MessageEvent) => {
    const msg = event.data.pluginMessage as
      | {
          type: "init";
          light: string;
          dark: string;
          currentPageOnly: boolean;
        }
      | undefined;
    if (!msg || msg.type !== "init") return;

    setColor(lightColor, msg.light);
    setColor(darkColor, msg.dark);
    if ("checked" in currentPageOnly) {
      currentPageOnly.checked = msg.currentPageOnly;
    }
  };
}

void bootstrap();
