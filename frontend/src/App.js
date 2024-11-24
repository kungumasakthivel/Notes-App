import './App.css';
import EditNote from './components/EditNote/EditNote';
import ShowNotes from './components/ShowNotes/ShowNotes';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ShowNotes/>} />
        <Route path='notes/:id' element={<EditNote/>}/>
      </Routes>
    </div>
  );
}

export default App;
