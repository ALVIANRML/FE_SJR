import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username wajib diisi";
    if (!password) newErrors.password = "Password wajib diisi";
    // else if (password.length < 6)
    //   newErrors.password = "Password minimal 6 karakter";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    console.log(username);
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        username,
        password,
      });

      const token = response?.data?.access_token;
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err)
      if (err.response?.status === 401) {
        setServerError("Username atau password salah");
      } else {
        setServerError("Terjadi kesalahan pada server");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border px-3.5 py-3 text-base outline-none transition focus:ring-4 ${
      hasError
        ? "border-red-600 focus:border-red-600 focus:ring-red-600/15"
        : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-600/15"
    }`;

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-blue-600 to-blue-300 text-gray-800 md:grid-cols-[2fr_3fr] md:bg-none lg:grid-cols-2">
      <aside className="hidden items-center justify-center bg-gradient-to-br from-blue-600 to-blue-300 p-8 text-white md:flex lg:p-12">
        <div className="max-w-md">
          <h1 className="mb-3 mt-6 text-3xl font-bold lg:text-4xl">Dokumate</h1>
          <p className="text-lg leading-relaxed opacity-90">
            Masuk untuk melanjutkan ke akun Anda dan mulai bekerja.
          </p>
        </div>
      </aside>

      {/* Panel form */}
      <main className="flex items-center justify-center p-4 sm:p-6 md:bg-white md:p-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-sm rounded-2xl bg-white px-5 py-7 shadow-2xl sm:px-8 sm:py-9 md:max-w-md md:rounded-none md:p-0 md:shadow-none"
        >
          <div className="mb-7 text-center md:text-left">
            <div className="mx-auto mb-4 grid h-14 w-50 place-items-center rounded-2xl bg-blue-600 text-2xl font-bold text-white md:hidden">
              Dokumate
            </div>
            <h2 className="mb-2 hidden text-2xl font-bold sm:block sm:text-3xl">
              Masuk
            </h2>
            <p className="text-gray-500">
              Silakan masukkan username dan password Anda
            </p>
          </div>

          {serverError && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
            >
              {serverError}
            </div>
          )}

          {/* Username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-1.5 block  text-sm font-semibold text-left"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={!!errors.username}
              className={inputClass(errors.username)}
            />
            {errors.username && (
              <span className="mt-1.5 block text-sm text-red-600">
                {errors.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-left"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className={`${inputClass(errors.password)} pr-28`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-500 hover:bg-gray-100"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="mt-1.5 block text-sm text-red-600">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </main>
    </div>
  );
}
