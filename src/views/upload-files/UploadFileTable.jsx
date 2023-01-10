import classNames from "classnames";
import React, { Fragment, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Input, Table } from "reactstrap";
import { nameHandler } from "../../@components/data-manager";
import { dateFunction } from "../../@components/date-management";
import Sidebar from "../../@components/sidebar";

function UploadFileTable({
  author,
  allFiles,
  selectFileHandler,
  selectedFiles,
  checked,
  status,
}) {
  const [open, setOpen] = useState("");
  return (
    <Fragment>
      <Table className="mb-0" responsive>
        <thead>
          <tr>
            <th></th>
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
                "bg-gray-nt": author && item.author !== author,
              })}
            >
              <td>
                <Input
                  disabled={author && item.author !== author}
                  onChange={(e) => selectFileHandler(e, item.id)}
                  type="checkbox"
                  checked={selectedFiles.includes(item.id)}
                  id={item.id}
                />
              </td>
              <td>
                {item.author === author && checked && status && (
                  <span>
                    {checked.includes(item.id) ? (
                      <CheckCircle className="text-success" size={15} />
                    ) : (
                      <XCircle className="text-danger" size={15} />
                    )}
                  </span>
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
                <Sidebar
                  isOpen={open === item.id}
                  setIsOpen={setOpen}
                  id={item.id}
                />
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
