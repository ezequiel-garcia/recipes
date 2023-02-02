import { ThreeDots } from 'react-loader-spinner';

import React from 'react';

const Loader = () => {
  return (
    <ThreeDots
      height="70"
      width="70"
      radius="9"
      color="#fdfdfd"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default Loader;
