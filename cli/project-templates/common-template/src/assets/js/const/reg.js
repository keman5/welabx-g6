/*!
 * @author claude
 * date 07/05/2019
 * 通用正则
 */

// 邮箱匹配规则
export const EMAILREG = /^(?:\w+\.?)*\w+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// 密码强度规则
export const PASSWORDREG = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
