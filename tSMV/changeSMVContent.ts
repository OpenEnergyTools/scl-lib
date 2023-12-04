import { Insert, Remove } from "../foundation/utils.js";
import {
  ChangeGseOrSmvAddressOptions,
  changeGseOrSmvAddress,
} from "../tAddress/changeGseOrSmvAddress.js";

export function changeSMVContent(
  element: Element,
  options: ChangeGseOrSmvAddressOptions,
): (Insert | Remove)[] {
  return changeGseOrSmvAddress(element, options);
}
