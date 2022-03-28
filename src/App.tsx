import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Emblem.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Simulador de investimento
        </Navbar.Brand>
      </Navbar>
      <Outlet />
    </div>
  );
}
