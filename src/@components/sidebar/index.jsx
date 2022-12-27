import React, { Fragment } from "react";
import classNames from "classnames";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <Fragment>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNames("sidebar-overlay", {
          show: isOpen,
        })}
      ></div>
      <div className={classNames("sidebar", { show: isOpen })}>
        {" "}
        <iframe
          width="100%"
          height="100%"
          src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
          frameborder="0"
        ></iframe>
      </div>
    </Fragment>
  );
}

export default Sidebar;
