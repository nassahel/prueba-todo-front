import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const inputStyle = 'bg-neutral-100 p-2 rounded-md w-full mb-4 shadow shadow-inner';

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = { username, email, password };

    try {
      const response = await axios.post('http://localhost:3000/api/users', user);

      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Error al registrar usuario', response.status);
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-neutral-100'>
      <section className='w-72 border shadow-md rounded-md mb-2 bg-white px-4 py-10'>
        <form onSubmit={handleRegister} className='flex flex-col items-center justify-center h-full'>
          <h2 className='font-bold text-2xl lg:text-5xl ms-4 mb-4'>
            <span className='text-lime-500'>T</span>O-DO
          </h2>
          <h3 className='text-center text-2xl font-bold mb-4'>Registrarse</h3>
          <input
            type="text"
            placeholder='Usuario'
            className={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder='Email'
            className={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Contraseña'
            className={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='bg-neutral-950 hover:bg-neutral-800 duration-200 rounded-md font-semibold text-lg h-10 w-full text-white'>
            Aceptar
          </button>
        </form>
      </section>
      <p>Ya tienes cuenta? <Link to="/" className='underline'>Ingresar</Link></p>
    </main>
  );
};

export default Register;
