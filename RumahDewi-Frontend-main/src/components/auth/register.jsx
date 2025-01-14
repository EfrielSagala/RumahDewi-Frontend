import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { register } from "../../Functions/API/fetchAuth";
import { checkPassword, checkPhone } from "../../Functions/libs/regex";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
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
      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("name", name);
      formData.append("password", password);

      const response = await register(formData);

      setSuccess(response.data.message);
      setIsLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-success-subtle m-0 p-0 d-flex justify-content-center align-items-center">
      <Card style={{ width: "33rem" }} className="shadow mx-4 my-5">
        <Card.Body className="mx-md-5 mx-3 mb-5">
          <Card.Title className="text-center fs-3 fw-bold my-4">Daftar</Card.Title>
          <form onSubmit={onSubmit}>
            {success && <div className="alert alert-info text-center">{success}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Masukkan email..."
                aria-describedby="usernameHelpBlock"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">
                Nomor Telepon
              </label>
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="Masukkan nomor telepon..."
                aria-describedby="usernameHelpBlock"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
              />
              {phone != "" && !checkPhone(phone) && (
                <div id="passwordHelpBlock" class="form-text text-danger">
                  Nomor telepon harus berisi 10-13 angka dengan diawali huruf 62
                </div>
              )}
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Masukkan nama..."
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div class="mb-3">
              <label for="identity" class="form-label">
                Foto KTP
              </label>
              <input
                type="file"
                class="form-control"
                id="identity"
                accept="image/*"
                required
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setError("");
                }}
              />
              <div id="note" class="form-text">
                Foto ktp akan digunakan untuk mengidentifikasi anda
              </div>
            </div>
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
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
            {password != "" && !checkPassword(password) && (
              <div id="passwordHelpBlock" class="form-text text-danger">
                Password harus mempunyai minimal 8 karakter dan terdiri dari gabungan huruf besar, huruf kecil, dan angka
              </div>
            )}
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-success w-100" disabled={isLoading || !checkPhone(phone) || !checkPassword(password)}>
                {isLoading ? "Mohon tunggu..." : "Daftar"}
              </button>
              <a href="/" className="btn btn-outline-success w-100 mt-3">
                Kembali ke Home
              </a>
            </div>
            <div className="text-end w-full mt-3">
              <a href="/login">Sudah punya akun ?</a>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};
