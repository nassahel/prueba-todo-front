import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/notes`

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async ({ token, userId }, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(`${API_URL}?userId=${userId}`, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addNote = createAsyncThunk('notes/addNote', async ({ token, note }, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(API_URL, note, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ token, noteId, note }, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${API_URL}/${noteId}`, note, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const checkNote = createAsyncThunk('notes/checkNote', async ({ token, noteId, note }, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${API_URL}/check/${noteId}`, note, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async ({ token, noteId }, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${API_URL}/${noteId}`, config);
    return noteId; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(checkNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index].check = action.payload.check;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearNotes } = notesSlice.actions;

export default notesSlice.reducer;
