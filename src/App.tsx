import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorListingPage from "./pages/DoctorListingPage";
import { CssBaseline, Box } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<DoctorListingPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
