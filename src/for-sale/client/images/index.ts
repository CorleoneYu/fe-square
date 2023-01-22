function importAll(imageModule: __WebpackModuleApi.RequireContext) {
  const images: any = {};
  imageModule.keys().map((item) => {
    const key = item.replace('./', '');
    images[key] = imageModule(item).default;
  });
  return images;
}

const imageModule = require.context('./', false, /\.png/);
export const cardUrls = importAll(imageModule);

// const getCardsUrl = (index: number, prefix: string) => `./${prefix}${index >= 10 ? 'index' : `0${index}`}.png`;

// // 总共有 15 张不同的银行卡牌
// const BANKNOTE_COUNT = 15;

// export const banknoteCards = new Array(BANKNOTE_COUNT).fill(0).map((_value: number, index: number) => {
//   const id = index === 0 ? 0 : index + 1;
//   console.log(getCardsUrl(id, 'money'));
//   return require(getCardsUrl(id, 'money'));
// });

// // 总共有 30 张不同的房子牌
// const HOUSE_COUNT = 30;

// export const houseCards = new Array(HOUSE_COUNT)
//   .fill(0)
//   .map((_value: number, index: number) => require(getCardsUrl(index + 1, 'card')));
