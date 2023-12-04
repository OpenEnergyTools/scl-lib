const maxGseMacAddress = 0x010ccd0101ff;
const minGseMacAddress = 0x010ccd010000;

const maxSmvMacAddress = 0x010ccd0401ff;
const minSmvMacAddress = 0x010ccd040000;

function convertToMac(mac: number): string {
  const str = 0 + mac.toString(16).toUpperCase();
  const arr = str.match(/.{1,2}/g)!;
  return arr.join("-");
}

const gseMacRange = Array(maxGseMacAddress - minGseMacAddress)
  .fill(1)
  .map((_, i) => convertToMac(minGseMacAddress + i));

const smvMacRange = Array(maxSmvMacAddress - minSmvMacAddress)
  .fill(1)
  .map((_, i) => convertToMac(minSmvMacAddress + i));

/** Generator function returning `MAC-Address` within `doc`. Defined once it can
 * generate unique `MAC-address` without the need to update the `doc` in-between:
 * @example
 * ```ts
 * const macGenerator = macAddressGenerator(doc,"GSE");
 * const mac1 = macGenerator();        //01-0C-CD-01-00-09
 * const mac2 = macGenerator();        //01-0C-CD-01-00-0A
 * ```
 * @param doc - Project SCL as XMLDocument
 * @param serviceType - SampledValueControl (SMV) or GSEControl (GSE)
 * @returns A function generating increasing unused `MAC-Address` within `doc`
 *          on subsequent invocations
 */
export function macAddressGenerator(
  doc: XMLDocument,
  serviceType: "SMV" | "GSE",
): () => string | null {
  const macs = new Set(
    Array.from(
      doc.querySelectorAll(`${serviceType} > Address > P[type="MAC-Address"]`),
    ).map((mac) => mac.textContent!),
  );

  const range = serviceType === "SMV" ? smvMacRange : gseMacRange;

  return () => {
    const uniqueMAC = range.find((mac) => !macs.has(mac));
    if (uniqueMAC) macs.add(uniqueMAC);
    return uniqueMAC ?? null;
  };
}
