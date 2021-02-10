import { Suspense } from 'react';
import Loading from '../../Loading/loading';
import React from 'react';

export default (Component) => {
  return (props) => (
    <Suspense fallback={<Loading/>}>
      <Component {...props}/>
    </Suspense>
  );
};
