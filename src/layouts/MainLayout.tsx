// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";


const MainLayout = () => {
  return (
    <div>
      <main>
        <Outlet /> {/* This will render nested page */}
      </main>
    </div>
  );
};

export default MainLayout;
