import { isSCLTag, tags } from "./tags.js";

/**
 * Helper function for to determine schema valid `reference` for OpenSCD
 * core Insert event.
 * !! only valid with Edition 2.1 projects (2007B4)
 * @param parent - The parent element the new child shall be added to
 * @param tag - The `tagName` of the new child
 * @returns Reference for new [[`tag`]] child within [[`parent`]]  or `null`
 */
export function getReference(parent: Element, tag: string): Element | null {
  if (!isSCLTag(tag)) return null;

  const parentTag = parent.tagName;
  const children = Array.from(parent.children);

  if (
    parentTag === "Services" ||
    parentTag === "SettingGroups" ||
    !isSCLTag(parentTag)
  )
    return children.find((child) => child.tagName === tag) ?? null;

  const sequence = tags[parentTag].children;
  let index = sequence.findIndex((element) => element === tag);

  if (index < 0) return null;

  let nextSibling: Element | undefined;
  while (index < sequence.length && !nextSibling) {
    // eslint-disable-next-line no-loop-func
    nextSibling = children.find((child) => child.tagName === sequence[index]);
    index += 1;
  }

  return nextSibling ?? null;
}
