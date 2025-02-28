const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        setHref: (val) => {
          return (href = val);
        },
        getHref: () => {
          return href;
        },
      });
    },
    testIsolation: false,
  },
});
