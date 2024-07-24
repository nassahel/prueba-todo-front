import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';
import { fetchNotes } from '../redux/noteSlice';
import caracol from '/img/caracol.gif'

const ToDo = () => {
  const dispatch = useDispatch();
  const [noteModal, setNoteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes({ token, userId }));
    }
  }, [status, dispatch, token, userId]);


  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, notes]);

  return (
    <div className='bg-neutral-200 min-h-screen'>
      <Header />
      {noteModal && <AddNoteModal setNoteModal={setNoteModal} />}
      <main>
        <div className='w-full max-w-[60rem] mx-auto my-4 px-2'>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            maxLength={40}
            placeholder='Buscar tareas...'
            className='w-full rounded-full py-3 px-5 border-2 border-lime-400 outline-none' />
        </div>
        <div className='flex items-center p-2 w-full max-w-[60rem] mt-4 mx-auto'>
          <button
            onClick={() => setNoteModal(true)}
            className='bg-white text-lg lg:text-2xl text-lime-500 hover:bg-lime-500 hover:text-white duration-200 active:shadow-sm font-semibold h-16 px-6 rounded-lg shadow-md'
          >
            Nueva Tarea +
          </button>
        </div>
        <div className='lg:p-6 p-2 flex flex-col gap-3'>
          {status === 'loading' && <div className='fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center'><img src={caracol} alt="caracol loading" className='w-24' /></div>}
          {status === 'failed' && <p>{error.message || 'Ocurrió un error'}</p>}
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              data={note}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ToDo;
