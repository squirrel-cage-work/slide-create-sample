import './App.css'
import Slide from './components/Slide/Slide';
import Menu from './pages/Menu/Menu';
import TopNavigation from './pages/TopNavigation/TopNavigation';

function App() {

  return (
    <div className='min-w-screen min-h-screen flex flex-col'>
        <TopNavigation/>
      <div className='flex'>
        <Menu />
        <Slide />
      </div>
    </div>
  )
}

export default App
