export const paginateRules = (page: number, peerPage: number) => {
  return {
    skip: (page - 1) * peerPage,
    take: peerPage,
  };
};
