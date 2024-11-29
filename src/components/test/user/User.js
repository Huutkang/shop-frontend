import React from 'react';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import GetAllUsers from './GetAllUsers';
import GetCurrentUser from './GetCurrentUser';
import GetUserById from './GetUserById';
import UpdateUser from './UpdateUser';

const User = () => {
  return (
    <div>
      <section>
        <h2>Add User</h2>
        <AddUser />
      </section>

      <section>
        <h2>Get All Users</h2>
        <GetAllUsers />
      </section>

      <section>
        <h2>Get Current User</h2>
        <GetCurrentUser />
      </section>

      <section>
        <h2>Get User By ID</h2>
        <GetUserById />
      </section>

      <section>
        <h2>Update User</h2>
        <UpdateUser />
      </section>

      <section>
        <h2>Delete User</h2>
        <DeleteUser />
      </section>
    </div>
  );
};

export default User;
