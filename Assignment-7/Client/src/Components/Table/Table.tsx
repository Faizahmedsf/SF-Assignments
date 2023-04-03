import React, { useEffect , useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/Get/Get";
import "./Table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {
  const user = useAppSelector((state) => state.getSlice);
  console.log('user is' , user);

  const [userDeleted, setuserDeleted] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [userDeleted]);

  const deleteUser = async (id: string) => {
  await axios.delete(`http://localhost:8001/deleteuser/${id}`)
   .then((response) => toast.success( response.data.message))
   .catch((error) => toast.warning( error.message))
   setuserDeleted(true)
  }

  return (
    <div>
              <ToastContainer />
<h1 className="text-center">List of users</h1>
      <table data-testid="tablesas" className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tr>{user.loading ? <div>Loading...</div> : null}</tr>

        <tbody>
          {/* check if loading is true */}
          <tr>{user.loading ? <div>Loading...</div> : null}</tr>

          {/* check if there is an error */}
          <tr> {!user.loading && user.error ? <div> {user.error} </div> : null}</tr>
          {user.users
            ? user.users.map((element: any) => {
                return (
                  <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td>{element.firstname}</td>
                    <td>{element.middlename}</td>
                    <td>{element.lastname}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                    <td>{element.role}</td>
                    <td>{element.address}</td>
                    <td>
                      <button className="mx-3 btn btn-info">
                        <Link to={`/edit/${element.id}`}>
                          Edit
                        </Link> 
                        </button>
                      <button className="mx-3 btn btn-danger" data-testid="delButton" onClick={() => deleteUser(`${element.id}`)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>

      </table>
    </div>
  );
}

export default Table;
