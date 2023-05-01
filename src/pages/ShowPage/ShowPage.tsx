import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostById } from '../../queries/queries';
import { IApiError } from '../../types';
import { getAvailableImg, getUniqueImages, IImgBase } from '../../utils/helpers';
import { Spinner } from '../../components/Spinner/Spinner';
import { ROUTES } from '../../routes/routes';
import { useTranslation } from 'react-i18next';

const ShowPage = () => {
  const { nasa_id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['post', nasa_id],
    queryFn: () => getPostById(nasa_id ?? ''),
    enabled: !!nasa_id,
    onError: (err: IApiError) => {
      if (err.response.status === 404) {
        navigate('*');
      }
    },
  });
  const { t } = useTranslation();

  const images: IImgBase[] = data?.collection?.assets
    ? getUniqueImages(getAvailableImg(data.collection.assets))
    : [];
  const selectedImg = images?.[0];
  const hasPrevPage = history.state?.key;

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <div>{error.message}</div>}
      {data && (
        <>
          <div className='flex flex-row justify-start items-center mb-2 sm:mb-4'>
            <button
              className='rounded-md box-border px-4 py-2 mr-2 lg:mr-4 xl:mr-8 whitespace-nowrap text-sm font-semibold bg-indigo-200 dark:bg-indigo-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-300 dark:hover:bg-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={() => {
                hasPrevPage ? navigate(-1) : navigate(ROUTES.home);
              }}
            >
              {hasPrevPage ? `← ${t('common:bck')}` : `← ${t('common:btm')}`}
            </button>
            <h1 className='text-2xl text-slate-800 dark:text-slate-200'>
              {data?.collection.items[0].data[0].title}
            </h1>
          </div>
          <div className='flex flex-col lg:flex-row'>
            <picture className='rounded mb-2 lg:mb-0 lg:mr-2 lg:w-3/4 lg:h-full'>
              {selectedImg ? (
                <React.Fragment>
                  {selectedImg.small ? (
                    <source media='(max-width: 768px)' srcSet={selectedImg.small} />
                  ) : null}
                  {selectedImg.medium ? (
                    <source media='(min-width: 769px)' srcSet={selectedImg.medium} />
                  ) : null}
                  <img src={selectedImg.thumb} alt={data?.collection.items[0].data[0].title} />
                </React.Fragment>
              ) : (
                <img
                  src={data?.collection?.items[0]?.links?.[0].href}
                  alt={data?.collection.items[0].data[0].title}
                />
              )}
            </picture>
            <div className='flex flex-col md:flex-row lg:flex-col lg:w-1/4'>
              <div className='mb-2 md:w-1/2 md:mb-0 md:mr-2 lg:w-full lg:mb-4 lg:mr-0'>
                <h2 className='text-lg mb-2 text-slate-700 dark:text-slate-300'>
                  {data?.collection.items[0].data[0].title}
                </h2>
                {data?.collection.items[0].data[0].description ? (
                  <p className='text-slate-600 dark:text-slate-400 overflow-hidden overflow-ellipsis'>
                    {data?.collection.items[0].data[0].description}
                  </p>
                ) : null}
              </div>
              <div className='border-t pt-2 border-indigo-900 dark:border-indigo-100 md:w-1/2 md:border-l md:border-t-0 md:pt-0 md:pl-2 lg:w-full lg:border-t lg:pt-4 lg:border-l-0 lg:pl-0'>
                {data?.collection.items[0].data[0].location ? (
                  <p className='text-slate-700 dark:text-slate-300'>
                    <span className='font-bold'>{t('photo:loc')} </span>
                    {data?.collection.items[0].data[0].location}
                  </p>
                ) : null}
                {data?.collection.items[0].data[0].photographer ? (
                  <p className='text-slate-700 dark:text-slate-300'>
                    <span className='font-bold'>{t('photo:ph')} </span>
                    {data?.collection.items[0].data[0].photographer}
                  </p>
                ) : null}
                {data?.collection.items[0].data[0].date_created ? (
                  <p className='text-slate-700 dark:text-slate-300'>
                    <span className='font-bold'>{t('photo:date')} </span>
                    {new Date(data?.collection.items[0].data[0].date_created).toDateString()}
                  </p>
                ) : null}
                {data?.collection.items[0].data[0].keywords?.length ? (
                  <>
                    <div className='text-slate-700 dark:text-slate-300'>
                      <span className='font-bold'>{t('photo:kwds')} </span>
                      {data?.collection.items[0].data[0].keywords.map((item) => {
                        return (
                          <p
                            key={item}
                            className='inline-block mr-1 mb-1 px-2 rounded bg-indigo-300 dark:bg-indigo-700 text-slate-700 dark:text-slate-300 whitespace-pre-wrap'
                          >
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShowPage;
