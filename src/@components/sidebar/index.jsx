import React, { Fragment } from "react";
import classNames from "classnames";
import { mediaUrl } from "../constants/index";
import { Button } from "reactstrap";

function Sidebar({ isOpen, setIsOpen, id }) {
  return (
    <Fragment>
      <Button
        size="sm"
        className="p-0 text-primary"
        color="default"
        onClick={() => setIsOpen(id)}
        style={{ fontSize: "10px" }}
      >
        <u>View</u>
      </Button>
      <div
        onClick={() => setIsOpen(null)}
        className={classNames("sidebar-overlay", {
          show: isOpen,
        })}
      ></div>
      <div className={classNames("sidebar", { show: isOpen })}>
        {" "}
        <iframe
          width="100%"
          height="100%"
          src={`https://docs.google.com/gview?url=${
            mediaUrl + id
          }&embedded=true`}
          frameborder="0"
        ></iframe>
      </div>
    </Fragment>
  );
}

export default Sidebar;
