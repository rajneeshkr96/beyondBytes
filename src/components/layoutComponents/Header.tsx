import React from 'react';

type Props = {
  category: string,
  title:string
};


const Header: React.FC<Props> = ({ category, title }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-300">
      {title}
    </p>
  </div>
);

export default Header;
