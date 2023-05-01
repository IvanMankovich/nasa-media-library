import { ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface ICard {
  thumbnail: string;
  description: string;
  title: string;
  location: string;
  photographer: string;
  nasa_id: string;
}

const Card = ({ thumbnail, description, title, location, photographer, nasa_id }: ICard) => {
  const { t } = useTranslation();

  return (
    <div className='rounded overflow-hidden overflow-ellipsis shadow-lg box-border flex flex-col bg-slate-300 dark:bg-slate-800'>
      <div className='w-full aspect-square mb-2 overflow-hidden box-border'>
        <img
          className='relative h-full min-h-full object-cover aspect-square'
          src={thumbnail}
          alt={description}
        />
      </div>
      <div className='p-2'>
        <h2 className='mb-4 text-2xl font-semibold leading-none tracking-tighter text-slate-800 dark:text-slate-200 lg:text-3xl'>
          {title}
        </h2>
        {photographer ? (
          <p className='text-slate-700 dark:text-slate-300 text-base'>
            <span className='font-bold'>{t('photo:ph')}</span> {photographer}
          </p>
        ) : null}
        {location ? (
          <p className='text-slate-700 dark:text-slate-300 text-base'>
            <span className='font-bold'>{t('photo:loc')}</span> {location}
          </p>
        ) : null}
        <p className='text-base text-slate-700 dark:text-slate-300 text-justify line-clamp-3'>
          {description}
        </p>
      </div>

      <div className='mt-auto self-end justify-end py-4 px-2'>
        <Link
          className='rounded-md box-border px-4 py-2 text-sm font-semibold bg-indigo-600 dark:bg-indigo-100 text-slate-200 dark:text-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          to={`${ROUTES.posts}${nasa_id}`}
        >
          {t('photo:more')} <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </div>
  );
};

export { Card };
