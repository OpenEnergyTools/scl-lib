/** @returns Updated confRev attribute of control block */
export function updatedConfRev(control: Element): string {
  const confRev = parseInt(control.getAttribute("confRev") ?? "0", 10);

  if (confRev === 0) return `${confRev + 1}`;
  return `${confRev + 10000}`;
}
