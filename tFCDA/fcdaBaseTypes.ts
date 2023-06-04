function dataAttributeSpecification(
  anyLn: Element,
  doName: string,
  daName: string | null
): { cdc: string; bType?: string } | undefined {
  const doc = anyLn.ownerDocument;
  const lNodeType = doc.querySelector(
    `:root > DataTypeTemplates > LNodeType[id="${anyLn.getAttribute(
      "lnType"
    )}"]`
  );

  const doNames = doName.split(".");
  let leaf: Element | null | undefined = lNodeType;
  for (const doName of doNames) {
    const dO: Element | null | undefined = leaf?.querySelector(
      `DO[name="${doName}"], SDO[name="${doName}"]`
    );
    leaf = doc.querySelector(
      `:root > DataTypeTemplates > DOType[id="${dO?.getAttribute("type")}"]`
    );
  }
  const cdc = leaf?.getAttribute("cdc");
  if (!cdc) return;

  if (!daName) return { cdc };

  const daNames = daName.split(".");
  for (const daName of daNames) {
    const dA: Element | null | undefined = leaf?.querySelector(
      `DA[name="${daName}"], BDA[name="${daName}"]`
    );
    leaf =
      daNames.indexOf(daName) < daNames.length - 1
        ? doc.querySelector(
            `:root > DataTypeTemplates > DAType[id="${dA?.getAttribute(
              "type"
            )}"]`
          )
        : dA;
  }
  const bType = leaf?.getAttribute("bType");
  if (!bType) return;

  return { cdc, bType };
}

/**
 * Determines common data class (CDC) of a given `doName` and with present
 * `daName` its `bType`.
 * @param fcda - The `FCDA` element to determine the `cdc` and `bType` for
 * @returns An object that contains the `cdc` and `bType` with given `daName`
 * or undefined if one of them cannot be determined
 */
export function fcdaBaseTypes(
  fcda: Element
): { cdc: string; bType?: string } | undefined {
  const sourceIed = fcda.closest("IED");
  const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst",
    "doName",
    "daName",
  ].map((attr) => fcda.getAttribute(attr));
  if (!sourceIed || !ldInst || !lnClass || !doName) return;

  const anyLn = Array.from(
    sourceIed.querySelectorAll(
      `LDevice[inst="${ldInst}"] > LN, LDevice[inst="${ldInst}"] > LN0`
    )
  ).find((anyLn) => {
    return (
      (anyLn.getAttribute("prefix") ?? "") === (prefix ?? "") &&
      anyLn.getAttribute("lnClass") === lnClass &&
      anyLn.getAttribute("inst") === (lnInst ?? "")
    );
  });
  if (!anyLn) return;

  return dataAttributeSpecification(anyLn, doName, daName);
}
