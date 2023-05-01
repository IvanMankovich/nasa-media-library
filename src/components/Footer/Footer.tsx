import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='w-full justify-self-end flex flex-col justify-between items-center px-2 py-3 bg-white/50 dark:bg-black/50 supports-backdrop-blur:bg-white/60 backdrop-blur border-t border-indigo-900 dark:border-indigo-100'>
      <p className='text-slate-700 dark:text-slate-300 text-base'>{t('ft:text')} </p>
    </footer>
  );
};
