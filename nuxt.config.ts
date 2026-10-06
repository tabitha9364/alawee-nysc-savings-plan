export default defineNuxtConfig({
  srcDir: "src/",
  compatibilityDate: "2025-01-01",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint"],
  css: ["~/styles/main.css"],
  typescript: { strict: true },
  app: {
    head: {
      title: "Alawee — Make room for Future You",
      meta: [
        {
          name: "description",
          content: "A savings plan concept for your NYSC service year.",
        },
        { name: "theme-color", content: "#f5f7f8" },
      ],
    },
  },
});
