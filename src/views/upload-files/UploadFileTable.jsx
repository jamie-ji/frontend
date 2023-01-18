import classNames from "classnames";
import React, { Fragment, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Input, Table } from "reactstrap";
import { nameHandler } from "../../@components/data-manager";
import { dateFunction } from "../../@components/date-management";
import Sidebar from "../../@components/sidebar";
import GoogleDocsViewer from "react-google-docs-viewer";

function UploadFileTable({
  author,
  allFiles,
  selectFileHandler,
  selectedFiles,
  checked,
  selectAll,
  status,
  authorName,
}) {
  const [open, setOpen] = useState("");

  return (
    <Fragment>
      {/* <iframe
        width="100%"
        height="100%"
        src={`https://docs.google.com/gview?url=${"http://192.168.18.7:8000/media/documenmt/5_lesser_rcuXlET.docx"}&embedded=true`}
        frameborder="0"
      ></iframe>
      //
      <GoogleDocsViewer
        width="100%"
        height="780px"
        fileUrl="http://192.168.18.7:8000/media/documenmt/5_lesser_rcuXlET.docx"
      /> */}
      <Table className="mb-0" responsive>
        <thead>
          <tr>
            <th>
              <Input
                type="checkbox"
                checked={selectedFiles.length === allFiles.length}
                onChange={(e) => selectAll(e, selectedFiles)}
              />
            </th>
            <th></th>
            <th>File</th>
            <th>Author</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {allFiles.map((item, index) => (
            <tr
              key={index}
              className={classNames({
                "bg-gray-nt":
                  author && author.length && !authorName.includes(item.author),
              })}
            >
              <td>
                <Input
                  disabled={
                    author && author.length && !authorName.includes(item.author)
                  }
                  onChange={(e) => selectFileHandler(e, item.id)}
                  type="checkbox"
                  checked={selectedFiles.includes(item.id)}
                  id={item.id}
                />
              </td>
              <td>
                {author &&
                author.length &&
                authorName.includes(item.author) &&
                checked &&
                status ? (
                  <span>
                    {checked.includes(item.id) ? (
                      <CheckCircle className="text-success" size={15} />
                    ) : (
                      <XCircle className="text-danger" size={15} />
                    )}
                  </span>
                ) : (
                  ""
                )}
              </td>

              <td>
                <img
                  src={require("../../@core/images/word.png")}
                  style={{
                    height: "20px",
                    objectFit: "contain",
                  }}
                  alt=""
                />
                {item.file_name
                  ? nameHandler(item.file_name.split("/")[1])
                  : ""}{" "}
                <Sidebar mediaUrl={item.full_url} />
              </td>
              <td>{item.author ? item.author : "---"}</td>
              <td>{dateFunction(item.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default UploadFileTable;
