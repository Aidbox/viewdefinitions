module.exports = {
  content:
    [
    ].concat(process.env.NODE_ENV ==
      'production'
      ? ["./resources/client/public/out/app.js"]
      : ["./src/viewdef_designer/**/*.{clj,cljs,cljc}", "./resources/client/public/opt/cljs-runtime/*.js"]),
  theme: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
