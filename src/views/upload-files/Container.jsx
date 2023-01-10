import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
  Spinner,
} from "reactstrap";
import UILoader from "../../@components/ui-loader/index";
import DragAndDrop from "./DragAndDrop";
import Select from "react-select";
import UploadFileTable from "./UploadFileTable";
import { CustomOption } from "../../@components/data-manager";
import SimilarityCountTable from "./SimilarityCountTable";
import axios from "axios";
import { baseUrl, deBugMode } from "../../@components/constants";
import { forEveryKeyLoop } from "../../@components/loops";
import toastify from "../../@components/toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CheckCircle } from "react-feather";
import Sidebar from "../../@components/sidebar";

function Container() {
  const [data, setData] = useState({}),
    [allFiles, setAllFiles] = useState([]),
    [selectedFiles, setSelectedFiles] = useState([]),
    [processing, setProcessing] = useState(false),
    [uploading, setUploading] = useState(false),
    [isCompleting, setIsCompleting] = useState(false),
    [btnComplete, setBtnComplete] = useState(false),
    [btnProcess, setBtnProcess] = useState(false),
    [taskId, setTaskId] = useState(""),
    [tester, setTester] = useState([]),
    [author, setAuthor] = useState("");
  const error_choices = [
    "File not found",
    "No file with unique content",
    "Unknown author",
    "Threshold not found",
    "Error in file",
  ];
  //   const error = {
  //     file_not_found: "File not found",
  //     no_file_with_unique_content: "No file with unique content",
  //     unknown_file_extension: "Unknown file extension",
  //     unknown_author: "Unknown author",
  //     threshold_not_found: "Threshold not found",
  //   };

  const allAuthors = allFiles.map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i }));

  const completedColor = (arg) => {
    if (arg >= 0 && arg <= 50) {
      return "warning";
    } else if (arg >= 51 && arg <= 80) {
      return "info";
    } else if (arg >= 81 && arg >= 100) {
      return "success";
    }
  };

  const getTask = (id) => {
    axios
      .get(`${baseUrl}/documentchecker/task/${id ? id : taskId}/`)
      .then((res) => {
        setData(res.data);
        if (res.data.status === "Complete") {
          setProcessing(false);
          setBtnComplete(false);
        }
        if (res.data.error) {
          toastify(
            "error",
            AiOutlineInfoCircle,
            "Error",
            error_choices[res.data.error - 1]
          );
          setProcessing(false);
          setBtnComplete(false);
        }
        // if (res.data.error !== null) {
        // }
        // setTaskId(res.data.task_id);
      });
  };

  const handleProcess = () => {
    if (!author) {
      toastify("error", AiOutlineInfoCircle, "Author", "Select author");
    } else {
      setData("");
      setProcessing(true);
      axios
        .post(`${baseUrl}/documentchecker/task/`, {
          author,
          file_id: selectedFiles,
        })
        .then((res) => {
          setTaskId(res.data.task_id);
          setTester([...tester, tester]);
          getTask(res.data.task_id);
          setBtnProcess(true);
        })
        .catch((e) => {
          setProcessing(false);
          if (e.response && e.response.status === 400) {
            forEveryKeyLoop(e.response.data);
            setProcessing(false);
          }
        });
    }
  };
  const uploadFileHandler = (file) => {
    setUploading(true);
    setProcessing(false);
    setData({});
    setBtnProcess(false);

    // setModal(true);
    let form_data = new FormData();
    form_data.append("file", file);
    axios
      .post(`${baseUrl}/documentchecker/file/`, form_data)
      .then((res) => {
        setAllFiles((c) => c.concat(res.data));
        setSelectedFiles((c) => c.concat(res.data.id));
        setUploading(false);

        // setSpinner(false);
        // setModal(false);
      })
      .catch((e) => {
        setUploading(false);
        if (e.response && e.response.status === 400) {
          forEveryKeyLoop(e.response.data);
          setUploading(false);
        }

        // setSpinner(false);
        // setModal(false);
      });
  };
  const selectFileHandler = (e, id) => {
    if (!e.target.checked) {
      setSelectedFiles(selectedFiles.filter((i) => i !== id));
      setData({});
      setBtnProcess(false);
      setProcessing(false);
    } else {
      setSelectedFiles([...selectedFiles, id]);
      setData({});
      setBtnProcess(false);
      setProcessing(false);
    }
  };
  const selectAll = (e, selectedFiles) => {
    // console.log(selectedFiles);
    if (e.target.checked) {
      setSelectedFiles(allFiles.map((i) => i.id));

      setData({});
      setBtnProcess(false);
      setProcessing(false);
    } else {
      setSelectedFiles([]);
      setData({});
      setBtnProcess(false);
      setProcessing(false);
    }
  };
  const checkHandler = () => {
    let files = [];
    if (data.year_details) {
      for (let i = 0; i < data.year_details.length; i++) {
        files.push(...data.year_details[i].file_ids);
      }
      return files;
    } else {
      return null;
    }
  };

  const completPercentage = () => {
    const authFilterList = allFiles.filter((i) => i.author === author);
    const fileCount = authFilterList.length;
    const result = (data.completed_file * 100) / data.threshold_file;

    return {
      result: parseFloat(result ? result : 0).toFixed(2),
      fileCount,
    };
  };
  const completedFiles = completPercentage();
  const checked = checkHandler();

  const completeHandler = (id) => {
    setIsCompleting(true);
    axios
      .patch(`${baseUrl}/documentchecker/task/${id ? id : taskId}/`, {
        complete: true,
      })
      .then((res) => {
        setIsCompleting(false);
        setBtnComplete(true);
        setBtnProcess(true);
        toastify("success", CheckCircle, "Task successfully completed");
      })
      .catch((e) => {
        setIsCompleting(false);
        if (e.response && e.response.status === 400) {
          forEveryKeyLoop(e.response.data);
          setIsCompleting(false);
        }
      });
  };
  const scrollUp = () => {
    window.scrollTo(0, -100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // getTask()
      if (processing) {
        getTask(taskId);
      }
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, [taskId, processing]);

  return (
    <Fragment>
      <div className="container my-5">
        <UILoader blocking={uploading}>
          <Card>
            <CardHeader>
              <DragAndDrop
                setModal={setUploading}
                uploadFileHandler={uploadFileHandler}
              />
            </CardHeader>
          </Card>
          <br />
          {allFiles.length ? (
            <Fragment>
              <Card>
                <CardHeader className="pb-0">
                  <Row>
                    <Col md="9">
                      <CardTitle tag={"h5"}>
                        Select files {deBugMode && `status ${data.status}`}
                      </CardTitle>
                    </Col>
                    <Col md="3">
                      <Select
                        options={authors}
                        value={{ label: author ? author : "Select author" }}
                        onChange={(e) => {
                          setData({});
                          setBtnProcess(false);

                          setAuthor(e.label);
                          setProcessing(false);
                        }}
                        placeholder="Select Author"
                        components={{ Option: CustomOption }}

                        // theme={theme}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <UploadFileTable
                  allFiles={allFiles}
                  author={author}
                  selectedFiles={selectedFiles}
                  selectFileHandler={selectFileHandler}
                  checked={checked}
                  selectAll={selectAll}
                  status={btnComplete || data.status === "Complete"}
                />
                {/* 
                  <SimilarityCountTable data={data} /> */}
                <CardFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleProcess();
                    }}
                    disabled={
                      processing || data.status === "Complete" || btnProcess
                    }
                  >
                    Process {processing && <Spinner size="sm" />}
                  </Button>
                  <br />
                  <br />
                  <div className="text-center">
                    <small>Process</small>
                  </div>
                  <Progress
                    animated
                    striped
                    value={data.progress ? data.progress : 0}
                    color={completedColor(data.progress ? data.progress : 0)}
                  >
                    Processing{" "}
                    {data.progress ? parseFloat(data.progress).toFixed(2) : 0}%
                  </Progress>

                  <div className="text-center mt-1">
                    <small>
                      Complete{" "}
                      {data.threshold_file || data.completed_file
                        ? `(${data.completed_file}/${data.threshold_file})`
                        : ""}{" "}
                      {!processing &&
                        data.threshold_file &&
                        completedFiles.result < 100 && (
                          <span
                            className="span-color"
                            onClick={() => scrollUp()}
                          >
                            Upload more files
                          </span>
                        )}
                    </small>
                  </div>
                  <Progress
                    animated
                    striped
                    className="mb-2"
                    color={completedColor(completedFiles.result)}
                    value={completedFiles.result}
                  >
                    Completed{" "}
                    {completedFiles.result >= 100
                      ? "100.00"
                      : completedFiles.result}
                    %
                  </Progress>
                </CardFooter>
              </Card>
              <br />
              {data.year_details && (
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle tag={"h5"} className="m-0">
                      Similarities {data.threshold_similarity}
                    </CardTitle>
                  </CardHeader>

                  <SimilarityCountTable data={data} />
                  <CardFooter>
                    {data.completed_file >= data.threshold_file && (
                      <Button
                        disabled={data.status === "Failed" || btnComplete}
                        color="primary"
                        onClick={() => {
                          setData({ ...data, status: "Failed" });
                          setProcessing(false);

                          completeHandler();
                        }}
                      >
                        Complete {isCompleting && <Spinner size="sm" />}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )}
            </Fragment>
          ) : (
            <Card>
              <CardBody>
                <Alert color="danger">Add files</Alert>
              </CardBody>
            </Card>
          )}
        </UILoader>
      </div>
    </Fragment>
  );
}

export default Container;
