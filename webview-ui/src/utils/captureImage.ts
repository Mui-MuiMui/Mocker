import { toPng } from "html-to-image";

export async function captureViewport(
  width: number,
  height: number,
): Promise<string> {
  const el = document.querySelector("[data-mocker-viewport]");
  if (!el) throw new Error("Viewport element not found");

  // エディタUI非表示用CSSを一時注入
  const style = document.createElement("style");
  style.textContent = `
    [data-mocker-viewport] * {
      outline: none !important;
      cursor: default !important;
    }
  `;
  document.head.appendChild(style);

  try {
    const dataUrl = await toPng(el as HTMLElement, {
      width,
      height,
      pixelRatio: 1,
      filter: (node: Node) => {
        if (node instanceof HTMLElement) {
          if (node.hasAttribute("data-mocker-label")) return false;
          if (node.hasAttribute("data-mocker-handle")) return false;
        }
        return true;
      },
    });
    return dataUrl;
  } finally {
    style.remove();
  }
}
