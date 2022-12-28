// ** icons
import { AiOutlineInfoCircle } from "react-icons/ai";
import { nameHandler } from "../data-manager";
import toastify from "../toastify";
// ** @components

const forEveryKeyLoop = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      return toastify(
        "error",
        AiOutlineInfoCircle,
        `${nameHandler(key)}`,
        `${value[0]}`
      );
    } else if (typeof value === "string") {
      return toastify(
        "error",
        AiOutlineInfoCircle,
        `${nameHandler(key)}`,
        `${value}`
      );
    }
  }
};

export { forEveryKeyLoop };
