import React, { createContext, useState } from 'react';

const UuidContext = createContext('');

function UuidProvider({ children }) {
  const [uuid, setUuid] = useState('');

  const obj = {
    uuid: uuid,
    setUuid: setUuid,
  }

  return (
    <UuidContext.Provider value={obj}>
      {children}
    </UuidContext.Provider>
  );
}

export default UuidProvider;
export { UuidContext };
