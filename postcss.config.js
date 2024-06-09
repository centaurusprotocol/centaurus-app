module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 转换的根元素的基准值
      // 正常去情下按照你的设计稿来
      // 1920 宽的设计稿， 1920 / 10 = 192
      // 750 宽的设计稿， 750 / 10 = 75
      // 370 宽的设计稿， 370 / 10 = 37.5
      rootValue: 16, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      // 需要转换的CSS属性，*就是所有属性都要转换
      propList: ['*'],
    },
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
  },
};
