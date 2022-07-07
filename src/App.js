// import { Container, Row, Col } from "react-bootstrap";

import { Col, Container, Image, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container style={{ width: "400px" , height:"200px"}}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/update-profile" element={<UpdateProfile/>} />
            </Routes>

          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;