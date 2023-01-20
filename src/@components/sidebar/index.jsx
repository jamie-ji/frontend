import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames";
// import { mediaUrl } from "../constants/index";
import { Button } from "reactstrap";
import GoogleDocsViewer from "react-google-docs-viewer";
import FileViewer from "react-file-viewer";

function Sidebar({ id, mediaUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isData, setIsData] = useState(false);
  useEffect(() => {
    setIsData(false);
    setTimeout(() => {
      setIsData(true);
    }, 50);
  }, [isOpen]);
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
        {/* <iframe
          width="100%"
          height="100%"
          src={`https://docs.google.com/gview?url=${
            mediaUrl + id
          }&embedded=true`}
          frameborder="0"
        ></iframe> */}
        {/* <GoogleDocsViewer width="100%" height="780px" fileUrl={mediaUrl} /> */}
        {mediaUrl}
        {isData && (
          <FileViewer
            width="100%"
            height="780px"
            fileType="docx"
            filePath={mediaUrl}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Sidebar;

// https://www.africau.edu/images/default/sample.pdf
