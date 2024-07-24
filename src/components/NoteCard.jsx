import React, { useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { format } from 'date-fns';
import DeleteNoteModal from './DeleteNoteModal';
import { useDispatch, useSelector } from 'react-redux';
import UpdateNoteModal from './UpdateNoteModal';
import { checkNote, fetchNotes } from '../redux/noteSlice';
import { toast } from 'react-toastify';

const NoteCard = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const userType = useSelector((state) => state.auth.userType);
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [updateNoteModal, setUpdateNoteModal] = useState(false);

// para formatear las fechas
  const fDate = (date) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy'); // Asegúrate de que date sea una instancia de Date o un string ISO válido
    return formattedDate;
  }

  // funcion para check/uncheck de las notas
  const handleCheck = async () => {
    try {
      const updatedNote = { ...data, checked: !data.checked };
      await dispatch(checkNote({ token, noteId: data._id, note: updatedNote })).unwrap();
      dispatch(fetchNotes({ token, userId }));
    } catch (error) {
      console.error('Error al marcar la nota:', error.message);
      toast.error('Hubo un error');
    }
  };


  return (
    <article className=' w-full max-w-[60rem] mx-auto flex items-center bg-white rounded-xl shadow-md p-3'>
      {deleteNoteModal && <DeleteNoteModal setDeleteNoteModal={setDeleteNoteModal} noteId={data._id} />}
      {updateNoteModal && <UpdateNoteModal setUpdateNoteModal={setUpdateNoteModal} note={data} />}
      <div className='border-e pe-2 me-3 cursor-pointer' onClick={handleCheck} >
        <HiMiniCheckCircle className={`text-3xl ${data.checked ? 'text-lime-600' : 'text-gray-300'} `} />
      </div>
      <div>
        <div className='flex gap-4 items-center'>
          <h2 className={`font-bold ${data.checked ? 'line-through' : ''}`}>{data.title}</h2>
          <p className='text-sm'>{fDate(data.createdAt)}</p>
        </div>
        <div>
          <p className={data.checked ? 'line-through' : ''}>{data.content}</p>
        </div>
      </div>
      <div className='flex ms-auto border-s ps-2 text-2xl gap-4'>
        <RiEdit2Line
          className='cursor-pointer'
          onClick={() => setUpdateNoteModal(true)}
        />
        {
          userType === 'admin' && <RiDeleteBin6Line
            className='text-red-600 cursor-pointer'
            onClick={() => setDeleteNoteModal(true)}
          />
        }
      </div>
    </article>
  )
}

export default NoteCard;
