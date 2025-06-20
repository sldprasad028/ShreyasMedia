import { useState, useEffect } from 'react';
import './App.css';
import MainRoute from './MainRoute';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './NotFound';

function App() {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(max-width: 1023px)');

  //   const handleMediaQueryChange = (e) => {
  //     setIsSmallScreen(e.matches);
  //   };

  //   setIsSmallScreen(mediaQuery.matches);
  //   mediaQuery.addEventListener('change', handleMediaQueryChange);

  //   return () => {
  //     mediaQuery.removeEventListener('change', handleMediaQueryChange);
  //   };
  // }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* {isSmallScreen ? <NotFound /> : <MainRoute />} */}
      <MainRoute />
    </>
  );
}

export default App;
