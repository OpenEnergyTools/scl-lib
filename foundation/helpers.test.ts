export function findElement(str: string, selector: string): Element | null {
  return new DOMParser()
    .parseFromString(str, "application/xml")
    .querySelector(selector);
}
