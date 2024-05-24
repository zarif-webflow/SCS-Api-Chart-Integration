export const removePageLoader = () => {
  const pageWrapper = document.querySelector('.page-wrapper');
  if (!pageWrapper) {
    throw new Error(".page-wrapper wasn't found!");
  }
  const pageLoader = pageWrapper.querySelector('.page-loader');
  if (!pageLoader) {
    throw new Error(".page-loader wasn't found!");
  }
  pageWrapper.classList.remove('is-loading');
  pageLoader.remove();
};
