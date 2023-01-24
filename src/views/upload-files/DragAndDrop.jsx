import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { RiDragDropLine } from "react-icons/ri";

const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: "0.375rem",
  borderColor: "#185db8",
  borderStyle: "solid",
  background: "rgba(255,255,255,0)",
  color: "#185db8",
  transition: ".25s ease-in-out",
  outline: "none",
  width: "100%",
  height: "12vh",
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

export default function DragAndDrop(props) {
  const { uploadFileHandler } = props;
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      for (let i in acceptedFiles) {
        uploadFileHandler(acceptedFiles[i]);
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
      <div className="pointer waves-effect " {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="text-center">
          <RiDragDropLine fontSize={30} />
          <br />
          Drop your folder here.
        </div>
      </div>
    </React.Fragment>
  );
}
