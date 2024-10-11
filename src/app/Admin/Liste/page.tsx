import React from 'react';
import List from '@/components/component/employee-admin-list';
import { getAllEmployees } from '@/action/employee';
import "@/app/globals.css";

// Server component for fetching and rendering
export default async function ListePage() {
  // Fetch employees data from the database using Prisma
  const employees = await getAllEmployees();

  // Pass employees to List component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <List employees={employees} />
    </div>
  );
}
