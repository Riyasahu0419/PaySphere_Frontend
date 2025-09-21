







import React, { useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  CssBaseline,
  Switch as MuiSwitch
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TransactionsPage from "./pages/TransactionsPage";
import SchoolTransactionsPage from "./pages/SchoolTransactionsPage";
import StatusCheckPage from "./pages/StatusCheckPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  const [dark, setDark] = useState(false);
  // toggle html class to allow tailwind dark
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const nav = useMemo(
    () => [
      { to: "/", label: "Transactions" },
      { to: "/by-school", label: "By School" },
      { to: "/check-status", label: "Check Status" }
    ],
    []
  );

  return (
    <>
    {}
      <CssBaseline />
      {/* <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-4">
            <IconButton edge="start" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component={Link} to="/" className="no-underline text-inherit">
              School Payments Dashboard
            </Typography>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex gap-4">
              {nav.map((n) => (
                <Typography
                  key={n.to}
                  component={Link}
                  to={n.to}
                  className="no-underline text-sm font-medium"
                >
                  {n.label}
                </Typography>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Typography variant="body2">Dark</Typography>
              <MuiSwitch checked={dark} onChange={() => setDark((s) => !s)} />
            </div>
          </div>
        </Toolbar>
      </AppBar> */}

      <Container maxWidth="xl" className="py-8">
        <Routes>
           <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<TransactionsPage />} />
          <Route path="/by-school" element={<SchoolTransactionsPage />} />
          <Route path="/check-status" element={<StatusCheckPage />} />
        </Routes>
      </Container>
    </>
  );
}




// import React, { useState, useMemo } from "react";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Container,
//   CssBaseline,
//   Switch as MuiSwitch,
//   Button
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { AuthProvider } from './contexts/AuthContext.jsx';

// import PrivateRoute from './components/PrivateRoute.jsx';
// import AuthLayout from './components/AuthLayout.jsx';


// import SchoolTransactionsPage from "./pages/SchoolTransactionsPage";
// import StatusCheckPage from "./pages/StatusCheckPage";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import { useAuth } from "./hooks/useAuth.jsx";
// import TransactionsPage from "./pages/TransactionsPage.jsx";

// // Main App Content Component
// function AppContent() {
//   const [dark, setDark] = useState(false);
//   const { isAuthenticated, logout, user } = useAuth();

//   // toggle html class to allow tailwind dark
//   React.useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//   }, [dark]);

//   const nav = useMemo(
//     () => [
//       { to: "/", label: "Transactions" },
//       { to: "/by-school", label: "By School" },
//       { to: "/check-status", label: "Check Status" }
//     ],
//     []
//   );

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <>
//       <CssBaseline />
      
//       {/* Show AppBar only for authenticated users */}
//       {isAuthenticated && (
//         <AppBar position="sticky" color="inherit" elevation={1}>
//           <Toolbar className="flex justify-between">
//             <div className="flex items-center gap-4">
//               <IconButton edge="start" aria-label="menu">
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h6" component={Link} to="/" className="no-underline text-inherit">
//                 School Payments Dashboard
//               </Typography>
//             </div>
//             <div className="flex items-center gap-6">
//               <nav className="hidden sm:flex gap-4">
//                 {nav.map((n) => (
//                   <Typography
//                     key={n.to}
//                     component={Link}
//                     to={n.to}
//                     className="no-underline text-sm font-medium"
//                   >
//                     {n.label}
//                   </Typography>
//                 ))}
//               </nav>
//               <div className="flex items-center gap-2">
//                 <Typography variant="body2">Dark</Typography>
//                 <MuiSwitch checked={dark} onChange={() => setDark((s) => !s)} />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Typography variant="body2">
//                   Welcome, {user?.name || 'User'}
//                 </Typography>
//                 <IconButton onClick={handleLogout} color="inherit" title="Logout">
//                   <LogoutIcon />
//                 </IconButton>
//               </div>
//             </div>
//           </Toolbar>
//         </AppBar>
//       )}

//       <Container maxWidth={isAuthenticated ? "xl" : "sm"} className="py-8">
//         <Routes>
//           {/* Public routes - only accessible when NOT authenticated */}
//           <Route 
//             path="/login" 
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/" replace />
//               ) : (
//                 <AuthLayout title="Login">
//                   <Login />
//                 </AuthLayout>
//               )
//             } 
//           />
//           <Route 
//             path="/register" 
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/" replace />
//               ) : (
//                 <AuthLayout title="Register">
//                   <Register />
//                 </AuthLayout>
//               )
//             } 
//           />

//           {/* Private routes - only accessible when authenticated */}
//           <Route 
//             path="/" 
//             element={
//               // <PrivateRoute>
//                 <TransactionsPage/>
//               // </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/by-school" 
//             element={
//               // <PrivateRoute>
//                 <SchoolTransactionsPage />
//               // </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/check-status" 
//             element={
//               // <PrivateRoute>
//                 <StatusCheckPage />
//               // </PrivateRoute>
//             } 
//           />

//           {/* Catch all route */}
//           <Route 
//             path="*" 
//             element={
//               <Navigate to={isAuthenticated ? "/" : "/login"} replace />
//             } 
//           />
//         </Routes>
//       </Container>
//     </>
//   );
// }

// // Main App Component
// export default function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }