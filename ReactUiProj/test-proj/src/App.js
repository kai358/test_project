import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import './App.css'
import ListOfItems from './components/ListOfItems'
import CaterignPoint from './components/CateringPoint'
import Client from './components/Client'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <h1>Test Project</h1>
          <NavLink to="/clients">Clients</NavLink>
          <NavLink to="/cateringpoints">CaterignPoints</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/clients" element={<ListOfItems entity="clients" />} />
          <Route path="/clients/:name/:id" element={<Client />} />
          <Route
            path="/cateringpoints"
            element={<ListOfItems entity="cateringpoints" />}
          />
          <Route path="/cateringpoints/:name/:id" element={<CaterignPoint />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
