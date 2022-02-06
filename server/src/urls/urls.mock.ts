const mockSave = jest.fn((dto: any) => {
  return dto;
});
const MockRepository = jest.fn().mockImplementation(() => {
  return {
    save: mockSave,
  };
});
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
};
