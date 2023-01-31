import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDescription from "./MovieDescription";
import Page404 from "./Page404";

import Welcome from "./Welcome";
import MoviesSearch from "./MoviesSearch";
import Notfound from "./Notfound";

// OMDb Api key=b310fc2a

const API_URL = "http://www.omdbapi.com/?apikey=b310fc2a";

// set router to each page/path      "Notfound,Welcome" will implement in the future
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesSearch />} exact />
        {/*<Route path="/a" element={<Welcome />} />  --- will implement in the future*/}
        <Route path="/movie/:abc" element={<MovieDescription />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/error" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
