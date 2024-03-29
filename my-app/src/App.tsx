import "./App.css";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import User from "./Components/User";
import AfterHome from "./Components/AfterHome";
import AdvertisementForm from "./Components/Advertisement";
import Messages from "./Components/Messages";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="sign_In" element={<SignIn />} />
      <Route path="sign_Up" element={<SignUp />} />
      <Route path="user" element={<User />} />
      <Route path="Home_Page" element={<AfterHome />} />
      <Route path="Advertisement_Form" element={<AdvertisementForm />} />
      <Route path="Messages_Page" element={<Messages />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
