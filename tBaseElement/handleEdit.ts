/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/** Intent to remove a node from its ownerDocument */
export type Remove = {
  node: Node;
};

/** Intent to set the `textContent` of `element`. */
export type SetTextContent = {
  element: Element;
  textContent: string;
};

/** Intent to set or remove (if null) `attributes` on `element`. */
export type SetAttributes = {
  element: Element;
  attributes: Partial<Record<string, string | null>>;
  attributesNS: Partial<Record<string, Partial<Record<string, string | null>>>>;
};

export type EditV2 =
  | Insert
  | SetAttributes
  | SetTextContent
  | Remove
  | EditV2[];

export function isComplex(edit: EditV2): edit is EditV2[] {
  return edit instanceof Array;
}

export function isSetTextContent(edit: EditV2): edit is SetTextContent {
  return "element" in edit && "textContent" in edit;
}

export function isRemove(edit: EditV2): edit is Remove {
  return (
    (edit as Insert).parent === undefined && (edit as Remove).node !== undefined
  );
}

export function isSetAttributes(edit: EditV2): edit is SetAttributes {
  return "element" in edit && "attributesNS" in edit && "attributes" in edit;
}

export function isInsert(edit: EditV2): edit is Insert {
  return (edit as Insert).parent !== undefined;
}

/** EDIT HANDLING */
function handleSetTextContent({
  element,
  textContent,
}: SetTextContent): (SetTextContent | Insert)[] {
  const { childNodes } = element;

  const restoreChildNodes: Insert[] = Array.from(childNodes).map((node) => ({
    parent: element,
    node,
    reference: null,
  }));

  element.textContent = textContent;

  const undoTextContent: SetTextContent = { element, textContent: "" };

  return [undoTextContent, ...restoreChildNodes];
}

function uniqueNSPrefix(element: Element, ns: string): string {
  let i = 1;
  const attributes = Array.from(element.attributes);
  const hasSamePrefix = (attribute: Attr) =>
    attribute.prefix === `ens${i}` && attribute.namespaceURI !== ns;
  const nsOrNull = new Set([null, ns]);
  const differentNamespace = (prefix: string) =>
    !nsOrNull.has(element.lookupNamespaceURI(prefix));
  while (differentNamespace(`ens${i}`) || attributes.find(hasSamePrefix))
    i += 1;
  return `ens${i}`;
}

function handleSetAttributes({
  element,
  attributes,
  attributesNS,
}: SetAttributes): SetAttributes {
  const oldAttributes = { ...attributes };
  const oldAttributesNS = { ...attributesNS };

  // Save `element`'s `attributes` for undo
  Object.keys(attributes)
    .reverse()
    .forEach((name) => {
      oldAttributes[name] = element.getAttribute(name);
    });

  // Change `element`'s `attributes`
  for (const entry of Object.entries(attributes)) {
    try {
      const [name, value] = entry as [string, string | null];
      if (value === null) element.removeAttribute(name);
      else element.setAttribute(name, value);
    } catch (e) {
      // do nothing if update doesn't work on this attribute
      delete oldAttributes[entry[0]];
    }
  }

  // Save `element`'s namespaced `attributes` for undo action
  Object.entries(attributesNS).forEach(([ns, attrs]) => {
    Object.keys(attrs!)
      .reverse()
      .forEach((name) => {
        oldAttributesNS[ns] = {
          ...oldAttributesNS[ns],
          [name]: element.getAttributeNS(ns, name),
        };
      });
  });

  // Change `element`'s namespaced `attributes`
  for (const nsEntry of Object.entries(attributesNS)) {
    const [ns, attrs] = nsEntry as [
      string,
      Partial<Record<string, string | null>>,
    ];
    for (const entry of Object.entries(attrs)) {
      try {
        const [name, value] = entry as [string, string | null];
        if (value === null) element.removeAttributeNS(ns, name);
        else {
          let qualifiedName = name;
          if (!qualifiedName.includes(":")) {
            let prefix = element.lookupPrefix(ns);
            if (!prefix) prefix = uniqueNSPrefix(element, ns);
            qualifiedName = `${prefix}:${name}`;
          }
          element.setAttributeNS(ns, qualifiedName, value);
        }
      } catch (e) {
        delete oldAttributesNS[entry[0]];
      }
    }
  }

  return {
    element,
    attributes: oldAttributes,
    attributesNS: oldAttributesNS,
  };
}

function handleRemove({ node }: Remove): Insert | [] {
  const { parentNode: parent, nextSibling: reference } = node;
  node.parentNode?.removeChild(node);
  if (parent)
    return {
      node,
      parent,
      reference,
    };
  return [];
}

function handleInsert({
  parent,
  node,
  reference,
}: Insert): Insert | Remove | [] {
  try {
    const { parentNode, nextSibling } = node;
    parent.insertBefore(node, reference);
    if (parentNode)
      // Move node from old parent to new parent -> redo is moving back to old parent
      return {
        node,
        parent: parentNode,
        reference: nextSibling,
      };
    // Node has no old parent -> redo is removing from new parent
    return { node };
  } catch (e) {
    // do nothing if insert doesn't work on these nodes
    return [];
  }
}

/** A utility function that changes a XMLDocument based on users edit intent
 *  defined as EditV2. */
export function handleEdit(edit: EditV2): EditV2 {
  if (isInsert(edit)) return handleInsert(edit);
  if (isRemove(edit)) return handleRemove(edit);
  if (isSetAttributes(edit)) return handleSetAttributes(edit);
  if (isSetTextContent(edit)) return handleSetTextContent(edit);
  if (isComplex(edit)) return edit.map((edit) => handleEdit(edit)).reverse();

  return [];
}
