<template>
    <div class="page register-wrapper">
        <div class="sign-box">
            <div class="logo">
                <img src="../../assets/images/x-logo.png">
            </div>
            <h4 class="sign-title">注册新账号</h4>
            <h6 class="to-regist mt20">
                已有账号?
                <router-link
                    :to="{
                        name: 'login',
                        query: { redirect: $route.query.redirect }
                    }"
                >
                    立即登录
                </router-link>
            </h6>
            <el-divider />
            <el-form
                ref="sign-form"
                :model="form"
                inline-message
                @submit.native.prevent
            >
                <el-form-item
                    prop="phone"
                    :rules="phoneRules"
                >
                    <el-input
                        v-model.trim="form.phone"
                        placeholder="手机号"
                        maxlength="11"
                        type="tel"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="nickname"
                    :rules="nicknameRules"
                >
                    <el-input
                        v-model.trim="form.nickname"
                        placeholder="昵称"
                        maxlength="40"
                        type="text"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="email"
                    :rules="emailRules"
                >
                    <el-input
                        v-model.trim="form.email"
                        placeholder="邮箱"
                        maxlength="60"
                        type="text"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="password"
                    :rules="passwordRules"
                >
                    <el-input
                        v-model="form.password"
                        placeholder="密码"
                        type="password"
                        maxlength="30"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="passwordAgain"
                    :rules="passwordAgain"
                    clearable
                >
                    <el-input
                        v-model="form.passwordAgain"
                        placeholder="再次输入密码"
                        type="password"
                        maxlength="30"
                        clearable
                    />
                </el-form-item>
                <div class="terms">
                    <el-checkbox v-model="form.terms">注册即代表同意我们的</el-checkbox>
                    《<span
                        class="el-link el-link--primary"
                        @click="termsDialog=true"
                    >隐私权限</span>》
                </div>
                <el-divider />
                <el-button
                    round
                    type="primary"
                    size="middle"
                    class="btn-submit ml10"
                    @click="submit"
                >
                    立即注册
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import { EMAILREG, PASSWORDREG } from '@assets/js/const/reg';

export default {
    data() {
        return {
            form: {
                terms:         false,
                email:         '',
                phone:         '',
                nickname:      '',
                password:      '',
                passwordAgain: '',
            },
            termsDialog: false,
            phoneRules:  [
                {
                    required: true,
                    message:  '请输入你的手机号',
                },
                {
                    validator: (rule, value, callback) => {
                        if (/^1[3-9]\d{9}/.test(value)) {
                            callback();
                        } else {
                            callback(false);
                        }
                    },
                    message: '请输入正确的手机号',
                    trigger: 'blur',
                },
            ],
            emailRules: [
                {
                    required: true,
                    message:  '请输入你的邮箱',
                    trigger:  'blur',
                },
                {
                    validator: this.emailFormat,
                    message:   '请输入正确的邮箱',
                    trigger:   'blur',
                },
            ],
            nicknameRules: [
                {
                    required: true,
                    message:  '请输入你的昵称',
                    trigger:  'blur',
                },
                {
                    min:     3,
                    message: '您的昵称太短了',
                    trigger: 'blur',
                },
            ],
            passwordRules: [
                {
                    required: true,
                    message:  '请输入你的密码',
                },
                {
                    validator: this.passwordType,
                    message:   '密码至少8位, 需包含数字,字母,特殊字符任意组合',
                    trigger:   'blur',
                },
            ],
            passwordAgain: [
                {
                    required: true,
                    message:  '请再次输入密码',
                    trigger:  'blur',
                },
                {
                    min:     8,
                    message: '密码至少8位',
                    trigger: 'blur',
                },
                {
                    validator: this.passwordCheck,
                    message:   '两次密码不一致',
                    trigger:   'blur',
                },
            ],
        };
    },
    methods: {
        emailFormat(rule, value, callback) {
            if (EMAILREG.test(value)) {
                callback();
            } else {
                callback(false);
            }
        },
        passwordType(rule, value, callback) {
            if (PASSWORDREG.test(value)) {
                callback();
            } else {
                callback(false);
            }
        },
        passwordCheck(rule, value, callback) {
            if (value === this.form.password) {
                callback();
            } else {
                callback(false);
            }
        },
        submit() {
            this.$refs['sign-form'].validate(async valid => {
                if (valid) {
                    if (!this.form.terms)
                        return this.$message.error('请先勾选隐私权限');
                    const password = [
                        this.form.phone,
                        this.form.password,
                        this.form.phone,
                        this.form.phone.substr(0, 3),
                        this.form.password.substr(this.form.password.length - 3),
                    ].join('');
                    const { code } = await this.$http.post({
                        url:  '/account/register',
                        data: {
                            email:        this.form.email,
                            phone_number: this.form.phone,
                            nickname:     this.form.nickname,
                            password:     md5(password),
                        },
                    });

                    if (code === 0) {
                        this.$router.replace({
                            name: 'login',
                        });
                        this.$message.success('恭喜, 注册成功! 请重新登录');
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    @import './sign.scss';

    .register-wrapper{
        overflow: hidden;
        min-height: 100vh;
        background: linear-gradient(90deg,#434343 0,#000);
    }
    .sign-box{
        padding-top: 0;
        margin: 170px auto 100px;
        background: #fff;
        border-radius: 3px;
        padding: 20px 50px;
    }
    .terms{
        color: #6C757D;
        padding-top: 10px;
    }
    .btn-submit{
        display: block;
        margin: 0 auto;
    }
</style>
