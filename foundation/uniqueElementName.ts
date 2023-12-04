/** @returns Unique element name with  [[`tagName`]] within [[`parent`]] */
export function uniqueElementName(parent: Element, tagName: string): string {
  const nameCore = `new${tagName}`;

  const siblingNames = Array.from(
    parent.querySelectorAll(`:scope > ${tagName}`),
  ).map((child) => child.getAttribute("name") ?? child.tagName);
  if (!siblingNames.length) return `${nameCore}_001`;

  let newName = "";
  let i = 1;
  newName = `${nameCore}_${i.toString().padStart(3, "0")}`;
  while (i < siblingNames.length + 1) {
    if (!siblingNames.includes(newName)) break;

    i += 1;
    newName = `${nameCore}_${i.toString().padStart(3, "0")}`;
  }

  return newName;
}
