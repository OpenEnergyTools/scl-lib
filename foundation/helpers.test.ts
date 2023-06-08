export function findElement(
  str: string,
  selector?: string
): XMLDocument | Element | null {
  if (!selector) return new DOMParser().parseFromString(str, "application/xml");

  return new DOMParser()
    .parseFromString(str, "application/xml")
    .querySelector(selector);
}
