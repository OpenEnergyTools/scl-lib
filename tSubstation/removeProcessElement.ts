import { Remove } from "../foundation/utils.js";

function isBusBasCNode(cNode: Element): boolean {
  return cNode.parentElement?.children.length === 1;
}

function existOtherTerminalConnection(
  cNode: Element,
  terminal: Element,
): boolean {
  return !!Array.from(
    cNode.ownerDocument.querySelectorAll(
      `Terminal[connectivityNode="${cNode.getAttribute("pathName")}"]`,
    ),
  ).filter((otherTerminal) => otherTerminal !== terminal).length;
}

function cNodesPerTerminal(terminal: Element): Element[] {
  return Array.from(
    terminal.ownerDocument.querySelectorAll(
      `ConnectivityNode[pathName="${terminal.getAttribute(
        "connectivityNode",
      )}"]`,
    ),
  );
}

function terminalPerCNode(cNode: Element): Element[] {
  return Array.from(
    cNode.ownerDocument.querySelectorAll(
      `Terminal[connectivityNode="${cNode.getAttribute("pathName")}"]`,
    ),
  );
}

function outOfScopeTerminal(root: Element, terminal: Element): boolean {
  return !Array.from(root.querySelectorAll("Terminal")).find(
    (ancestorTerminal) => ancestorTerminal === terminal,
  );
}

function outOfScopeCNode(root: Element, cNode: Element): boolean {
  return !Array.from(root.querySelectorAll("ConnectivityNode")).find(
    (ancestorCNode) => ancestorCNode === cNode,
  );
}

/** Updates remove edit for process type element
 * includes orphan Terminal's and orphan ConnectivityNode's
 * > NOTE: Process type element potentially hold `ConnectivityNode` and
 * > `Terminal`. Removing those can leave orphan elements
 * @param remove - remove edit on precess level elements
 * @return - enriched remove edit array
 */
export function removeProcessElement(remove: Remove): Remove[] {
  const element = remove.node as Element;

  const cNodes = Array.from(element.querySelectorAll("ConnectivityNode"));
  const removeTerminals = cNodes.flatMap((cNode) => {
    return terminalPerCNode(cNode)
      .filter((terminal) => outOfScopeTerminal(element, terminal))
      .map((terminal) => {
        return {
          node: terminal,
        };
      });
  });

  const terminals = Array.from(element.querySelectorAll("Terminal"));
  const removeCNodes = terminals.flatMap((terminal) => {
    return cNodesPerTerminal(terminal)
      .filter((cNode) => outOfScopeCNode(element, cNode))
      .filter((cNode) => existOtherTerminalConnection(cNode, terminal))
      .filter((cNode) => !isBusBasCNode(cNode))
      .map((cNode) => {
        return { node: cNode };
      });
  });

  return [remove, ...removeTerminals, ...removeCNodes];
}
