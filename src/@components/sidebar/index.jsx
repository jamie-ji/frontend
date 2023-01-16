import React, { Fragment, useState } from "react";
import classNames from "classnames";
// import { mediaUrl } from "../constants/index";
import { Button } from "reactstrap";
import GoogleDocsViewer from "react-google-docs-viewer";

function Sidebar({ id, mediaUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Button
        size="sm"
        className="p-0 text-primary"
        color="default"
        onClick={() => setIsOpen(true)}
        style={{ fontSize: "10px" }}
      >
        <u>View</u>
      </Button>
      <div
        onClick={() => setIsOpen(false)}
        className={classNames("sidebar-overlay", {
          show: isOpen,
        })}
      ></div>
      <div className={classNames("sidebar", { show: isOpen })}>
        {" "}
        {/* <iframe
          width="100%"
          height="100%"
          src={`https://docs.google.com/gview?url=${
            mediaUrl + id
          }&embedded=true`}
          frameborder="0"
        ></iframe> */}
        <GoogleDocsViewer width="100%" height="780px" fileUrl={mediaUrl} />
      </div>
    </Fragment>
  );
}

export default Sidebar;
