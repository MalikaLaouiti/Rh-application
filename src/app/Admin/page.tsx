import React from 'react';
import Dash from '@/components/component/admin-dashboard';
import "@/app/globals.css";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Dash />
    </div>
  );
};

export default AdminPage;
