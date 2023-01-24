import React, { createContext, useState } from 'react';

interface TitleContextProps {
  title: string;
  updateTitle: (newTitle: string) => void;
}

const TitleContext = createContext<TitleContextProps>({
  title: 'Virtual Clinic',
  updateTitle: () => {},
});

interface TitleProviderProps {
  children: React.ReactNode;
}

const TitleProvider = ({ children }: TitleProviderProps) => {
  const [title, setTitle] = useState('');

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
    document.title = newTitle;
  };

  return <TitleContext.Provider value={{ title, updateTitle }}>{children}</TitleContext.Provider>;
};

export { TitleContext, TitleProvider };
