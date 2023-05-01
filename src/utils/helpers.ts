import { imgFormats, imgResolutions, MD_RES, SM_RES, THUMB } from '../config/imgConfig';
import { SearchFields } from '../config/searchFields';
import { ISearchData } from '../pages/SearchPage/SearchPage';
import { IAssetItem } from '../queries/queries';
import { DEFAULT_Q_VALUE } from '../config/defaultValues';

export const getTrimmedStrOrNull = (str: string): string | null => {
  const trimmed = str.trim();
  return !trimmed ? null : trimmed;
};

export const getSearchQuery = (queryParams: ISearchData) => {
  const params: string[] = [];
  for (const param in queryParams) {
    const propData = queryParams[param as keyof typeof SearchFields];
    if (propData) {
      params.push(`${param}=${propData}`);
    } else {
      if (param === SearchFields.q) params.push(`${param}=${DEFAULT_Q_VALUE}`);
    }
  }

  return `${params.join('&')}`;
};

export interface IQueryObj {
  [key: string]: string;
}

export const getQueryObj = (queryParams: ISearchData) => {
  const qObj: IQueryObj = {};
  for (const param in queryParams) {
    const propData = queryParams[param as keyof typeof SearchFields];
    if (propData) {
      qObj[param] = propData;
    } else {
      if (param === SearchFields.q) qObj[param] = DEFAULT_Q_VALUE;
    }
  }
  return qObj;
};

export const getAvailableImg = (assets: IAssetItem[]) => {
  const testRes = new RegExp(imgFormats.join('|'));
  const images = assets.reduce((acc: string[], asset) => testRes.test(asset.href) ? [...acc, asset.href] : acc, []);
  return images;
};

export interface IImgBase {
  medium?: string,
  small?: string,
  thumb?: string
}

export interface IImg {
  [x: string]: IImgBase
}

export const getUniqueImages = (assets: string[]) => {
  const testRes = new RegExp(imgResolutions.join('|'));
  const images: IImg = {};
  for (let i = 0; i < assets.length; i++) {
    const imgName = assets[i].replace(testRes, '');
    if (!images[imgName]) {
      images[imgName] = {};
    }
    if (assets[i].includes(SM_RES)) {
      images[imgName].small = assets[i];
    }
    if (assets[i].includes(MD_RES)) {
      images[imgName].medium = assets[i];
    }
    if (assets[i].includes(THUMB)) {
      images[imgName].thumb = assets[i];
    }
  }

  const imgArr: IImgBase[] = [];
  for (const img in images) {
    imgArr.push({ ...images[img] });
  }

  return imgArr;
}