const cnameValid = (val) => { // 正则，2到20位（中英文，数字，下划线，减号）
    const uPattern = /^[\u4e00-\u9fa5_a-zA-Z\d-]{2,20}$/;
    return uPattern.test(val);
};

const enameValid = (val) => { // 正则，4到50位（字母，数字，下划线，减号）
    const uPattern = /^[a-zA-Z0-9_-]{4,50}$/;
    return uPattern.test(val);
};

const passwordValid = (val) => { // 密码正则，6-16位（大小字母与数字组合）
    if (val.length < 6 || val.length > 16) return false;
    const uPattern = /^(?![^A-Z]+$)(?![^a-z]+$)(?!\D+$)/;
    return uPattern.test(val);
};

const emailValid = (val) => { // 邮箱正则
    const uPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return uPattern.test(val);
};

const numberValid = (val) => { // 数字正则
    const uPattern = /^\d+$/;
    return uPattern.test(val);
};

/**
 * 验证手机号码
 *
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 *
 */
const phoneValid = (val) => {
    const uPattern = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
    return uPattern.test(val);
};

/**
 * 检查手机号码格式以及是否为空
 */
const phoneCheck = (phone) => {
    if (!phone) {
        $app.$message.error('请填写手机号码');
        return false;
    } else if (!phoneValid(phone)) {
        $app.$message.error('手机号码输入错误');
        return false;
    }
    return true;
};

export { cnameValid, enameValid, passwordValid, emailValid, numberValid, phoneValid, phoneCheck };
