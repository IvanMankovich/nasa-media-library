import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchFields } from '../../config/searchFields';
import { getTrimmedStrOrNull } from '../../utils/helpers';
import { ISearchData } from '../../pages/SearchPage/SearchPage';
import { useTranslation } from 'react-i18next';

export interface ISearchForm {
  defaultValues: ISearchData;
  onSubmit: (data: ISearchData) => Promise<void>;
  onReset: () => void;
  isLoading: boolean;
}

export interface IDates {
  year_start: string | null;
  year_end: string | null;
}

export const Form = ({
  onSubmit,
  defaultValues,
  defaultValues: { year_start, year_end },
  onReset: onResetHandler,
  isLoading,
}: ISearchForm) => {
  const currentYear = new Date().getFullYear();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ISearchData>({
    defaultValues: defaultValues,
  });

  const { t } = useTranslation();

  const [date, setDate] = useState<IDates>({
    year_start: year_start,
    year_end: year_end,
  });

  const onReset = () => {
    onResetHandler();
    reset();
  };

  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  return (
    <form className='mx-auto' onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold leading-7 text-gray-900 dark:text-gray-100'>
          {t('form:t')}
        </h1>

        <div className='mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          <div className='col-span-full'>
            <label
              htmlFor={SearchFields.q}
              className='block text-sm font-medium leading-6 text-gray-800 dark:text-gray-200 required:'
            >
              {t('form:f:search:name')}
            </label>
            <div className='mt-2'>
              <input
                {...register(SearchFields.q, {
                  required: { value: true, message: t('form:f:search:e:empty') },
                  setValueAs: getTrimmedStrOrNull,
                })}
                type='text'
                name={SearchFields.q}
                id={SearchFields.q}
                disabled={isLoading}
                className={`block w-full rounded-md border-0 py-1.5 px-2 bg-white dark:bg-indigo-200 text-gray-900 dark:text-gray-700 placeholder:text-slate-300 dark:placeholder:text-slate-400 disabled:bg-slate-300 shadow-sm ring-1 ring-inset ${
                  errors.q
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-600'
                    : 'ring-gray-300 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none`}
                placeholder={t('form:f:search:ph') ?? ''}
              />
              <p
                className='py-1.5 px-2 h-6 text-sm leading-4 text-red-600 dark:text-red-300'
                role='alert'
              >
                {errors.q && isSubmitted && errors.q.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-2'>
        <div className='mt-1 grid grid-cols-6 gap-x-6 gap-y-8'>
          <div className='col-span-3'>
            <label
              htmlFor={SearchFields.year_start}
              className='block text-sm font-medium leading-6 text-gray-800 dark:text-gray-200'
            >
              {t('form:f:year_start:name')}
            </label>
            <div className='mt-2'>
              <input
                {...register(SearchFields.year_start, {
                  max: {
                    message: t('form:f:year_start:e:max'),
                    value: currentYear,
                  },
                  min: {
                    message: t('form:f:year_start:e:min'),
                    value: 1,
                  },
                  validate: {
                    period: (value) => {
                      if (date.year_end && value !== null && +value > +date.year_end) {
                        return t('form:f:year_start:e:ol') ?? '';
                      }
                      return true;
                    },
                  },
                  maxLength: {
                    value: 4,
                    message: t('form:f:year_start:e:val'),
                  },
                })}
                name={SearchFields.year_start}
                id={SearchFields.year_start}
                type='number'
                step={1}
                onChange={onChangeDate}
                placeholder={t('form:f:year_start:ph') ?? ''}
                disabled={isLoading}
                className={`block w-full rounded-md border-0 py-1.5 px-2 bg-white dark:bg-indigo-200 text-gray-900 dark:text-gray-700 placeholder:text-slate-300 dark:placeholder:text-slate-400 disabled:bg-slate-300 shadow-sm ring-1 ring-inset ${
                  errors.year_start
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-600'
                    : 'ring-gray-300 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none`}
              />
              <p
                className='py-1.5 px-2 h-6 text-sm leading-4 text-red-600 dark:text-red-300'
                role='alert'
              >
                {errors.year_start && isSubmitted && errors.year_start.message}
              </p>
            </div>
          </div>

          <div className='col-span-3'>
            <label
              htmlFor={SearchFields.year_end}
              className='block text-sm font-medium leading-6 text-gray-800 dark:text-gray-200'
              role={''}
            >
              {t('form:f:year_end:name')}
            </label>
            <div className='mt-2'>
              <input
                {...register(SearchFields.year_end, {
                  max: {
                    message: t('form:f:year_end:e:max'),
                    value: currentYear,
                  },
                  min: {
                    message: t('form:f:year_end:e,min'),
                    value: 1,
                  },
                  validate: {
                    period: (value) => {
                      if (date.year_start && value !== null && +value < +date.year_start) {
                        return t('form:f:year_end:e:ol') ?? '';
                      }
                      return true;
                    },
                  },
                  maxLength: {
                    value: 4,
                    message: t('form:f:year_end:e:val'),
                  },
                })}
                name={SearchFields.year_end}
                id={SearchFields.year_end}
                type='number'
                step={1}
                onChange={onChangeDate}
                placeholder={t('form:f:year_end:ph') ?? ''}
                disabled={isLoading}
                className={`block w-full rounded-md border-0 py-1.5 px-2 bg-white dark:bg-indigo-200 text-gray-900 dark:text-gray-700 placeholder:text-slate-300 dark:placeholder:text-slate-400 disabled:bg-slate-300 shadow-sm ring-1 ring-inset ${
                  errors.year_end
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-600'
                    : 'ring-gray-300 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none`}
              />
              <p
                className='py-1.5 px-2 h-6 text-sm leading-4 text-red-600 dark:text-red-300'
                role='alert'
              >
                {errors.year_end && isSubmitted && errors.year_end.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='reset'
          disabled={isLoading}
          className='rounded-md box-border px-4 py-2 text-sm font-semibold bg-indigo-200 dark:bg-indigo-800 text-slate-800 dark:text-slate-200 hover:bg-indigo-300 dark:hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-300 disabled:border-slate-300 dark:disabled:border-slate-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          {t('form:btn:res')}
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='rounded-md box-border px-4 py-2 text-sm font-semibold bg-indigo-600 dark:bg-indigo-100 text-slate-200 dark:text-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-300 disabled:bg-slate-300 dark:disabled:bg-slate-300 disabled:border-slate-300 dark:disabled:border-slate-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          {t('form:btn:sbmt')}
        </button>
      </div>
    </form>
  );
};
