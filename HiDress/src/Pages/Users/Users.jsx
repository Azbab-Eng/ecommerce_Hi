import React, { useEffect, useState } from 'react';
import HashLoader from "react-spinners/RingLoader";
import './Users.css';
import {
  Button, Input, Table, Thead, Tbody, Tr, Th, Td, Stack, Box
} from "@chakra-ui/react";
import { Helmet } from 'react-helmet';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


const Users = ({ userInfo, setUserInfo }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  
  const PORT = import.meta.env.API_URL;

  const authConfig = (token, contentType = "application/json") => ({
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    }
  });

  const ListUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${PORT}/users`, authConfig(userInfo.token));
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError("Can't get Users list");
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true)
      const { data } = await axios.delete(`${PORT}/users/${id}`, authConfig(userInfo.token));
      setSuccess(data?.message);
      setLoading(false)
    } catch (error) {
      console.log(error?.message);
      setLoading(false)
      setError(data?.error || data?.message || error?.message)
    }
  };

  const updateUser = async (id, user) => {
    try {
      const { data } = await axios.put(`${PORT}/users/${id}`, user, authConfig(userInfo.token));
      setSuccess("User updated successfully");
      setEditingUserId(null);
      ListUsers();
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      ListUsers();
    } else {
      window.location.href = '/login';
    }
  }, [success, userInfo]);

  const handleEditToggle = (user) => {
    if (editingUserId === user._id) {
      updateUser(user._id, updatedUser);
    } else {
      setEditingUserId(user._id);
      setUpdatedUser(user);
    }
  };

  const handleChange = (e, key) => {
    setUpdatedUser({ ...updatedUser, [key]: key === 'isAdmin' ? e.target.checked : e.target.value });
  };
 const deletehandler = (id) =>{
        if(window.confirm('Are You Sure?')){
          deleteUser(id)

        }
    }
  return (
    <div className='Users'>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1 className='titlepanel'> Users :</h1>
      <h1>{success}</h1>
      {loading ? <div className='loading'>
        <HashLoader color={"#1e1e2c"} loading={loading} size={40} />
      </div> : error ? <h1 style={{marginBottom:'100px'}} >{error}</h1> : 
      
        <Box overflowX='auto' >
          <Table className='tableusers' variant="striped">
            <Thead>
              <Tr>
                <Th textAlign='center' w='3%'>S/N</Th>
                <Th textAlign='center' w='10%'>ID</Th>
                <Th textAlign='left' w='20%'>Name</Th>
                <Th textAlign='left' w='47%'>Email</Th>
                <Th textAlign='center' w='10%'>Admin</Th>
                <Th textAlign='center' w='10%'>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user,index) => (
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>{user._id}</Td>
                  <Td>
                    <Input
                      type="text"
                      value={editingUserId === user._id ? updatedUser.name : user.name}
                      onChange={(e) => handleChange(e, 'name')}
                      readOnly={editingUserId !== user._id}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      value={editingUserId === user._id ? updatedUser.email : user.email}
                      onChange={(e) => handleChange(e, 'email')}
                      readOnly={editingUserId !== user._id}
                    />
                  </Td>
                  <Td>
                    <input
                      type="checkbox"
                      checked={editingUserId === user._id ? updatedUser.isAdmin : user.isAdmin}
                      onChange={(e) => handleChange(e, 'isAdmin')}
                      disabled={editingUserId !== user._id}
                    />
                    {user.isAdmin ? <div className='paid'>YES</div> : <div className='notpaid'>NO</div>}
                  </Td>
                  <Td>
                    <Stack>
                      <Button
                        onClick={() => handleEditToggle(user)}
                        leftIcon={<AiOutlineEdit size='16' />}
                        colorScheme='blue'
                        size="xs"
                      >
                        {editingUserId === user._id ? "Save" : "Edit"}
                      </Button>
                      <Button
                        colorScheme='red'
                        leftIcon={<AiFillDelete size='16' />}
                        size="xs"
                        onClick={() => deletehandler(user._id)}
                      >
                        DELETE
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>}
    </div>
  );
};

export default Users;