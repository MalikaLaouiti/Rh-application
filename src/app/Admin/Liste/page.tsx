import React from 'react';
import List from '@/components/component/employee-admin-list';
import "@/app/globals.css";

const ListePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <List />
    </div>
  );
};

export default ListePage;

