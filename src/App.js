

import { Routes, Route } from "react-router-dom";
import NavBar from "./layouts/NavBar";
import About from "./pages/About";
import AddUser from "./pages/AddUser";
import Home from "./pages/Home";
import UpdateUser from "./pages/UpdateUser";
import UserProfile from "./pages/UserProfile";


function App() {
  return (
      <>

          <NavBar />
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/about" element={ <About /> } />
            <Route exact path="/addUser" element={ <AddUser /> } />
            <Route exact path="/editUser/:id" element={ <UpdateUser /> } />
            <Route exact path="/profile/:id" element={ <UserProfile /> } />
          </Routes>

 

          
      </>
  );
}

export default App;
