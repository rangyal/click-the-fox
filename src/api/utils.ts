export const throwFetchErrorResponse = async (
  response: Promise<Response> | Response
) => {
  const res = await response;
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res;
};
