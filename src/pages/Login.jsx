import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/userSlice';
import { toast } from 'react-toastify';


const Login = () => {
  const [viewPass, setViewPass] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputStyle = 'bg-neutral-100 p-2 rounded-md w-full mb-4 shadow shadow-inner outline-none'

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginUser = { email, password };

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', loginUser);
      const { token } = response.data;
      dispatch(setCredentials({ token }));
      navigate('/todo');
    } catch (error) {
      console.error('Error de autenticación', error);
      toast.error('Datos Incorrectos')
    }
  };

  const handleShowPass = () => {
    viewPass ? setViewPass(false) : setViewPass(true)
  }


  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-neutral-100'>

      <section className='w-72 border shadow-md rounded-md mb-2 bg-white px-4 py-10'>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center h-full'>
          <h2 className='font-bold text-2xl lg:text-5xl ms-4 mb-4'>
            <span className='text-lime-500'>T</span>O-DO
          </h2>
          <h3 className='text-center text-2xl font-bold mb-4'>Iniciar Sesión</h3>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder='Email'
            className={inputStyle}
            required />
          <div className={`${inputStyle} flex items-center`}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={viewPass ? 'text' : 'password'}
              placeholder='Contraseña'
              className='bg-neutral-100 grow outline-none'
              required />
            {viewPass ? <FaRegEye onClick={handleShowPass} size={17} /> : <FaRegEyeSlash onClick={handleShowPass} size={17} />}

          </div>

          <button type='submit' className='bg-neutral-950 hover:bg-neutral-800 duration-200 rounded-md font-semibold text-lg h-10 w-full text-white'>Ingresar</button>
        </form>
      </section>
      <p>No tienes cuenta? <Link to="/register" className='underline'>Registrate</Link></p>
    </main>
  )
}

export default Login