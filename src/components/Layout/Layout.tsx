import { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div className='flex flex-col justify-start items-center text-slate-200 dark:text-slate-800 bg-slate-200 dark:bg-slate-700 h-full min-h-screen'>
      <Header />
      <main className='w-full flex-1 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-screen-xl p-2 mx-auto'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
