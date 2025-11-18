'use client';

import React from 'react';

interface AppBarProps {
  name: string;
}

const AppBar: React.FC<AppBarProps> = ({ name }) => {
  return <h1 className="text-3xl font-bold py-5">{name}</h1>;
};

export default AppBar;
