import axios from 'axios';
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { clearNotes } from '../redux/noteSlice';


const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state) => state.auth.user);
  const userType = useSelector((state) => state.auth.userType);

  const API_URL = import.meta.env.VITE_API_URL

  // funcion para remover el token y navegar al login (deslogueo)
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`);
      dispatch(logout());
      dispatch(clearNotes());
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };


  const actualLocation = location.pathname

  return (
    <header className='bg-white shadow-sm flex items-center justify-between h-16'>
      <h2 className='font-bold text-xl lg:text-5xl ms-4'>
        <span className='text-lime-500'>LISTA</span> DE TAREAS
      </h2>
      <div className='flex h-full items-center'>
        <h3 className='font-bold text-lg lg:text-xl me-2'>{username}</h3>
        <FaRegUserCircle className='text-2xl lg:text-4xl me-2 lg:me-6' />
        {userType === 'admin' &&
          (actualLocation === '/admin' ?
            <Link to="/todo" className='bg-red-600 text-white font-semibold h-full flex items-center justify-center w-16 lg:w-32 hover:bg-red-800 duration-200 '>Volver</Link>
            :
            <Link to="/admin" className='bg-red-600 text-white font-semibold h-full flex items-center justify-center w-16 lg:w-32 hover:bg-red-800 duration-200 '>Admin</Link>
          )
        }
        <button onClick={handleLogout} className='bg-black text-white font-semibold h-full w-16 lg:w-32 hover:bg-neutral-800 duration-200'>Salir</button>
      </div>
    </header>
  )
}

export default Header