import { z } from 'zod';
import { throwFetchErrorResponse } from './utils';

const FoxAPIResponseSchema = z.object({
  image: z.string(),
});

const getFox = async () => {
  const response = await throwFetchErrorResponse(
    fetch(`https://randomfox.ca/floof/`)
  );
  const rawData = await response.json();
  const { image } = FoxAPIResponseSchema.parse(rawData);
  return Object.freeze({ type: 'fox', image });
};

export { getFox };
