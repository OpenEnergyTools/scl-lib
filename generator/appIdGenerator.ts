const maxGseAppId = 0x3fff;
const minGseAppId = 0x0000;

// APPID range for Type1A(Trip) GOOSE acc. IEC 61850-8-1
const maxGseTripAppId = 0xbfff;
const minGseTripAppId = 0x8000;

const maxSmvAppId = 0x7fff;
const minSmvAppId = 0x4000;

const gseAppIdRange = Array(maxGseAppId - minGseAppId)
  .fill(1)
  .map((_, i) => (minGseAppId + i).toString(16).toUpperCase().padStart(4, "0"));

const gseTripAppIdRange = Array(maxGseTripAppId - minGseTripAppId)
  .fill(1)
  .map((_, i) =>
    (minGseTripAppId + i).toString(16).toUpperCase().padStart(4, "0")
  );

const smvAppIdRange = Array(maxSmvAppId - minSmvAppId)
  .fill(1)
  .map((_, i) => (minSmvAppId + i).toString(16).toUpperCase().padStart(4, "0"));

/** Generator function returning unique `APPID` within `doc`. Defined once it
 * can generate unique `APPID`s without the need to update the `doc` in-between
 * ```md
 * GSE:         0x0000 - 0x3FFF
 * GSE Type1A:  0x8000 - 0xBFFF
 * SMV:         0x4000 - 0x7FFF
 * ```
 * @example
 * ```ts
 * const appIdGen = appIdGenerator(doc,"GSE");
 * const appId1 = appIdGen();        //0001
 * const appId2 = appIdGen();        //000A
 * ```
 * @param doc - Project SCL as XMLDocument
 * @param serviceType - SampledValueControl (SMV) or GSEControl (GSE)
 * @param type1A - Whether the GOOSE is a Trip GOOSE resulting
 *                 in different APPID range - default false
 * @returns A function generating increasing unused `APPID` within `doc`
 *          on subsequent invocations
 */
export function appIdGenerator(
  doc: XMLDocument,
  serviceType: "SMV" | "GSE",
  type1A = false
): () => string | null {
  const appIds = new Set(
    Array.from(
      doc.querySelectorAll(`${serviceType} > Address > P[type="APPID"]`)
    ).map((appId) => appId.textContent!)
  );

  const range =
    // eslint-disable-next-line no-nested-ternary
    serviceType === "SMV"
      ? smvAppIdRange
      : type1A
      ? gseTripAppIdRange
      : gseAppIdRange;

  return () => {
    const uniqueAppId = range.find((appId) => !appIds.has(appId));
    if (uniqueAppId) appIds.add(uniqueAppId);
    return uniqueAppId ?? null;
  };
}
