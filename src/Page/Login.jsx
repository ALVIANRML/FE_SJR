import { useState } from "react";
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react";
import axios from "axios";
 
// ====== SESUAIKAN DI SINI ======
const APP_NAME = "Dokumate";
const APP_LOGO = "/logo.png"; // taruh file logo di folder /public
const COMPANY = "PT. Samudra Jaya Raya";
// ===============================
 
function Brand({ className = "", nameClass = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={APP_LOGO}
        alt={`Logo ${APP_NAME}`}
        className="h-11 w-11 shrink-0 rounded-xl bg-white object-contain p-1.5 shadow-md"
      />
      <span className={`text-2xl font-bold tracking-tight ${nameClass}`}>
        {APP_NAME}
      </span>
    </div>
  );
}
 
export default function Login() {
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
    return newErrors;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
 
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
 
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password }
      );
 
      const token = response?.data?.access_token;
      if (!token) {
        setServerError("Respons server tidak valid");
        return;
      }
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (err) {
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
    `w-full rounded-xl border bg-gray-50 py-3 pl-11 pr-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
        : "border-gray-300 focus:border-[#182b55] focus:ring-[#182b55]/15"
    }`;
 
  return (
    <div className="flex min-h-screen flex-col bg-[#182b55] md:grid md:grid-cols-[2fr_3fr] md:bg-white lg:grid-cols-2">
      {/* ===== Panel brand (tablet & laptop) ===== */}
      <aside className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-[#182b55] via-[#1f3a73] to-[#2f5bb7] p-8 text-white md:flex lg:p-14">
        {/* dekorasi */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/5" />
 
        <div className="relative max-w-md">
          <Brand nameClass="text-white" />
          <h1 className="mt-8 text-3xl font-bold leading-tight lg:text-4xl">
            Kelola dokumen dan tebusan dengan lebih mudah.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/80 lg:text-lg">
            Masuk untuk melanjutkan ke akun Anda dan mulai bekerja.
          </p>
        </div>
      </aside>
 
      {/* ===== Header brand (mobile) ===== */}
      <header className="flex justify-center px-4 pb-6 pt-10 md:hidden">
        <Brand nameClass="text-white" />
      </header>
 
      {/* ===== Panel form ===== */}
      <main className="flex flex-1 items-start justify-center px-4 pb-8 sm:px-6 md:items-center md:p-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-sm rounded-2xl bg-white px-5 py-7 shadow-2xl sm:max-w-md sm:px-8 sm:py-9 md:max-w-md md:rounded-none md:bg-transparent md:p-0 md:shadow-none"
        >
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Masuk
            </h2>
            <p className="mt-1.5 text-gray-500">
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
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-1.5 block text-left text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <User
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
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
            </div>
            {errors.username && (
              <span className="mt-1.5 block text-left text-sm text-red-600">
                {errors.username}
              </span>
            )}
          </div>
 
          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-left text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className={`${inputClass(errors.password)} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="mt-1.5 block text-left text-sm text-red-600">
                {errors.password}
              </span>
            )}
          </div>
 
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#182b55] py-3 text-base font-semibold text-white shadow-lg shadow-[#182b55]/25 transition hover:bg-[#223c75] focus:outline-none focus:ring-4 focus:ring-[#182b55]/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Memproses..." : "Masuk"}
          </button>
 
          <p className="mt-8 text-center text-xs text-gray-400 md:text-left">
            © {new Date().getFullYear()} {COMPANY}. All Rights Reserved.
          </p>
        </form>
      </main>
    </div>
  );
}
 