import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FreeMint from "./components/freemint/FreeMint";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InsidePage from "./components/InsidePage";
import Collection from "./components/freemint/Collection";
// import WhatWeDo from "./components/whatwedo/WhatWeDo";

const App = () => {
  return (
    <Router>
      <div id="outerContainer">
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<FreeMint />}></Route>
          <Route exact path="/:collection" element={<Collection />}></Route>
          <Route
            exact
            path="/:collection/:slug"
            element={<InsidePage />}
          ></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
