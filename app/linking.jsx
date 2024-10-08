const config = {
  screens: {
    Home: {
      path: "Home",
    },
    ContractTestScreen: {
      path: "ContractTestScreen/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
    Redeem: {
      path: "Redeem/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
  },
};

export const linking = {
  prefixes: ["lifafa://", "https://lifafa-okto.vercel.app"],
  config,
};
