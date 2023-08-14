import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CategoryList from "./components/CategoryList";
import CategoryCreate from "./components/CategoryCreate";
import CategoryUpdate from "./components/CategoryUpdate";
import CategoryDelete from "./components/CategoryDelete";
import SubcategoryList from "./components/SubcategoryList";
import SubcategoryCreate from "./components/SubcategoryCreate";
import SubcategoryUpdate from "./components/SubcategoryUpdate";
import SubcategoryDelete from "./components/SubcategoryDelete";
import Alert from "./components/Alert";
import { useEffect, useState } from "react";
import Categories from "./components/GuestPages/Categories";
import Subcategories from "./components/GuestPages/Subcategories";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Add an event listener to update the online status
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      {!isOnline && (
        <Alert AlertMessage={<b>Oops! No internet connection.</b>}></Alert>
      )}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route
            path="/categories/:category_id/update"
            element={<CategoryUpdate />}
          />
          <Route path="/categories/:id/delete" element={<CategoryDelete />} />

          <Route
            path="/subcategories/:categoryId"
            element={<SubcategoryList />}
          />
          <Route
            path="/subcategories/create/:categoryId"
            element={<SubcategoryCreate />}
          />
          <Route
            path="/subcategories/:categoryId/update/:subcategoryId"
            element={<SubcategoryUpdate />}
          />
          <Route
            path="/subcategories/:categoryId/delete/:subcategoryId"
            element={<SubcategoryDelete />}
          />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />

          <Route path="/categoryitems" element={<Categories />} />
          <Route path="/subcategory/:categoryId" element={<Subcategories />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
