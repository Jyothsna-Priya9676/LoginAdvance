// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import VerifyOTP from "./pages/VerifyOTP";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";


// function App() {

//   return (
//     <>
//       <Navbar />

//       <Routes>

//         {/* Public Routes */}

//         <Route 
//           path="/register" 
//           element={<Register />} 
//         />

//         <Route 
//           path="/verify-otp" 
//           element={<VerifyOTP />} 
//         />

//         <Route 
//           path="/login" 
//           element={<Login />} 
//         />

//         <Route 
//           path="/forgot-password" 
//           element={<ForgotPassword />} 
//         />

//         <Route 
//           path="/reset-password" 
//           element={<ResetPassword />} 
//         />


//         {/* Protected Route */}

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />


//         {/* Default */}

//         <Route
//           path="*"
//           element={<Login />}
//         />

//       </Routes>

//     </>
//   );
// }


// export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Unknown Routes */}
        <Route
          path="*"
          element={<Navigate to="/register" replace />}
        />

      </Routes>
    </>
  );
}

export default App;

