export default ({ app: { router }}) => {
  router.afterEach((to) => {
    if (process.browser) {
      window._hmt = window._hmt || [];
      window._hmt.push(["_trackPageview", to.fullPath]);   
    }
  });
};
