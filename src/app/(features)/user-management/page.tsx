import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UserList from "@/components/UserTable/UserList";
// import TableThree from "@/components/UserTable/UserList";
import React from "react";

const UserManagement = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="User Management" /> */}
        {/* <TableThree /> */}
        <UserList />
      </div>
    </DefaultLayout>
  );
};

export default UserManagement;
