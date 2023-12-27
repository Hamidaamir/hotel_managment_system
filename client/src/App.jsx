import "./App.css";
import { Route, Routes } from "react-router-dom";
import Indexpage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/Registerpage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account" element={<ProfilePage />}></Route>
          <Route path="/account/places" element={<PlacesPage />}></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPage />}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage />}
          ></Route>
          <Route path="/place/:id" element={<PlacePage />}></Route>
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
