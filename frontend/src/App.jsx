import Layout from "./layouts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppNavbar from "./components/AppNavbar";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Layout>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
        <AppNavbar />
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
