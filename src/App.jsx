import { Route, Routes } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/Navbar"
import { useAuthContext } from "./hooks/useAuthContext";


// pages
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import BookUpload from "./pages/book_upload/BookUpload";
import BookDetails from "./pages/book_details/BookDetails";

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/book_upload" element={
            user !== null ? <BookUpload /> : <Dashboard />
          } />

          <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
