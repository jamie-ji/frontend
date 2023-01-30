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

function Container() {
  const [data, setData] = useState({}),
    [allFiles, setAllFiles] = useState([]),
    [selectedFiles, setSelectedFiles] = useState([]),
    [processing, setProcessing] = useState(false),
    [uploading, setUploading] = useState(false),
    [btnComplete, setBtnComplete] = useState(false),
    [btnProcess, setBtnProcess] = useState(false),
    [threshold, setThreshold] = useState(""),
    [taskId, setTaskId] = useState(""),
    [tester, setTester] = useState([]),
    [uploadedCount, setUploadedCount] = useState(0),
    [errCount, setErrCount] = useState(0),
    [author, setAuthor] = useState([]);


  const authorName = author.map((i) => i.label);

  const handleIdByAuthor = (arr) => {
    let ids = [];
    for (let i = 0; i < arr.length; i++) {
      const newIds = allFiles.filter((c) => c.author === arr[i]);
      const idArr = newIds.map((i) => i.id);
      ids.push(...idArr);
      // setSelectedFiles((c) => c.concat(idArr));
    }
    setSelectedFiles(ids);
  };
  const selectAuthorHandler = (e) => {
    const allAuth = e.map((i) => i.label);
    if (allAuth.includes("All authors")) {
      setAuthor(authors);
      handleIdByAuthor(allAuthorName);
    } else {
      setAuthor(e);
      handleIdByAuthor(allAuth);
    }
  };

  const allAuthors = allFiles.filter((i) => i.author).map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i, value: i }));



  const allAuthorName = authors.map((i) => i.label);
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

        // if (res.data.error !== null) {
        // }
        // setTaskId(res.data.task_id);
      })
      .catch(() => {
        setProcessing(false);
        setBtnComplete(false);
      });
  };

  const handleProcess = () => {
    if (author.length === 0) {
      toastify("error", AiOutlineInfoCircle, "Author", "Select author");
    } else {
      setData("");
      setProcessing(true);
      axios
        .post(`${baseUrl}/documentchecker/task/`, {
          authors: authorName,
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
    setUploadedCount((c) => c + 1);
    // setModal(true);
    let form_data = new FormData();
    form_data.append("file", file);
    axios
      .post(`${baseUrl}/documentchecker/file/`, form_data)
      .then((res) => {

        setAllFiles((c) => c.concat(res.data));
        setSelectedFiles((c) => c.concat(res.data.id));

        // setUploadedCount(uploadedCount + 1);


        setUploading(false);

        // setSpinner(false);
        // setModal(false);
      })
      .catch((e) => {
        setUploading(false);
        setErrCount((c) => c + 1);
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
    if (e.target.checked) {
      setSelectedFiles(allFiles.map((i) => i.id));

      setData({});
      setBtnProcess(false);
      setProcessing(false);
    } else {
      setSelectedFiles([]);
      // setAuthor([]);
      setData({});
      setBtnProcess(false);
      setProcessing(false);
    }
  };

  // ** to show check icons
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

  const fileUploadPercentage =
    ((allFiles.length + errCount) / uploadedCount) * 100;

  const checked = checkHandler();


  const getThreshold = () => {
    axios
      .get(`${baseUrl}/configurations/`)
      .then((res) => {
        setThreshold(res.data);
      })
      .catch((e) => {});

  };
  useEffect(() => {
    getThreshold();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // getTask()
  //     if (processing) {
  //       getTask(taskId);
  //     }
  //   }, 1000 * 5);
  //   return () => clearInterval(interval);
  // }, [taskId, processing]);
  const handleIdByAuthor = (arr) => {
    let ids = [];
    for (let i = 0; i < arr.length; i++) {
      const newIds = allFiles.filter((c) => c.author === arr[i]);
      const idArr = newIds.map((i) => i.id);
      ids.push(...idArr);
      // setSelectedFiles((c) => c.concat(idArr));
    }
    setSelectedFiles(ids);
  };
  const selectAuthorHandler = (e) => {
    const authorList = e.filter((i) => i.label !== "All authors");
    // setAuthor(authorList);
    const allAuth = e.map((i) => i.label);
    if (allAuth.includes("All authors")) {
      setAuthor(authors);
      handleIdByAuthor(allAuthorName);
    } else {
      setAuthor(e);
      handleIdByAuthor(allAuth);
    }

    // if (checkType) {
    //   console.log("false");
    // } else {
    //   console.log("true");
    // }
    // console.log(allAuth);
  };
  const getThreshold = () => {
    axios
      .get(`${baseUrl}/configurations/`)
      .then((res) => {
        setThreshold(res.data.threshold);
        // console.log("thrushold", thrushold);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  useEffect(() => {
    // if (allFiles.length > 0 && allFiles.length === selectedFiles.length) {
    //   console.log("QQ");
    getThreshold();
    // }
  }, []);

  // console.log("trushold", thrushold);
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
              <Progress
                className="mt-2"
                animated
                striped
                value={fileUploadPercentage ? fileUploadPercentage : 0}
                color={completedColor(
                  fileUploadPercentage ? fileUploadPercentage : 0
                )}
              >
                File Uploading{" "}
                {fileUploadPercentage ? Math.round(fileUploadPercentage) : 0}%
              </Progress>
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
                      {/* <Select
                        color="primary"
                        options={[{ label: "All authors" }, ...authors]}
                        value={author}
                        onChange={(e) => {
                          setBtnProcess(false);

                          setData({});


                          selectAuthorHandler(e);
                          setProcessing(false);
                        }}
                        placeholder="Select Author"
                        components={{ Option: CustomOption }}
                        isMulti

                      
                      /> */}
                    </Col>
                  </Row>
                </CardHeader>

                <UploadFileTable
                  authorName={authorName}
                  allFiles={allFiles}
                  author={author}
                  selectedFiles={selectedFiles}
                  selectFileHandler={selectFileHandler}
                  checked={checked}
                  selectAll={selectAll}
                  status={btnComplete || data.status === "Complete"}
                />


                <CardFooter>
                  {fileUploadPercentage === 100 &&
                  selectedFiles.length >= threshold.threshold ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        handleProcess();
                      }}
                      disabled={
                        processing || data.status === "Complete" || btnProcess
                      }
                    >
                      Complete {processing && <Spinner size="sm" />}
                    </Button>
                  ) : (
                    <CardBody>
                      {fileUploadPercentage < 100 ? (
                        ""
                      ) : (
                        <Alert color="danger">
                          {" "}
                          {allFiles.length >= threshold.threshold &&
                          selectedFiles.length < threshold.threshold
                            ? "Select more files"
                            : "Add more files"}
                        </Alert>
                      )}

                    </CardBody>
                  )}
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
