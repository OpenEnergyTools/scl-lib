import { isSCLTag, tags } from "./tags.js";

/** Returns SCL valid children from a given [[`parent`]]
 * > NOTE: !!only valid for 2007B4 (Ed2.1) projects
 * > children are in the correct sequence as defined in the 2007B4 schema
 * @returns SCL children for given [[`parent`]] */
export function getChildren(parent: Element): string[] {
  const parentTag = parent.tagName;

  if (!isSCLTag(parentTag)) return [];

  return tags[parentTag].children;
}
