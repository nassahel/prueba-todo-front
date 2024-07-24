import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNote, fetchNotes } from '../redux/noteSlice';

const AddNoteModal = ({ setNoteModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  // estilos generales de los input
  const inputStyle = 'bg-neutral-100 p-2 rounded-md w-full mb-4 shadow shadow-inner';

  // Funcion para agregar tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const note = { title, content, userId };
      await dispatch(addNote({ token, note })).unwrap();
      toast.success('tarea agregada!');
      // Refresca las tareas
      dispatch(fetchNotes({ token, userId }));
      // Cerrar el modal
      setNoteModal(false);
    } catch (error) {
      console.error('Error al agregar la tarea:', error.message);
      toast.error('No se pudo agregar la tarea!');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
      <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/70 '></div>
      <form onSubmit={handleSubmit} className='w-72 bg-white rounded-3xl shadow-md z-50 py-6 px-4'>
        <h2 className='text-center font-bold text-xl mb-4'>Agregar Tarea</h2>
        <input
          type="text"
          placeholder='Título'
          className={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={50}
        />
        <textarea
          placeholder='Ingresar tarea'
          className={`${inputStyle} h-32 resize-none`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={200}
        ></textarea>
        <div className='flex justify-center gap-8'>
          <button type="submit" className='bg-lime-500 hover:bg-lime-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Aceptar
          </button>
          <button type="button" onClick={() => setNoteModal(false)} className='bg-red-500 hover:bg-red-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteModal;
