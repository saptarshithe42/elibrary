import { Navigate, Route, Routes } from "react-router-dom";
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
import SearchResults from "./pages/search/SearchResults";
import OffCanvas from "./components/OffCanvas";
import Favourites from "./pages/favourites/Favourites";
import UploadedBooks from "./pages/uploaded_books/UploadedBooks"
import DownloadedBooks from "./pages/download_books/DownloadedBooks";


function App() {

  const { user } = useAuthContext()

  console.log(user);

  return (
    <div className="App">
      <Navbar />
      {user && <OffCanvas />}
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {user && <Route path="/favourites" element={<Favourites />} />}

          {user && <Route path="/uploaded_books" element={<UploadedBooks />} />}

          {user && <Route path="/downloaded_books" element={<DownloadedBooks />} />}

          <Route path="/book_upload" element={
            user !== null ? <BookUpload /> : <Dashboard />
          } />

          <Route path="/book/:id" element={<BookDetails />} />

          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/login" element={!user ? <Login /> : <Dashboard />} />

          <Route path="/signup" element={!user ? <Signup /> : <Dashboard />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
