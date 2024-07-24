import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { fetchNotes } from '../redux/noteSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteUserModal from '../components/DeleteUserModal';

const AdminPage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.notes.status);
  const notes = useSelector((state) => state.notes.notes);
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`${API_URL}/users`, config);
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al obtener usuarios');
    }
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setDeleteUserModal(true);
  };


  useEffect(() => {
    getAllUsers();
  }, [token]);

  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchNotes({ token, userId }));
    }
  }, [userId, dispatch, token]);

  return (
    <div className='bg-neutral-200 flex flex-col min-h-screen'>
      <Header />
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          userId={selectedUser?._id}
          username={selectedUser?.username}
          getAllUsers={getAllUsers} 
        />
      )}
      <section className='flex md:hidden border-2 border-neutral-400 py-5 m-4 text-center items-center justify-center rounded-lg h-60 italic text-lg text-neutral-500'>
        <p>La pagina de administracion no esta disponible en moviles</p>
      </section>
      <section className='h-full mt-4 hidden md:flex'>
        <aside className='bg-white min-w-52 m-4 h-full shadow-md rounded-xl w-1/6 overflow-hidden flex flex-col '>
          <div className='text-xl text-center bg-lime-500 text-white font-semibold p-3'>Usuarios</div>
          {users.map((item, i) => (
            <button
              key={i}
              onClick={() => setUserId(item._id)}
              className={`text-xl text-center flex items-center justify-between font-semibold border-b p-3 hover:bg-neutral-100 duration-300`}
            >
              {item.username}
              <RiDeleteBin6Line onClick={() => handleDeleteUserClick(item)} />
            </button>
          ))}
        </aside>
        <main className='lg:p-6 p-2 w-full flex flex-col gap-3'>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note._id} data={note} />
            ))
          ) : (
            <div className='w-[80%] mx-auto border-2 border-neutral-400 py-5 text-center rounded italic text-lg text-neutral-500'>
              <p>Selecciona un usuario para mostrar sus notas.</p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default AdminPage;
