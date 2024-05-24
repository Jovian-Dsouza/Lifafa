const config = {
  screens: {
    Home: {
      path: "Home",
    },
    ContractTestScreen: {
      path: "ContractTestScreen/:id",
      parse: {
        id: id => `${id}`,
      }
    },
  },
};

export const linking = {
  prefixes: ["lifafa://"],
  config,
};
