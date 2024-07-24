import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateNote, fetchNotes } from '../redux/noteSlice';

const UpdateNoteModal = ({ note, setUpdateNoteModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const inputStyle = 'bg-neutral-100 p-2 rounded-md w-full mb-4 shadow shadow-inner';

  // funcion para actualizar las tareas
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedNote = { title, content };
      await dispatch(updateNote({ token, noteId: note._id, note: updatedNote })).unwrap();
      toast.success('tarea actualizada!');
      dispatch(fetchNotes({ token, userId }));
      setUpdateNoteModal(false);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error.message);
      toast.error('No se pudo actualizar la tarea!');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
      <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/70 '></div>
      <form onSubmit={handleSubmit} className='w-72 bg-white rounded-3xl shadow-md z-50 py-6 px-4'>
        <h2 className='text-center font-bold text-xl mb-4'>Actualizar Tarea</h2>
        <input
          type="text"
          placeholder='Título'
          className={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Ingresar tarea'
          className={`${inputStyle} h-32 resize-none`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className='flex justify-center gap-8'>
          <button type="submit" className='bg-lime-500 hover:bg-lime-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Aceptar
          </button>
          <button type="button" onClick={() => setUpdateNoteModal(false)} className='bg-red-500 hover:bg-red-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNoteModal;
