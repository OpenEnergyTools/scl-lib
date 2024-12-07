import { Edit, Update } from "../foundation/utils.js";

import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";

function isPublic(element: Element): boolean {
  return !element.closest("Private");
}

const elementsWithIedNameAttribute = [
  "LNode",
  "ConnectedAP",
  "KDC",
  "ExtRef",
  "ClientLN",
  "Association",
];

function updateIEDNameTextContent(
  ied: Element,
  oldIedName: string,
  newIedName: string,
): Edit[] {
  return Array.from(ied.ownerDocument.getElementsByTagName("IEDName"))
    .filter(isPublic)
    .filter((iedName) => iedName.textContent === oldIedName)
    .flatMap((iedName) => {
      const node = Array.from(iedName.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE,
      )!;

      return [
        { node },
        { parent: iedName, node: document.createTextNode(newIedName), reference: null },
      ];
    });
}

/** Valid is:
 * 1. there is an control block in the IED with the name change (ied)
 * 2. this control block is subscribed in otherIED (iedName, srcLDInst and srcCBName match)
 * 3. there is a LGOS/LSVS > ... > setSrcRef holding this control block object reference
 */
function validSubscriptionSupervision(
  ied: Element,
  otherIED: Element,
  oldIedName: string,
): Element[] {
  // for GSEControl elements
  const lgosVals = Array.from(ied.querySelectorAll("GSEControl"))
    .filter((srcCB) => {
      //filter out all control blocks that are not subscribed in otherIED
      const srcLDInst = srcCB.closest("LDevice")?.getAttribute("inst");
      return !!otherIED.querySelector(
        `:scope > AccessPoint > Server > LDevice 
        ExtRef[iedName="${oldIedName}"][srcLDInst="${srcLDInst}"][srcCBName="${srcCB.getAttribute(
          "name",
        )}"]`,
      );
    })
    .map((srcCB) => {
      const objRef = controlBlockObjRef(srcCB);
      return Array.from(
        otherIED.querySelectorAll(
          `:scope > AccessPoint > Server > LDevice > LN[lnClass="LGOS"] > 
            DOI[name="GoCBRef"] > DAI[name="setSrcRef"] > Val`,
        ),
      ).find((val) => val.textContent === objRef);
    })
    .filter((val) => val) as Element[];

  // for SampledValueControl elements
  const lsvsVals = Array.from(ied.querySelectorAll("SampledValueControl"))
    .filter((srcCB) => {
      //filter out all control blocks that are not subscribed in otherIED
      const srcLDInst = srcCB.closest("LDevice")?.getAttribute("inst");
      return !!otherIED.querySelector(
        `:scope > AccessPoint > Server > LDevice 
          ExtRef[iedName="${oldIedName}"][srcLDInst="${srcLDInst}"][srcCBName="${srcCB.getAttribute(
            "name",
          )}"]`,
      );
    })
    .map((srcCB) => {
      const objRef = controlBlockObjRef(srcCB);
      return Array.from(
        otherIED.querySelectorAll(
          `:scope > AccessPoint > Server > LDevice > LN[lnClass="LSVS"] > 
          DOI[name="SvCBRef"] > DAI[name="setSrcRef"] > Val`,
        ),
      ).find((val) => val.textContent === objRef);
    })
    .filter((val) => val) as Element[];

  return [...lgosVals, ...lsvsVals];
}

function updateSubscriptionSupervision(
  ied: Element,
  oldIedName: string,
  newIedName: string,
): Edit[] {
  const vals = Array.from(
    ied.ownerDocument.querySelectorAll(":root > IED"),
  ).flatMap((otherIED) =>
    validSubscriptionSupervision(ied, otherIED, oldIedName),
  );

  return vals.flatMap((val) => {
    const oldContent = val.textContent!;
    const newContent = oldContent.replace(oldIedName, newIedName);
    const newTextNode = document.createTextNode(newContent);

    const node = Array.from(val.childNodes).find(
      (childNode) => childNode.nodeType === Node.TEXT_NODE,
    )!;

    return [{ node }, { parent: val, node: newTextNode, reference: null }];
  });
}

function updateIedNameAttributes(
  ied: Element,
  oldIedName: string,
  newIedName: string,
): Update[] {
  const selector = elementsWithIedNameAttribute
    .map((iedNameElement) => `${iedNameElement}[iedName="${oldIedName}"]`)
    .join(",");

  return Array.from(ied.ownerDocument.querySelectorAll(selector))
    .filter(isPublic)
    .map((element) => {
      return { element, attributes: { iedName: newIedName } };
    });
}

/**
 * Function to schema valid update name and other attribute(s) in IED element
 * (rename IED)
 * ```md
 * The function makes sure to also
 * 1. Update all elements with iedName attribute referenced to the IED.name
 *    attribute such as LNode, ClientLN, ExtRef, KDC, Association, ConnectedAP
 * 2. Update all control block object references pointing to the IED
 * 3. Updates IEDName elements text content
 * ```
 * @param update - IED element and attributes to be changed in the IED element
 * @returns - Set of addition edits updating all references SCL elements
 */
export function updateIED(update: Update): Edit[] {
  if (update.element.tagName !== "IED") return [];
  if (!update.attributes.name) return [update];

  const ied = update.element;
  const oldIedName = ied.getAttribute("name");
  const newIedName = update.attributes.name!;
  if (!oldIedName) return [];

  return [
    update,
    ...updateIedNameAttributes(ied, oldIedName, newIedName),
    ...updateSubscriptionSupervision(ied, oldIedName, newIedName),
    ...updateIEDNameTextContent(ied, oldIedName, newIedName),
  ];
}
