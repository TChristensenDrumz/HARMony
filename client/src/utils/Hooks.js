import { useCallback, useEffect, useState } from 'react'

// Hook
const useAsync = (asyncFunction, immediate = true) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
  
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
      setLoading(true);
      setValue(null);
      setError(null);
  
      return asyncFunction()
        .then(response => {
          setValue(response);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, [asyncFunction]);

  
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        console.log("hello world@#")
    
    }, []);
  
    return { execute, loading, value, error };
  };


  export default useAsync; 