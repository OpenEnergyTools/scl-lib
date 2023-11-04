import { SCLTag, isSCLTag, tags } from "./tags.js";

/** @returns parent `tagName` s for SCL (2007B4) element tag  */
export function parentTags(tagName: string): SCLTag[] {
  if (!isSCLTag(tagName)) return [];

  return tags[tagName].parents;
}
