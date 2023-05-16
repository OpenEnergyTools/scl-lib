/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/** Intent to set or remove (if null) attributes on element */
export type Update = {
  element: Element;
  attributes: Partial<Record<string, string | null>>;
};

/** Intent to remove a node from its ownerDocument */
export type Remove = {
  node: Node;
};

/** Represents the user's intent to change an XMLDocument */
export type Edit = Insert | Update | Remove | Edit[];

export function isUpdate(edit: Edit): edit is Update {
  return (edit as Update).element !== undefined;
}
