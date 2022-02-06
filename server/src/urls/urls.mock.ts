const mockSave = jest.fn((options: any) => {
  return options;
});
const mockFind = jest.fn((options) => {
  if (options?.take) {
    return mockUrls.slice(0, options.take);
  }
  return mockUrls;
});
const MockRepository = jest.fn().mockImplementation(() => {
  return {
    save: mockSave,
    find: mockFind,
  };
});
const mockUrls = [
  {
    id: 1,
    hobbitLink: '',
    url: 'https://www.google.com',
    clicks: 0,
    isActive: true,
    expiresAt: '2022-02-02T03:51:51.222Z',
    createdAt: '2022-02-02T03:43:25.859Z',
    updatedAt: '2022-02-02T03:43:25.859Z',
  },
  {
    id: 2,
    hobbitLink: '',
    url: 'https://www.google.com',
    clicks: 0,
    isActive: true,
    expiresAt: '2022-02-02T04:07:20.244Z',
    createdAt: '2022-02-02T04:07:20.244Z',
    updatedAt: '2022-02-02T04:07:20.244Z',
  },
  {
    id: 3,
    hobbitLink: '',
    url: 'https://www.google.com',
    clicks: 0,
    isActive: true,
    expiresAt: '2022-02-03T04:22:25.421Z',
    createdAt: '2022-02-02T04:22:25.447Z',
    updatedAt: '2022-02-02T04:22:25.447Z',
  },
  {
    id: 5,
    hobbitLink: 'KaRwa',
    url: 'https://www.google.com',
    clicks: 0,
    isActive: true,
    expiresAt: '2022-02-03T16:43:52.000Z',
    createdAt: '2022-02-04T05:31:35.810Z',
    updatedAt: '2022-02-05T16:48:09.278Z',
  },
];
export const mockRepository = new MockRepository();
export const mockExpiration = {
  getExpirationDate: jest.fn().mockImplementation(),
};
export const mockLogger = {
  setContext: jest.fn().mockImplementation(),
  debug: jest.fn().mockImplementation(),
};
export const mockCreateUrlDto = {
  url: 'https://google.com',
  hobbitLink: 'wtd_g',
};

export const mockService = {
  createHobbitLink: jest.fn().mockImplementation((dto) => dto),
  getUrls: jest.fn().mockImplementation(() => mockUrls),
};
