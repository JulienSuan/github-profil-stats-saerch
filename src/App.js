
import Search from './SearchUsers/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './Users/Users';


function App() {

  



  return (
    <BrowserRouter basename='/github-profil-stats-saerch'>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Search></Search>}></Route>
          <Route path='/users/:log' element={<Users></Users>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
