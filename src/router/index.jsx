// import Milestone from "./views/Milestone";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Options from "../views/options/index";
import UploadFiles from "../views/upload-files/index";

function Router() {
  return (
    <Fragment>
      <ToastContainer
        newestOnTop
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
        position={"top-center"}
      />
      <div className="navbar_container">
        <h5>Milestone</h5>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Options />} />
          <Route path="/upload-files" element={<UploadFiles />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default Router;
