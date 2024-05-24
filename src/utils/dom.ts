export const removePageLoader = () => {
  const pageLoader = document.querySelector('.page-loader');
  if (!pageLoader) {
    throw new Error(".page-loader wasn't found!");
  }
  pageLoader.remove();
};
