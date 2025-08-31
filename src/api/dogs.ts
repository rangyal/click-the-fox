import { z } from 'zod';
import { throwFetchErrorResponse } from './utils';

const DogAPIResponseSchema = z.object({
  message: z.string(),
});

const getDog = async () => {
  const response = await throwFetchErrorResponse(
    fetch(`https://dog.ceo/api/breeds/image/random`)
  );
  const rawData = await response.json();
  const data = DogAPIResponseSchema.parse(rawData);
  return Object.freeze({ type: 'dog', image: data.message });
};

export { getDog };
