<template>
    <div class="page">
        <div class="sign-box">
            <div class="logo">
                <img src="../../assets/images/x-logo.png">
            </div>
            <h2 class="sign-title">欢迎使用</h2>
            <p class="sub-title mt10">请登录你的账号</p>
            <h4 class="to-regist mt20">
                还没有账号?
                <router-link :to="{name: 'register', query: { redirect: $route.query.redirect }}">立即注册</router-link>
            </h4>
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
                        v-model="form.phone"
                        placeholder="手机号"
                        maxlength="11"
                        type="tel"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="password"
                    :rules="passwordRules"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        maxlength="30"
                        placeholder="密码"
                        clearable
                    />
                </el-form-item>
                <el-checkbox v-model="form.keepAlive">保持登录</el-checkbox>
                <el-divider />
                <div class="sign-action">
                    <el-button
                        type="primary"
                        @click="submit"
                    >
                        立即登录
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';

export default {
    data() {
        return {
            form: {
                keepAlive: false,
                password:  '',
                phone:     '',
            },
            phoneRules: [
                { required: true, message: '请输入你的手机号' },
                {
                    validator: (rule, value, callback) => {
                        if(/^1[3-9]\d{9}/.test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的手机号'));
                        }
                    },
                    trigger: 'blur',
                },
            ],
            passwordRules: [
                { required: true, message: '请输入你的密码' },
            ],
        };
    },
    created() {
        this.form.keepAlive = Boolean(window.localStorage.getItem('keepAlive'));
    },
    methods: {
        submit() {
            this.$refs['sign-form'].validate(async valid => {
                if(valid) {
                    const password = [this.form.phone, this.form.password, this.form.phone, this.form.phone.substr(0, 3), this.form.password.substr(this.form.password.length - 3)].join('');
                    const { code, data } = await this.$http.post({
                        url:  '/account/login',
                        data: {
                            phone_number: this.form.phone,
                            password:     md5(password),
                        },
                    });

                    if(code === 0 || code === 10000) {
                        const { localStorage } = window;

                        localStorage.setItem('userInfo', JSON.stringify(data));

                        if(this.form.keepAlive) {
                            localStorage.setItem('keepAlive', true);
                        } else {
                            localStorage.removeItem('keepAlive');
                        }
                    }

                    if(code === 0){
                        this.$router.replace({
                            name: 'index',
                        });
                    }else if(code === 10000){
                        this.$router.replace({
                            name: 'init',
                        });
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    @import './sign.scss';
</style>
