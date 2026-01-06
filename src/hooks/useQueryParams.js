import { useState, useEffect } from 'react';

const useQueryParams = (initialParams) => {
  const [params, setParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const result = { ...initialParams };
    
    Object.keys(initialParams).forEach(key => {
      const value = searchParams.get(key);
      if (value !== null) {
        result[key] = value;
      }
    });
    
    return result;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [params]);

  return [params, (updates) => {
    setParams(prev => ({ ...prev, ...updates }));
  }];
};

export default useQueryParams;