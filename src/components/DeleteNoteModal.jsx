import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteNote, fetchNotes } from "../redux/noteSlice";


const DeleteNoteModal = ({ setDeleteNoteModal, noteId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const handleDelete = async () => {
    try {
      await dispatch(deleteNote({ token, noteId })).unwrap();
      toast.success('tarea Eliminada!');
      dispatch(fetchNotes({ token, userId }));
      setDeleteNoteModal(false);
    } catch (error) {
      console.error('Error al agregar la tarea:', error.message);
      toast.error('No se pudo Eliminar la tarea!');
    }
  };


  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
      <div className='fixed top-0 bottom-0 right-0 left-0 z-10 bg-black/70 '></div>
      <div className='w-72 bg-white rounded-3xl shadow-md z-50 py-6 px-4'>
        <h2 className='text-center font-semibold text-xl mb-4'>Desea borrar la tarea?</h2>
        <div className='flex justify-center gap-8'>
          <button onClick={handleDelete} type="submit" className='bg-lime-500 hover:bg-lime-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Aceptar
          </button>
          <button onClick={() => setDeleteNoteModal(false)} type="button" className='bg-red-500 hover:bg-red-600 duration-200 font-semibold text-white px-3 py-1 rounded-md'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
