import { getTrimmedStrOrNull, getSearchQuery, getQueryObj, getAvailableImg, getUniqueImages } from "./helpers";

describe('isEmtyStr', () => {
  test('Empty string', () => {
    expect(getTrimmedStrOrNull('')).toBe(null);
  })
  test('String of spaces', () => {
    expect(getTrimmedStrOrNull('   ')).toBe(null);
  })
  test('String with both sides spaces', () => {
    expect(getTrimmedStrOrNull(' abc ')).toBe('abc');
  })
  test('String with inner spaces and both sides spaces', () => {
    expect(getTrimmedStrOrNull(' abc cba ')).toBe('abc cba');
  })
});

describe('getSearchQuery', () => {
  test('All passed values', () => {
    expect(getSearchQuery({
      q: '1',
      year_start: '2',
      year_end: '3',
      page: '4',
      page_size: '5',
    })).toBe('q=1&year_start=2&year_end=3&page=4&page_size=5');
  })
  test('Few null values', () => {
    expect(getSearchQuery({
      q: null,
      year_start: null,
      year_end: '3',
      page: '4',
      page_size: '5',
    })).toBe('q=&year_end=3&page=4&page_size=5');
  })
  test('All null values', () => {
    expect(getSearchQuery({
      q: null,
      year_start: null,
      year_end: null,
      page: null,
      page_size: null,
    })).toBe('q=');
  })
})

describe('getQueryObj', () => {
  test('All passed values', () => {
    expect(getQueryObj({
      q: '',
      year_start: '2',
      year_end: '3',
      page: '4',
      page_size: '5',
    })).toStrictEqual({
      q: '',
      year_start: '2',
      year_end: '3',
      page: '4',
      page_size: '5',
    });
  })
  test('Few null values', () => {
    expect(getQueryObj({
      q: '',
      year_start: '2',
      year_end: '3',
    })).toStrictEqual({
      q: '',
      year_start: '2',
      year_end: '3',
    });
  })
  test('All null values', () => {
    expect(getQueryObj({
      q: null,
      year_start: null,
      year_end: null,
      page: null,
      page_size: null,
    })).toStrictEqual({
      q: ''
    });
  })
})

describe('getAvailableImg', () => {
  test('All passed values', () => {
    expect(getAvailableImg([{
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~orig.tif"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"
    }])).toStrictEqual([
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"]);
  })
  test('Few null values', () => {
    expect(getAvailableImg([{
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~orig.tif"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/metadata.json"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/metadata.xml"
    }])).toStrictEqual([
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"]);
  })
  test('All null values', () => {
    expect(getAvailableImg([{
      href: "http://images-assets.nasa.gov/image/201105240006HQ/metadata.json"
    }, {
      href: "http://images-assets.nasa.gov/image/201105240006HQ/metadata.xml"
    }])).toStrictEqual([]);
  })
})

describe('getUniqueImages', () => {
  test('One obj with all passed values', () => {
    expect(getUniqueImages([
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"])).toStrictEqual([{
        small: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
        medium: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
        thumb: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"
      }
      ]);
  })
  test('Few obj with all passed values', () => {
    expect(getUniqueImages([
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~medium.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~thumb.jpg",
    ])).toStrictEqual([
      {
        small: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
        medium: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~medium.jpg",
        thumb: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"
      }
      ,
      {
        small: "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~small.jpg",
        medium: "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~medium.jpg",
        thumb: "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~thumb.jpg"
      }

    ]);
  })

  test('Few obj with few passed values', () => {
    expect(getUniqueImages([
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~large.jpg",
      "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~medium.jpg",
    ])).toStrictEqual([
      {
        small: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~small.jpg",
        thumb: "http://images-assets.nasa.gov/image/201105240006HQ/201105240006HQ~thumb.jpg"
      }
      ,
      {
        medium: "http://images-assets.nasa.gov/image/201105240006HQ/201105240005HQ~medium.jpg",
      }

    ]);
  })
})