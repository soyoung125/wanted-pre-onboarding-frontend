import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoContainer = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!localStorage.getItem('data')) {
      console.log(11)
      navigate('/signin', {replace: true})
    }
  }, [])

  return (
    <>todo</>
  );
}

export default TodoContainer;
