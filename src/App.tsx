import { Navigate, Route, Routes } from 'react-router-dom';
import { Sign } from './components/Sign/sign';
import { Todos } from './components/Todo/Todos';
import { getToken } from './helper/getToke';

function App() {
  const token = getToken()
  return (
    <div className='bg-grey-100 min-h-full'>
      {token ?
      <Routes>
      <Route path='/' element={<Todos />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      :
      <Routes>

        <Route path='/sign' element={<Sign />} />
        <Route path='/*' element={<Navigate to='/sign' />} />
      </Routes>
      
}
    </div>
  );
}

export default App;
