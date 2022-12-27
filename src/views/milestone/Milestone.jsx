import { assertExpressionStatement } from "@babel/types";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { GrDocumentText } from "react-icons/gr";

import { Link } from "react-router-dom";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  List,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import RippleButton from "../../@components/ripple-button/index";
import Sidebar from "../../@components/sidebar";
import wave, { clearEffect } from "wave-effect";
import "wave-effect/dist/wave.css";

function Milestone() {
  const [selectedFile, setSelectedFile] = useState([]),
    [values, setValues] = useState(""),
    [loading, setLoading] = useState(false),
    [selectedRows, setSelectedRows] = useState([]),
    [tester, setTester] = useState([]),
    [list, setList] = useState([]),
    [open, setOpen] = useState(false);
  const debugMode = true;
  const baseUrl = "http://192.168.18.147:7000";
  const allAuthors = selectedFile.map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i }));
  const handleSelectCheck = (e, id) => {
    // console.log("id", id);
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, id]);
      setTester([...tester, tester]);
    } else {
      // selectedRows.splice(selectedRows.indexOf(id), 1);
      // setTester([...tester, tester]);

      setSelectedRows(selectedRows.filter((i) => i !== id));
    }
  };
  const handleSelect = (e, name) => {
    setValues({ ...values, [name]: e });
  };
  const fileHandleChange = (event, id) => {
    console.log("id", id);
    if (event.target.files.length > 0) {
      const allFiles = event.target.files;
      for (let i = 0; i < allFiles.length; i++) {
        const newId = `file-${id}`;
        const newArray = selectedFile;
        let form_data = new FormData();
        form_data.append("file", allFiles[i]);
        // form_data.append("folder", "CommentFiles");

        axios
          .post(`${baseUrl}/documentchecker/`, form_data)
          .then((res) => {
            console.log("New Data", res.data.path);

            // setSelectedFile([...selectedFile, res.data]);
            setSelectedFile((c) => c.concat(res.data));
          })
          .catch(() => {
            // ** setBlocking(false);
          });
      }
    } else {
      console.log("");
    }
  };
  console.log("selectedFile", selectedFile);

  return (
    <Fragment>
      <Sidebar isOpen={open} setIsOpen={setOpen} />
      <div className="container">
        <div className="navbar_container">
          <h5>Milestone</h5>
        </div>
        {/* <button onClick={() => setOpen(!open)}>open</button> */}
        {/* {checkList.map((item, index) => ( */}
        <Card className="my-3">
          <CardHeader className="d-flex justify-content-between">
            <CardTitle tag={"h5"}>Upload File</CardTitle>

            <div className="d-flex">
              <div style={{ width: "200px" }}>
                {/* to be change */}
                <Select options={authors} placeholder="Select Author" />
              </div>
              <div className="d-flex flex-wrap ">
                <RippleButton>
                  <Label for="fusk" className="label-size">
                    {" "}
                    Upload
                  </Label>
                </RippleButton>
                <input
                  id="fusk"
                  className="wave-effect"
                  type="file"
                  data="Upload"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => fileHandleChange(e)}
                />
                {/* {selectedFile
                  ? selectedFile.map((file, fileInd) => {
                      const fileName = file.file;
                      // const splittedFileName = fileName.split(".");
                      // const fileExtension = splittedFileName.slice(-1)[0];
                      setList(file);
                    })
                  : ""} */}
              </div>
            </div>
          </CardHeader>

          <Row>
            <Col>
              {/* <Label>Files :</Label> */}
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th colSpan={2}>File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFile.map((item, index) => (
                      // const fileName = item.file;
                      // const splittedFileName = fileName.split("/");
                      // const fileExtension = splittedFileName.slice(-1)[0];

                      // return (
                      <tr key={index}>
                        <td>
                          <Input
                            id={`full_url-${item.id}-${index}`}
                            checked={selectedRows.includes(item.id)}
                            onChange={(e) =>
                              handleSelectCheck(e, item.id, "file-full_url")
                            }
                            type="checkbox"
                            inline
                          />
                        </td>
                        <td
                          className="cursor-pointer text-nowrap"
                          onClick={() => setOpen(!open)}
                        >
                          <span>{item.path}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div style={{ margin: "0.25rem" }}>
                <RippleButton onClick={(e) => fileHandleChange(e)}>
                  Submit {loading && <Spinner size="sm" />}
                </RippleButton>
              </div>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table responsive style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title} </td>
                  <td>{item.cards[0].text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <br />
      </div>
      {/* ))} */}
      {/* <iframe
        src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
        frameborder="0"
      ></iframe> */}
    </Fragment>
  );
}

export default Milestone;
