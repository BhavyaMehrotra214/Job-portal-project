import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";

function Home() {
  return <h2>Home Page</h2>;
}

function Profile() {
  return <h2>Profile Page</h2>;
}

function Jobs() {
  return <h2>Jobs Page</h2>;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Dashboard Layout */}
        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<Jobs />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;