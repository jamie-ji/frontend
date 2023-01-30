
import React, { Fragment } from "react";
import classNames from "classnames";

import FileViewer from "react-file-viewer";

function Sidebar({ mediaUrl, setIsOpen, isOpen, isData }) {

  const fileExt = mediaUrl ? mediaUrl.split(".").pop() : "docx";


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

            width="100%"
            height="780px"
            fileType={fileExt}

            filePath={mediaUrl}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Sidebar;
