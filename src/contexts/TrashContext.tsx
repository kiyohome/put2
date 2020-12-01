import React, { useContext, useState } from 'react';
import { BackendService } from '../backend/BackendService';
import { Trash } from '../backend/generated-rest-client';

interface ContextValueType {
  getTrashList(): void;
  postTrash(trash: Blob): void;
  trashList: Trash[];
  point: number;
}

export const TrashContext = React.createContext<ContextValueType>({} as ContextValueType);

export const useTrashContext = () => useContext(TrashContext);

export const TrashContextProvider: React.FC = ({ children }) => {

  const [trashList, setTrashList] = useState<Trash[]>([]);

  const contextValue: ContextValueType = {
    getTrashList: () => {
      BackendService.getTrashList()
        .then(response => setTrashList(response));
    },
    postTrash: (trash) => {
      BackendService.postTrash(trash)
        .then(response => setTrashList([response, ...trashList]));
    },
    trashList,
    point: trashList.reduce((total, trash) => total + trash.point, 0),
  };

  return <TrashContext.Provider value={contextValue}>{children}</TrashContext.Provider>;
};
