import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ToDo from './pages/ToDo'
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoutes'
import AdminRoute from './routes/AdminRoute'
import AdminPage from './pages/AdminPage'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/todo" element={<PrivateRoute element={<ToDo />} />} />
      <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
    </Routes>
  )
}

export default App
