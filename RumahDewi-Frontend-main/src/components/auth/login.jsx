import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { login } from "../../Functions/API/fetchAuth";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/";
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login({ email, password });

      localStorage.setItem("token", response?.data?.data?.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vw-100 min-vh-100 bg-success-subtle m-0 p-0 d-flex justify-content-center align-items-center">
      <Card style={{ width: "33rem" }} className="shadow mx-4">
        <Card.Body className="mx-md-5 mx-3 mb-5">
          <Card.Title className="text-center fs-3 fw-bold my-4">Login</Card.Title>
          <form onSubmit={onSubmit}>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Masukkan email..."
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
            <label for="inputPassword5" class="form-label">
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="inputPassword5"
              class="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="Masukkan password..."
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <div className="d-flex align-items-center mt-3">
              <input
                type="checkbox"
                style={{ height: "20px", width: "20px" }}
                className="me-2"
                onChange={(e) => {
                  setShowPassword(e.target.checked ? true : false);
                }}
              />{" "}
              Tampilkan password
            </div>
            {/* <div id="passwordHelpBlock" class="form-text">
              Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div> */}
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                {isLoading ? "Mohon tunggu..." : "Login"}
              </button>
              <a href="/" className="btn btn-outline-success w-100 mt-3">
                Kembali ke Home
              </a>
            </div>
            <div className="text-end w-full mt-3">
              <a href="/register">Belum punya akun ?</a>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};
