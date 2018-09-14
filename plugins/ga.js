export default ({ app: { router }}) => {
  router.afterEach((to) => {
    window._hmt = window._hmt || [];
    window._hmt.push(["_trackPageview", to.fullPath]);
  });
};
