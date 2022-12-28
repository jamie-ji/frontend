import "./@core/scss/core.scss";
import Milestone from "./views/milestone/Milestone";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <ToastContainer
        newestOnTop
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
        position={"top-center"}
      />
      <Milestone />
    </Fragment>
  );
}

export default App;
