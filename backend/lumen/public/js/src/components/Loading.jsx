import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = (props) => {
  return (
    <div>
      <ReactLoading type="bars" color="royalblue" width={100} height={80} className="loading" />
      {props.message}
    </div>
  );
};
