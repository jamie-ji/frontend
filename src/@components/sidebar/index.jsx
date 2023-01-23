import React, { Fragment, useState, useEffect } from "react";
import classNames from "classnames";

import FileViewer from "react-file-viewer";

function Sidebar({ mediaUrl, setIsOpen, isOpen, isData }) {
  return (
    <Fragment>
      <div
        onClick={() => setIsOpen(false)}
        className={classNames("sidebar-overlay", {
          show: isOpen,
        })}
      ></div>
      <div className={classNames("sidebar", { show: isOpen })}>
        {isData && (
          <FileViewer
            style={{ width: "100px", height: "780px" }}
            fileType="docx"
            filePath={mediaUrl}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Sidebar;
