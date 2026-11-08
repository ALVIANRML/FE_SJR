import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import MainLayout from "./Layout/MainLayout";
import DashboardUtama from "./Page/Dashboard/DasboardUtama";
import Stok from "./Page/Dashboard/Stok";
import Tebusan from "./Page/Dashboard/Tebusan/Tebusan";
import BuatTebusan from "./Page/Dashboard/Tebusan/BuatTebusan";
import ProtectedRoute from "./assets/Component/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute/>}>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardUtama />} />
        <Route path="/stok" element={<Stok />} />
        <Route path="/tebusan" element={<Tebusan />} />
        <Route path="/tebusan/buat-tebusan" element={<BuatTebusan />} />
      </Route>
      </Route>
    </Routes>
  );
}
export default App;
