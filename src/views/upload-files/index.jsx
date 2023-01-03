import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import {
  Alert,
  Badge,
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
import Sidebar from "../../@components/sidebar";
export default function UploadFiles() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false),
    [spinner, setSpinner] = useState(false),
    [added, setAdded] = useState(false),
    [progress, setProgress] = useState(false),
    [allFiles, setAllFiles] = useState([]),
    [author, setAuthor] = useState(""),
    [open, setOpen] = useState(false),
    [taskId, setTaskId] = useState(""),
    [taskIdBoolean, setTaskIdBoolean] = useState(false),
    [progressBar, setProgressBar] = useState(100),
    [list, setList] = useState([]),
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
  const getThrushhold = (id) => {
    axios
      .get(`${baseUrl}/documentchecker/task/${id ? id : taskId}/`)
      .then((res) => {
        setList(res.data);
      });
  };
  console.log("list", list);
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
          setTaskId(res.data.task_id);
          setTaskIdBoolean(true);
          getThrushhold(res.data.task_id);
        })
        .catch((e) => {
          setProgress(false);
          setSpinner(false);
        });
    }
  };
  useEffect(() => {
    if (taskId && taskIdBoolean) {
      getThrushhold();
    }
  }, []);
  return (
    <Fragment>
      <Sidebar isOpen={open} setIsOpen={setOpen} />
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
                    <th></th>
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
                        <img
                          src={require("../../@core/images/word.png")}
                          style={{
                            height: "20px",
                            objectFit: "contain",
                          }}
                          alt=""
                        />
                        {item.path ? item.path.split("/")[1] : ""}
                      </td>
                      <td>{item.author ? item.author : "---"}</td>
                      <td>{dateFunction(item.created_at)}</td>
                      <td
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer text-nowrap edit-class"
                      >
                        {" "}
                        <small>View</small>
                      </td>
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
                    value={100}
                  >
                    100%
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
        {progress && (
          <Fragment>
            <Card>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Files</th>
                    <th>Word count</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {list.length && */}
                  {/* // list÷.map((item, index) => ( */}
                  <tr>
                    <td>
                      {list && list.year_info ? list.year_info.year : "---"}
                    </td>
                    <td>
                      {list && list.year_info
                        ? list.year_info.file_count
                        : "---"}
                    </td>
                    <td>
                      {list && list.year_info
                        ? list.year_info.word_count
                        : "---"}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </Table>
            </Card>
            {progressBar === 100 && (
              <div className="text-center mt-2">
                <RippleButton>Upload</RippleButton>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
