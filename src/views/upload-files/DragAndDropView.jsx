import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload, AiOutlineInfoCircle } from "react-icons/ai";

import { RiDragDropLine } from "react-icons/ri";

import toastify from "../../@components/toastify";

const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "gray",
  borderStyle: "dashed",
  background: "rgba(255,255,255,0)",
  color: "#185db8",
  transition: ".25s ease-in-out",
  outline: "none",
  width: "100%",
  height: "50vh",
};

const activeStyle = {
  borderColor: "#54B2FC",
  color: "#54B2FC",
};

const acceptStyle = {
  borderColor: "#54B2FC",
  color: "#54B2FC",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function DragAndDropView(props) {
  const [isOverlay, setIsOverlay] = useState(false);
  const { uploadFileHandler, added, children } = props;
  const onDrop = useCallback((acceptedFiles) => {
    setIsOverlay(false);
    if (acceptedFiles) {
      for (let i in acceptedFiles) {
        const fileExt = acceptedFiles[i].name.split(".").pop();
        if (fileExt === "doc" || fileExt === "docx") {
          uploadFileHandler(acceptedFiles[i]);
        } else {
          toastify(
            "error",
            AiOutlineInfoCircle,
            "Invalid file",
            `${acceptedFiles[i].name} is not allow as it is ${acceptedFiles[
              i
            ].name
              .split(".")
              .pop()} file`
          );
        }
      }

      Array.from(acceptedFiles).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  });
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ".doc .docx",
  });
  const newInputProps = (arg) => {
    return {
      ...getRootProps({ arg }),
      onClick: null,
      onDragOver: () => setIsOverlay(true),
      onDragLeave: () => setIsOverlay(false),
    };
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <React.Fragment>
      <div
        className="pointer waves-effect drag-container"
        {...newInputProps(style)}
      >
        <input {...getInputProps()} />
        {isOverlay && (
          <div className="drag-overlay">
            <AiOutlineCloudUpload size={100} />
            <h5>Upload here</h5>
          </div>
        )}
        {children}
      </div>
    </React.Fragment>
  );
}
