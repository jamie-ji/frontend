// ** react-toastify
import classNames from "classnames";
import { toast } from "react-toastify";

export default function toastify(type, Icon, title, discription) {
  const color = () => {
    if (type === "error") {
      return "danger";
    } else {
      return type;
    }
  };
  return toast[type](
    <div
      className={classNames("toast_component", { align_center: !discription })}
    >
      <div className={`icon_container`}>
        <div className={`bg-${color()} icon`}>
          <Icon size={15} />
        </div>
      </div>
      <div className="content">
        <h6 className={`text-${color()}`}>{title}</h6>
        {discription && <p>{discription}</p>}
      </div>
    </div>
  );
}
