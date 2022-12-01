import { Url } from '../url/url.entity';

const mockFindOneBy = jest.fn((dto: any) => {
  if (dto?.hobbitLink == mockHobbitLink) {
    return mockUrl;
  }
  return undefined;
});
const mockSave = jest.fn((options: any) => {
  return options;
});
const MockRepository = jest.fn().mockImplementation(() => {
  return {
    findOneBy: mockFindOneBy,
    save: mockSave,
  };
});
export const mockRepository = new MockRepository();

export const mockHobbitLink = 'ur_zdh';
export const mockUrl: Url = {
  id: 1,
  hobbitLink: mockHobbitLink,
  url: 'https://www.google.com',
  clicks: 8,
  isActive: true,
  expiresAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockProxyService = {
  toUrl: jest.fn().mockImplementation((dto) => {
    if (dto.hobbitLink === mockHobbitLink) {
      return mockUrl;
    }
    return undefined;
  }),
};
