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
  Progress,
  Spinner,
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
import classNames from "classnames";
import RippleButton from "../../@components/ripple-button/index";
import {
  dateAndTimeFunction,
  dateFunction,
} from "../../@components/date-management";
import { Info } from "react-feather";
import toastify from "../../@components/toastify";
export default function UploadFiles() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false),
    [spinner, setSpinner] = useState(false),
    [added, setAdded] = useState(false),
    [progress, setProgress] = useState(false),
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
      setProgress(false);
      setSpinner(false);
    } else {
      setSelectedFiles([...selectedFiles, id]);
      setProgress(false);
      setSpinner(false);
    }
  };
  const processHandler = () => {
    if (!author) {
      toastify("error", Info, "Select Author");
    } else {
      const data = {
        file_id: selectedFiles,
        author,
      };
      axios
        .post(`${baseUrl}/documentchecker/document/`, data)
        .then((res) => {
          setProgress(true);
          setSpinner(true);
        })
        .catch((e) => {
          setProgress(false);
          setSpinner(false);
        });
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
          <Fragment>
            <Card>
              <div className="d-flex justify-content-end me-2 mt-2">
                <div style={{ width: "230px" }}>
                  <Select
                    options={authors}
                    value={{ label: author ? author : "Select author" }}
                    onChange={(e) => setAuthor(e.label)}
                    placeholder="Select Author"
                    components={{ Option: CustomOption }}

                    // theme={theme}
                  />
                </div>
              </div>
              <Table className="mb-0">
                <thead>
                  <tr>
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
                      <td>{item.path ? item.path.split("/")[1] : ""}</td>
                      <td>{item.author ? item.author : "---"}</td>
                      <td>{dateFunction(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter>
                <div className="d-flex justify-content-between">
                  <div>
                    <Button
                      color="primary"
                      onClick={() => {
                        setModal(true);
                        setProgress(false);
                        setSpinner(false);
                      }}
                    >
                      <RiAddFill /> Add more files
                    </Button>
                    <Button
                      disabled={progress === true}
                      color="primary"
                      onClick={() => processHandler()}
                    >
                      Process {spinner && <Spinner size="sm" />}
                    </Button>
                  </div>
                </div>
              </CardFooter>
              {progress && (
                <Fragment>
                  <div className="text-center">Progress</div>
                  <Progress
                    className="m-4"
                    animated
                    striped
                    color="primary"
                    value={50}
                  >
                    50%
                  </Progress>
                </Fragment>
              )}
            </Card>
          </Fragment>
        ) : (
          <Card>
            <CardBody>
              <Alert color="danger">No file</Alert>
            </CardBody>
          </Card>
        )}
        <br />
        <Card>
          <Table className="mb-0">
            <thead>
              <tr>
                <th>File</th>
                <th>Word count</th>
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
                  <td>{item.path ? item.path.split("/")[1] : ""}</td>
                  <td>{item.word_count ? item.word_count : "---"}</td>
                  <td>{item.author ? item.author : "---"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <div className="text-center my-2">
          <RippleButton>Upload</RippleButton>
        </div>
      </div>
    </Fragment>
  );
}
