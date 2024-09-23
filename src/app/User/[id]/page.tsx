import React from 'react';
import EmployeeDashboard from '@/components/component/employee-dashboard';
    type Props = {
      params: {
        idUser: number;
      };
    };
const EmpDashPage: React.FC<Props> = async ({ params }) => {
  const { idUser } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <EmployeeDashboard idUser={idUser} />
    </div>
  );
};

export default EmpDashPage;

// import { ArticleDetailsPage } from "@/components/component/pages/article-details-page";


// const Page: React.FC<Props> = async ({ params }) => {
//   const { articleDetails } = params;
//   return (
//     <ArticleDetailsPage articleNumber={articleDetails}/>
//   )
// }

// export default Page;