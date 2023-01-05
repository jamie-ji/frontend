import React, { Fragment, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineInfoCircle } from "react-icons/ai";

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

export default function DragAndDrop(props) {
  const { uploadFileHandler, added, setModal } = props;
  const onDrop = useCallback((acceptedFiles) => {
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
  const newInputProps = {
    accept: "",
  };
  console.log("getInputProps", getInputProps());
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
          {added && (
            <Fragment>
              Add more file
              <br />
            </Fragment>
          )}
          Drag and drop your files here.
          <br />
          or
          <br />
          Upload from your computer
        </div>
      </div>
    </React.Fragment>
  );
}
