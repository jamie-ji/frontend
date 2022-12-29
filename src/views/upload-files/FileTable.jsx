import axios from "axios";
import React, { Fragment, useState } from "react";

import Select from "react-select";
import {
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import RippleButton from "../@components/ripple-button/index";
import Sidebar from "../@components/sidebar";
import "wave-effect/dist/wave.css";
import { forEveryKeyLoop } from "../@components/loops";
import { CustomOption } from "../@components/data-manager";

function FileTable() {
  const [selectedFile, setSelectedFile] = useState([]),
    [values, setValues] = useState(""),
    [loading, setLoading] = useState(false),
    [selectedRows, setSelectedRows] = useState([]),
    [tester, setTester] = useState([]),
    [list] = useState([]),
    [open, setOpen] = useState(false),
    [show, setShow] = useState(false);

  const baseUrl = "http://192.168.18.147:7000";
  const allAuthors = selectedFile.map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i }));

  const handleSelectCheck = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, id]);
      setTester([...tester, tester]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== id));
    }
  };
  const handleSelect = (prop) => (e) => {
    setValues({ ...values, [prop]: e });
  };
  const fileHandleChange = (event, id) => {
    setLoading(true);
    console.log("id", id);
    if (event.target.files.length > 0) {
      const allFiles = event.target.files;
      for (let i = 0; i < allFiles.length; i++) {
        let form_data = new FormData();
        form_data.append("file", allFiles[i]);
        axios
          .post(`${baseUrl}/documentchecker/`, form_data)
          .then((res) => {
            console.log("New Data", res.data.path);
            setSelectedFile((c) => c.concat(res.data));
            setSelectedRows((c) => c.concat(res.data.id));
            setLoading(false);
            setShow(true);
          })
          .catch((e) => {
            forEveryKeyLoop(e.response.data);
            setLoading(false);
            // setShow(false);
            // ** setBlocking(false);
          });
      }
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      console.log({
        data: reader.result.split(",").pop(),
        fileName: event.target.files[0].name,
      });
    };
  };
  const handleSubmit = () => {
    setLoading(true);
    alert("Hello");
  };
  // **useEffect(() => {
  //   handleList();
  // }, []);
  return (
    <Fragment>
      <Sidebar isOpen={open} setIsOpen={setOpen} />
      <div className="container">
        {/* <button onClick={() => setOpen(!open)}>open</button> */}
        {/* {checkList.map((item, index) => ( */}
        <Card className="my-3">
          <CardHeader className="d-flex justify-content-between">
            <CardTitle tag={"h5"}>Upload File</CardTitle>

            <div className="d-flex">
              <div style={{ width: "200px" }}>
                {/* to be change */}
                <Select
                  options={authors}
                  value={values.authors}
                  onChange={handleSelect("author")}
                  placeholder="Select Author"
                  components={{ Option: CustomOption }}
                  // theme={theme}
                />
              </div>
              <div className="d-flex flex-wrap ">
                <RippleButton>
                  <Label for="fusk" className="label-size">
                    {" "}
                    Upload {loading && <Spinner size="sm" />}
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
                      <tr key={index}>
                        <td>
                          <Input
                            id={`full_url-${item.id}-${index}`}
                            checked={selectedRows.includes(item.id)}
                            onChange={(e) => handleSelectCheck(e, item.id)}
                            type="checkbox"
                            inline
                          />
                        </td>
                        <td
                          className="cursor-pointer text-nowrap"
                          // onClick={() => setOpen(!open)}
                        >
                          <span>{item.path}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div style={{ margin: "0.25rem" }}>
                {show && (
                  <RippleButton onClick={() => handleSubmit()}>
                    Submit
                  </RippleButton>
                )}
              </div>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table responsive style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Files</th>
                <th>Word count </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td>{item.file} </td>
                  <td>{item.words_count}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Pagination
            pages={list}
            action={handleList}
            // disabled={blocking}
          /> */}
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

export default FileTable;
