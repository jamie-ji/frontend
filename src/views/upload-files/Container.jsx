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
  Input,
  Label,
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
    [threshold, setThreshold] = useState(""),
    [taskId, setTaskId] = useState(""),
    [tester, setTester] = useState([]),
    [author, setAuthor] = useState([]);
  const error_choices = [
    "File not found",
    "No file with unique content",
    "Unknown author",
    "Threshold not found",
    "Error in file",
  ];
  // console.log("allFiles", allFiles);
  const authorName = author.map((i) => i.label);
  //   const error = {
  //     file_not_found: "File not found",
  //     no_file_with_unique_content: "No file with unique content",
  //     unknown_file_extension: "Unknown file extension",
  //     unknown_author: "Unknown author",
  //     threshold_not_found: "Threshold not found",
  //   };

  const allAuthors = allFiles.map((i) => i.author);
  const authors = [...new Set(allAuthors)].map((i) => ({ label: i, value: i }));
  // console.log("autor", authors);
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

  // const getTask = (id) => {
  //   axios
  //     .get(`${baseUrl}/documentchecker/task/${id ? id : taskId}/`)
  //     .then((res) => {
  //       setData(res.data);
  //       if (res.data.status === "Complete") {
  //         setProcessing(false);
  //         setBtnComplete(false);
  //       }
  //       if (res.data.error) {
  //         toastify(
  //           "error",
  //           AiOutlineInfoCircle,
  //           "Error",
  //           error_choices[res.data.error - 1]
  //         );
  //         setProcessing(false);
  //         setBtnComplete(false);
  //       }
  //       // if (res.data.error !== null) {
  //       // }
  //       // setTaskId(res.data.task_id);
  //     });
  // };

  // const handleProcess = () => {
  //   if (!author) {
  //     toastify("error", AiOutlineInfoCircle, "Author", "Select author");
  //   } else {
  //     setData("");
  //     setProcessing(true);
  //     axios
  //       .post(`${baseUrl}/documentchecker/task/`, {
  //         authors: authorName,
  //         // && authorName.includes("All authors")
  //         //   ? allAuthorName
  //         //   : authorName,
  //         file_id: selectedFiles,
  //       })
  //       .then((res) => {
  //         setTaskId(res.data.task_id);
  //         setTester([...tester, tester]);
  //         getTask(res.data.task_id);
  //         setBtnProcess(true);
  //       })
  //       .catch((e) => {
  //         setProcessing(false);
  //         if (e.response && e.response.status === 400) {
  //           forEveryKeyLoop(e.response.data);
  //           setProcessing(false);
  //         }
  //       });
  //   }
  // };
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
        if (!res.data.is_error) {
          setAllFiles((c) => c.concat(res.data));
          setSelectedFiles((c) => c.concat(res.data.id));
        }

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
      // setAuthor([]);
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
    const authFilterList = allFiles.filter((i) =>
      authorName.includes(i.author)
    );
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
    setBtnComplete(true);

    axios
      .post(`${baseUrl}/documentchecker/task/`, {
        file_id: selectedFiles,
      })
      .then((res) => {
        setIsCompleting(false);
        setBtnComplete(false);
        setBtnProcess(true);
        toastify("success", CheckCircle, "Task successfully completed");
      })
      .catch((e) => {
        setIsCompleting(false);
        if (e.response && e.response.status === 400) {
          forEveryKeyLoop(e.response.data);
          setIsCompleting(false);
          setBtnComplete(false);
        }
      });
  };
  const scrollUp = () => {
    window.scrollTo(0, -100);
  };

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
                  {selectedFiles.length >= threshold ? (
                    <Button
                      disabled={btnComplete}
                      color="primary"
                      onClick={() => {
                        // toastify(
                        //   "success",
                        //   CheckCircle,
                        //   "Successfully completed"
                        // );
                        // setData({ ...data, status: "Failed" });
                        setProcessing(false);

                        completeHandler();
                        // getThreshold();
                      }}
                    >
                      Complete {isCompleting && <Spinner size="sm" />}
                    </Button>
                  ) : (
                    <CardBody>
                      <Alert color="danger">Add more files</Alert>
                    </CardBody>
                  )}
                </CardFooter>
              </Card>
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
