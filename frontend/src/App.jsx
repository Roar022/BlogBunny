import React from "react";
import "./App.css";
import Transitions from "./components/Transition";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Landing, { loader as landingLoader } from "./pages/landingPage/Landing";
import Register, { loader as registerLoader } from "./pages/Register";
import Dashboard, {
  loader as dashboardLoader,
} from "./pages/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import axios from "axios";
import TextEditor, { loader as textLoader } from "./components/TextEditor";
import { ToastContainer } from "react-toastify";
import SingleBlog from "./components/SingleBlog";
import Community from "./pages/Commuity/Community";
import CommunityBlog from "./pages/Commuity/CommunityBlog";
import Explore from "./pages/Explore/Explore";
import ExploreBlog from "./pages/Explore/ExploreBlog";
import { AnimatePresence } from "framer-motion";
import ContactUs from "./pages/ContactUs/ContactUs";
axios.defaults.withCredentials = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <Transitions>
            <Landing />
          </Transitions>
        }
        loader={landingLoader}
      />
      <Route
        path="/signup"
        element={
          <Transitions>
            <Register />
          </Transitions>
        }
        loader={registerLoader}
      />
      <Route path="/dashboard">
        <Route
          index
          element={
            <Transitions>
              <Dashboard />
            </Transitions>
          }
          loader={dashboardLoader}
        />
        <Route
          path=":id"
          element={
            <Transitions>
              <SingleBlog />
            </Transitions>
          }
        />
        <Route
          path="edit"
          element={
            <Transitions>
              <TextEditor />
            </Transitions>
          }
          loader={textLoader}
        />
        <Route
          path="add"
          element={
            <Transitions>
              <TextEditor />
            </Transitions>
          }
          loader={textLoader}
        />
      </Route>
      <Route path="/explore">
        <Route
          index
          element={
            <Transitions>
              <Explore />
            </Transitions>
          }
        />
        <Route
          path=":exid"
          element={
            <Transitions>
              <ExploreBlog />
            </Transitions>
          }
        />
      </Route>
      <Route path="/community">
        <Route
          index
          element={
            <Transitions>
              <Community />
            </Transitions>
          }
        />
        <Route
          path=":cid"
          element={
            <Transitions>
              <CommunityBlog />
            </Transitions>
          }
        />
      </Route>
      <Route
        path="/contactus"
        element={
          <Transitions>
            <ContactUs />
          </Transitions>
        }
      />
      {/*<Route path="/gallery" element={<Gallery />} loader={galleryloader} />
      <Route path="/contactus" element={<Contactus />} />
      <Route
        path="/connections"
        element={<Userconnect />}
        loader={userconnectloader}
      />
      <Route path="/queries" element={<Queries />} loader={queryloader} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/updateuser" element={<UpdateProfile />} />
      <Route path="/account/reset" element={<ResetPassword />} /> */}
      <Route
        path="*"
        element={
          <Transitions>
            <NotFound />
          </Transitions>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <ToastContainer />
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </>
  );
  // return <Navbar />
}

export default App;
