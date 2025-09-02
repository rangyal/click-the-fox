import { http, HttpResponse } from 'msw';

let count = 0;

export const handlers = [
  http.get('https://api.thecatapi.com/v1/images/search', ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    return HttpResponse.json(
      Array.from({ length: Number(limit) }, () => ({
        url: `https://api.thecatapi.com/v1/images/image_${++count}.jpg`,
      }))
    );
  }),
  http.get('https://dog.ceo/api/breeds/image/random', () => {
    return HttpResponse.json({
      message: `https://dog.ceo/api/breeds/image/image_${++count}.jpg`,
    });
  }),
  http.get('https://randomfox.ca/floof/', () => {
    return HttpResponse.json({
      image: `https://randomfox.ca/floof/image_${++count}.jpg`,
    });
  }),
];
