import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { pageSizes } from '../../config/pageSize';

export interface IPagesControls {
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
  totalResults: number;
  pageSize: number;
  onPageSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
}

export const PagesControls = ({
  currentPage,
  setCurrentPage,
  totalResults,
  pageSize,
  onPageSizeChange,
  loading,
}: IPagesControls) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-start items-stretch mt-2 sm:mt-4'>
      <div className='flex flex-row justify-between items-center py-2'>
        <div className='w-18'>
          <select
            onChange={onPageSizeChange}
            value={pageSize}
            disabled={loading}
            className={`block w-full rounded-md border-0 py-1.5 px-2 bg-white dark:bg-indigo-200 text-gray-900 dark:text-gray-700 placeholder:text-slate-300 dark:placeholder:text-slate-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none`}
          >
            {pageSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-1 justify-between'>
            <button
              disabled={loading || currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              className='rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500'
            >
              {t('page:btn:prev')}
            </button>
            <button
              disabled={loading || currentPage === totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              className='ml-3 rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500'
            >
              {t('page:btn:next')}
            </button>
          </div>

          {/* <div className='hidden sm:flex sm:flex-row sm:flex-1 sm:items-center sm:justify-between'>
            <div>
              <nav className='rounded-md shadow-sm' aria-label='Pagination'>
                <button
                  disabled={loading || currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='rounded-l-md px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus:outline-offset-0'
                >
                  <span className='sr-only'>Previous</span>
                  <span className='h-5 w-5' aria-hidden='true'>
                    {'←'}
                  </span>
                </button>
                <button
                  disabled={loading || currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  aria-current='page'
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  1
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  2
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  3
                </button>
                <button
                  disabled
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-500 focus:outline-offset-0'
                >
                  ...
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  8
                </button>
                <button
                  disabled={loading || currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  9
                </button>
                <button
                  disabled={loading || currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  10
                </button>
                <button
                  disabled={loading || currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  className='rounded-r-md px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gray-950 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-300 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-500 focus:z-20 focus:outline-offset-0'
                >
                  <span className='sr-only'>Next</span>
                  <span className='h-5 w-5' aria-hidden='true'>
                    {'→'}
                  </span>
                </button>
              </nav>
            </div>
          </div> */}
        </div>
      </div>
      <p className='text-sm text-slate-800 dark:text-slate-200'>
        {t('page:text:sh')} <span className='font-medium'>{currentPage}</span> {t('page:text:to')}{' '}
        <span className='font-medium'>{totalPages}</span> {t('page:text:of')}{' '}
        <span className='font-medium'>{totalResults}</span> {t('page:text:res')}
      </p>
    </div>
  );
};
