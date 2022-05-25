const mockUserService = {
  create: jest.fn(dto => {
    return {
      id: Date.now(),
      ...dto
    }
  }),

  update: jest.fn((id, dto) => {
    return {
      id,
      ...dto
    }
  }),
}

export default mockUserService;
