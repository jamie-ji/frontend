import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  Modal,
  ModalFooter,
  Table,
} from "reactstrap";
import DotSpinner from "./DotSpinner";
import DragAndDrop from "./DragAndDrop";
import { baseUrl } from "../../@components/constants";
import { RiAddFill } from "react-icons/ri";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { CustomOption } from "../../@components/data-manager";
import { forEveryKeyLoop } from "../../@components/loops";
export default function UploadFiles() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false),
    [spinner, setSpinner] = useState(false),
    [added, setAdded] = useState(false),
    [allFiles, setAllFiles] = useState([]),
    [author, setAuthor] = useState(""),
    [selectedFiles, setSelectedFiles] = useState([]);
  const allAuthors = allFiles.map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i }));
  useEffect(() => {
    setModal(true);
  }, []);

  const uploadFileHandler = (file) => {
    setSpinner(true);
    setModal(true);
    let form_data = new FormData();
    form_data.append("file", file);
    axios
      .post(`${baseUrl}/documentchecker/`, form_data)
      .then((res) => {
        console.log(res);
        setAllFiles((c) => c.concat(res.data));
        setSelectedFiles((c) => c.concat(res.data.id));
        setAdded(true);
        setSpinner(false);
        setModal(false);
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          forEveryKeyLoop(e.response.data);
        }
        setAdded(true);
        console.log(e);
        setSpinner(false);
        setModal(false);
      });
  };

  const selectFileHandler = (e, id) => {
    if (!e.target.checked) {
      setSelectedFiles(selectedFiles.filter((i) => i !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };
  return (
    <Fragment>
      <Modal isOpen={modal} centered toggle={() => setModal(false)}>
        <div className="upload-file-modal">
          {spinner ? (
            <DotSpinner />
          ) : (
            <DragAndDrop
              uploadFileHandler={uploadFileHandler}
              added={added}
              setModal={setModal}
            />
          )}
        </div>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => (added ? setModal(false) : navigate("/files"))}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div className="container my-5">
        {allFiles.length ? (
          <Card>
            <Table className="mb-0">
              <thead>
                <tr>
                  <td></td>
                  <td>File</td>
                </tr>
              </thead>
              <tbody>
                {allFiles.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Input
                        onChange={(e) => selectFileHandler(e, item.id)}
                        type="checkbox"
                        checked={selectedFiles.includes(item.id)}
                        id={item.id}
                      />
                    </td>
                    <td>{item.path ? item.path.split("/")[1] : ""}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <CardFooter>
              <div className="d-flex justify-content-between">
                <div>
                  <Select
                    options={authors}
                    value={{ label: author }}
                    onChange={(e) => setAuthor(e.label)}
                    placeholder="Select Author"
                    components={{ Option: CustomOption }}
                    // theme={theme}
                  />
                </div>
                <div>
                  <Button color="primary" onClick={() => setModal(true)}>
                    <RiAddFill /> Add more files
                  </Button>
                  <Button color="primary" onClick={() => setModal(true)}>
                    Submit
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardBody>
              <Alert color="danger">No file</Alert>
            </CardBody>
          </Card>
        )}
      </div>
    </Fragment>
  );
}
