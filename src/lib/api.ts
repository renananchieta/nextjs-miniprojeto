export const api = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  url(path: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/^\/+/, "")}`;
  }
};
