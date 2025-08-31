import z from 'zod';
import { throwFetchErrorResponse } from './utils';

const CatAPIResponseSchema = z.array(
  z.object({
    url: z.string(),
  })
);

const getCats = async (count: number) => {
  const response = await throwFetchErrorResponse(
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`)
  );
  const rawData = await response.json();
  const data = CatAPIResponseSchema.parse(rawData);
  return Object.freeze(
    data
      // the limit query parameter doesn't seem to work as intended,
      // it returns 10 images even if 1 < count < 10
      .slice(0, count)
      .map((image) => Object.freeze({ type: 'cat', image: image.url }))
  );
};

export { getCats };
