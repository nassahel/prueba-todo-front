import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const DeleteUserModal = ({ setDeleteUserModal, userId, username, getAllUsers}) => {
  const token = useSelector((state) => state.auth.token);

  const API_URL = import.meta.env.VITE_API_URL;

  const deleteUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.delete(`${API_URL}/users/${userId}`, config);
      console.log(response);
      getAllUsers()
      setDeleteUserModal(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Error al eliminar usuario');
    }
  }

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
      <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/70 '></div>
      <div className='w-72 bg-white rounded-3xl shadow-md z-50 py-6 px-4'>
        <h2 className='text-center font-semibold text-lg mb-4'>Desea borrar el usuario <span className="text-red-600">{username}</span>?</h2>
        <div className='flex justify-center gap-8'>
          <button onClick={deleteUser} type="submit" className='bg-lime-500 hover:bg-lime-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Aceptar
          </button>
          <button onClick={() => setDeleteUserModal(false)} type="button" className='bg-red-500 hover:bg-red-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
