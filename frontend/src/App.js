import React from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Landing,{ loader as landingLoader } from "./pages/landingPage/Landing";
import Register,{loader as registerLoader} from "./pages/Register";
// import NotFound from "./components/NotFound";
// import Landing,{ loader as landingLoader }  from "./pages/Landing";
// import NotFound from "./components/NotFound";
// import Register,{loader as registerLoader} from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} loader={landingLoader} />
      <Route path="/signup" element={<Register />} loader={registerLoader} />
      {/* <Route path="/home" element={<HomePage />} loader={homeloader} />
      <Route path="/gallery" element={<Gallery />} loader={galleryloader} />
      <Route path="/contactus" element={<Contactus />} />
      <Route
        path="/connections"
        element={<Userconnect />}
        loader={userconnectloader}
      />
      <Route path="/queries" element={<Queries />} loader={queryloader} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/updateuser" element={<UpdateProfile />} />
      <Route path="/account/reset" element={<ResetPassword />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;