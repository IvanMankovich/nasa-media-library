import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS, BASE_API } from '../config/api';
import { ISearchData } from '../pages/SearchPage/SearchPage';
import { getSearchQuery } from '../utils/helpers';

interface INasaLink {
  href: string;
  rel: string;
}

interface ICollectionDataItem {
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
  title: string;
  album?: string[];
}

interface ICollectionItemLink extends INasaLink {
  render: string;
}

interface ICollectionLink extends INasaLink {
  prompt: string;
}

export interface IAssetItem {
  href: string;
}

export interface ICollectionItem {
  data: ICollectionDataItem[];
  href: string;
  links: ICollectionItemLink[];
}

interface ICollection {
  href: string;
  items: ICollectionItem[];
  links: ICollectionLink[];
  metadata: { total_hits: number };
  version: string;
  assets?: IAssetItem[];
}

interface INasaAPI {
  collection: ICollection;
}

export const getPosts = async (queryParams: ISearchData) => {

  const response: AxiosResponse<INasaAPI> = await axios.get(
    `${BASE_API}${API_ENDPOINTS.search}?${getSearchQuery(queryParams)}&media_type=image`,

  );

  return response.data;
};

export const getPostById = async (id: string) => {
  const response: AxiosResponse<INasaAPI> = await axios.get(
    `${BASE_API}${API_ENDPOINTS.search}?nasa_id=${id}&media_type=image`,

  );

  const assets = await getAssetsByNasaId(id);
  response.data.collection.assets = assets.collection.items;

  return response.data;
};

export const getAssetsByNasaId = async (id: string) => {
  const response: AxiosResponse<INasaAPI> = await axios.get(
    `${BASE_API}${API_ENDPOINTS.asset}/${id}`,
  );

  return response.data;
};
