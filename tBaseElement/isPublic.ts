/** @returns Whether a given element is within a Private section */
export function isPublic(element: Element): boolean {
  return !element.closest("Private");
}
