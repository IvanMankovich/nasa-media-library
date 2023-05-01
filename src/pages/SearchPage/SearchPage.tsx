import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, ICollectionItem } from '../../queries/queries';

import { Card } from '../../components/Card/Card';
import { Form } from '../../components/Form/Form';
import { PagesControls } from '../../components/PagesControls/PagesControls';

import { getQueryObj } from '../../utils/helpers';
import { IApiError } from '../../types';
import { Spinner } from '../../components/Spinner/Spinner';
import { DEFAULT_PAGE_SIZE } from '../../config/pageSize';
import { useTranslation } from 'react-i18next';

export interface ISearchData {
  q: string | null;
  year_start: string | null;
  year_end: string | null;
  page?: string | null;
  page_size?: string | null;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getYearParams = () => {
    return { year_start: searchYearStart(), year_end: searchYearEnd() };
  };
  const getSearchParams = () => {
    return {
      q: searchQ() !== null ? decodeURI(searchQ() ?? '') : '',
      ...getYearParams(),
    };
  };

  const searchPage = () => searchParams.get('page');
  const searchPageSize = () => searchParams.get('page_size');
  const searchQ = () => searchParams.get('q');
  const searchYearStart = () => searchParams.get('year_start');
  const searchYearEnd = () => searchParams.get('year_end');

  const [page, setPage] = useState<number>(searchPage() ? Number(searchPage()) : 1);
  const [pageSize, setPageSize] = useState<number>(
    searchPageSize() ? Number(searchPageSize()) : DEFAULT_PAGE_SIZE,
  );

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ['posts', page, pageSize, searchQ(), searchYearStart(), searchYearEnd()],
    queryFn: () =>
      getPosts({
        ...getSearchParams(),
        page_size: searchPageSize(),
        page: searchPage(),
      }),
    onError: (err: IApiError) => err,
  });
  const { t } = useTranslation();

  const onSubmit = async (data: ISearchData) => {
    const upd = {
      ...data,
      page_size: searchPageSize(),
      page: '1',
    };
    setPage(1);
    setSearchParams(getQueryObj(upd));
  };

  const onReset = () => {
    setSearchParams({});
    setPage(1);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const onPageChange = (pageNum: number) => {
    setPage(pageNum);
    const data: ISearchData = {
      ...getSearchParams(),
      page: pageNum.toString(),
      page_size: searchPageSize(),
    };
    setSearchParams(getQueryObj(data));
  };

  const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
    setPage(1);
    const data: ISearchData = {
      ...getSearchParams(),
      page: '1',
      page_size: e.target.value,
    };
    setSearchParams(getQueryObj(data));
  };

  return (
    <div className='searchPage'>
      {isError && <div>{error.message}</div>}
      <Form
        onSubmit={onSubmit}
        defaultValues={{
          q: searchQ() ?? '',
          ...getYearParams(),
        }}
        onReset={onReset}
        isLoading={isLoading || isFetching}
      />

      {(isLoading || isFetching) && <Spinner />}
      {data?.collection?.items?.length ? (
        <>
          <PagesControls
            currentPage={page}
            setCurrentPage={onPageChange}
            totalResults={data?.collection?.metadata?.total_hits ?? 0}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            loading={isLoading || isFetching}
          />
          <div className='relative items-center w-full px-5 py-12 mx-auto sm:px-12 xl:px-24 max-w-7xl'>
            <div className='grid w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4'>
              {data?.collection?.items?.map((item: ICollectionItem) => {
                return (
                  <Card
                    key={item.href}
                    thumbnail={item.links[0].href}
                    description={item.data[0].description}
                    title={item.data[0].title}
                    location={item.data[0].location}
                    photographer={item.data[0].photographer}
                    nasa_id={item.data[0].nasa_id}
                  />
                );
              })}
            </div>
          </div>
          <PagesControls
            currentPage={page}
            setCurrentPage={setPage}
            totalResults={data?.collection?.metadata?.total_hits ?? 0}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            loading={isLoading}
          />
        </>
      ) : (
        !(isLoading || isFetching) && (
          <p className='text-slate-800 dark:text-slate-200'>{t('page:text:nores')}</p>
        )
      )}
    </div>
  );
};

export default SearchPage;
