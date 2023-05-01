import { useContext } from 'react';
import { Theme, ThemeContext } from '../../context/themeContext';
import { ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <header className='sticky top-0 z-50 w-full h-14 flex flex-row justify-between items-center px-2 py-3 bg-white/50 dark:bg-black/50 supports-backdrop-blur:bg-white/60 backdrop-blur border-b border-indigo-900 dark:border-indigo-100'>
      <Link
        className='font-sans font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-100 bold'
        to={ROUTES.home}
      >
        {t('common:appName')}
      </Link>
      <button
        className='rounded-full h-8 w-8 bg-indigo-100 dark:bg-indigo-900 py-1 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm hover:bg-indigo-300 dark:hover:bg-indigo-700'
        onClick={() => {
          theme?.dispatch?.({ type: theme?.state === Theme.dark ? Theme.light : Theme.dark });
        }}
      >{`${theme?.state === Theme.dark ? '☼' : '☽'}`}</button>
    </header>
  );
};
