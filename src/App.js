import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDirectory from "./components/UserDirectory";
import UserDetail from "./components/UserDetail";
import UserDirectoryClass from "./components/UserDirectoryClass";
import UserDetailClassWrapper from "./components/UserDetailClassWrapper";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserDirectory />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/page2" element={<UserDirectoryClass />} />
          <Route path="/user-class/:id" element={<UserDetailClassWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
