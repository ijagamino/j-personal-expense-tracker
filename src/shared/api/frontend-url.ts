let baseUrl: string;

if (process.env.DEV) {
  baseUrl = `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`;
} else {
  baseUrl = `${process.env.FRONTEND_URL}`;
}

export { baseUrl };
