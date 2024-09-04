import { Remove } from "../foundation/utils.js";

export type RemoveDataTypeOptions = {
  /** Whether a linked data type will be removed */
  force: boolean;
};

function orphanRemoves(dtt: Element, orphans: Element[]): Remove[] {
  return orphans
    .map((orphan) => {
      const id = orphan.getAttribute("id");
      const btRemovedDataType = dtt.querySelector(`:scope > *[id="${id}"]`)!;

      return { node: btRemovedDataType };
    })
    .filter((remove) => remove) as Remove[];
}

function removeOrphans(orphans: Element[]): void {
  orphans.forEach((orphan) => orphan.remove());
}

function isLinked(dataType: Element): boolean {
  const dtt = dataType.closest("DataTypeTemplates");

  const id = dataType.getAttribute("id");

  const linkedData = dtt?.ownerDocument.querySelector(
    `:root > DataTypeTemplates *[type="${id}"], :root > IED *[lnType="${id}"]`
  );
  return !!linkedData;
}

function getOrphans(ddt: Element, saveOrphans: Element[] = []): Element[] {
  return Array.from(ddt.querySelectorAll(":scope > *"))
    .filter((dataType) => !isLinked(dataType))
    .filter((orphan) => !saveOrphans.includes(orphan));
}

/**
 * Utility function to remove data types LNodeType, DOType, DAType or EnumType.
 * The function makes sure to not leave new unlinked data types .
 * @param remove - Remove edit the data type
 * @returns Remove array containing all to be removed data types
 */
export function removeDataType(
  dtRemove: Remove,
  options: RemoveDataTypeOptions = { force: false }
): Remove[] {
  const dataType = dtRemove.node as Element;

  const dtt = dataType.closest("DataTypeTemplates");
  const dttClone = dataType.closest("DataTypeTemplates")?.cloneNode(true);
  if (!dttClone) return [];

  if (isLinked(dataType) && !options.force) return [];

  const saveOrphans = getOrphans(dtt!);

  const removes: Remove[] = [];
  let orphans = [dataType];
  while (orphans.length > 0) {
    removes.push(...orphanRemoves(dtt!, orphans));
    removeOrphans(orphans);
    orphans = getOrphans(dtt!, saveOrphans);
  }

  return removes;
}
