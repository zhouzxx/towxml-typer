/**
 * @description 本地mock数据模拟
 */

/**
 * @description 生成随机昵称
 * @returns {string} 随机昵称
 */
export const generateRandomNickname = () => {
  const nicknames = [
    '东东',
    '小东',
    '西西',
    '小西',
    '南南',
    '小南',
    '北北',
    '小北',
    '中中',
    '小中',
  ]
  return `图鸟-${nicknames[Math.floor(Math.random() * nicknames.length)]}`
}

/**
 * @description 生成随机头像
 * @returns {string} 随机头像
 */
export const generateRandomAvatar = (type: 'default' | 'xiong' = 'default') => {
  switch (type) {
    case 'xiong':
      return `https://resource.tuniaokj.com/images/avatar/xiong/x${
        Math.floor(Math.random() * 19) + 1
      }.jpg`
    default:
      return `https://resource.tuniaokj.com/images/avatar/default/${
        Math.floor(Math.random() * 49) + 1
      }.png`
  }
}

/**
 * @params {number} min 最小值
 * @params {number} max 最大值
 * @description 生成指定范围内的随机整数
 * @returns {number} 随机整数
 */
export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @params {number} min 最小值
 * @params {number} max 最大值
 * @params {number} decimal 小数位数
 * @description 生成指定范围内的随机浮点数
 * @returns {number} 随机浮点数
 */
export const generateRandomFloat = (min: number, max: number, decimal = 2) => {
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(decimal))
}
