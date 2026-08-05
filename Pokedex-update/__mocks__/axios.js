const axios = {
  create: () => axios,
  get: jest.fn(async () => ({
    data: {
      next: null,
      results: [],
    },
  })),
};

module.exports = axios;
