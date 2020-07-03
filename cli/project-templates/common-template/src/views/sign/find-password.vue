<template>
    <div class="page">
        <div class="sign-box">
            <div class="logo">
                <img src="../../assets/images/x-logo.png">
            </div>
            <h2 class="sign-title">找回密码</h2>
            <el-divider />
            <el-form
                ref="sign-form"
                v-model="form"
                inline-message
                @submit.native.prevent
            >
                <el-form-item
                    label="旧密码"
                    prop="old_password"
                    :rules="passwordRules"
                >
                    <el-input
                        v-model="form.old_password"
                        placeholder="旧密码"
                        type="password"
                        maxlength="30"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    label="新密码"
                    prop="new_password"
                    :rules="emailRules"
                >
                    <el-input
                        v-model="form.new_password"
                        placeholder="新密码"
                        type="password"
                        maxlength="30"
                        clearable
                    />
                </el-form-item>
                <el-divider />
                <div class="sign-action">
                    <router-link :to="{name: 'login'}">立即登录</router-link>
                    <el-button
                        type="primary"
                        class="ml10"
                        @click="submit"
                    >
                        提交
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                old_password: '',
                new_password: '',
            },
            passwordRules: [
                { required: true, message: '请输入你的用户名' },
                { min: 4, message: '用户名最少4位' },
            ],
            emailRules: [
                { required: true, message: '请输入注册时的邮箱' },
            ],
        };
    },
    methods: {
        submit() {
            this.$refs['sign-form'].validate(async valid => {
                if(valid) {
                    const { code, message } = await this.$http.post({
                        url:  '/account/update_password',
                        data: this.form,
                    });

                    if(code === 0) {
                        this.$message.success('密码更新成功! 请重新登录!');
                        window.localStorage.removeItem('userInfo');

                        this.$router.replace({
                            name: 'login',
                        });
                    } else {
                        this.$message.error(message);
                    }
                } else {
                    this.$message.error(valid.message);
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    @import './sign.scss';
</style>
