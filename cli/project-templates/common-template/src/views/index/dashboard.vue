<template>
    <div
        class="page"
    >
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card
                    v-loading="message_list_loading"
                    class="box-card"
                >
                    <div
                        slot="header"
                        class="clearfix"
                    >
                        <span>Message</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text"
                        >
                            <el-switch
                                v-model="message_search.unread"
                                active-text="仅看未读"
                                inactive-text="查看全部"
                                @change="messageSearchChangeUnread"
                            />
                        </el-button>
                    </div>
                    <el-collapse
                        v-infinite-scroll="loadMessageList"
                        class="message_list"
                        infinite-scroll-delay="100"
                        accordion
                        @change="handleMessageListCollapseChange"
                    >
                        <el-collapse-item
                            v-for="(item,index) in message_list"
                            :key="item.id"
                            :name="index"
                            :class="item.unread ? 'unread' : ''"
                        >
                            <template slot="title">
                                <i :class="message_level_icon[item.level]" />
                                {{ item.title }}
                                <i
                                    v-if="item.unread"
                                    class="el-icon-message unread-icon"
                                />
                                <span class="time">{{ item.created_time | dateFormat }}</span>
                            </template>
                            {{ item.content }}
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import table from '@src/mixins/table.js';

    export default {
        mixins: [table],
        data() {
            return {
                message_list_loading: false,

                message_tag_type: {
                    info:    'info',
                    success: 'success',
                    warning: 'warning',
                    error:   'danger',
                },
                message_level_icon: {
                    info:    'el-icon-info info level',
                    success: 'el-icon-success success level',
                    warning: 'el-icon-warning warning level',
                    error:   'el-icon-error error level',
                },
                message_search: {
                    unread:     true,
                    page_index: 0,
                    page_size:  15,
                },

                message_list: [],
            };
        },
        async created() {

        },
        methods: {
            async loadMessageList() {
                this.message_list_loading = true;
                const { code, data } = await this.$http.post({
                    url:  '/message/query',
                    data: this.message_search,
                });

                if(code === 0) {
                    for(const i in data.list){
                        this.message_list.push(data.list[i]);
                    }
                    this.message_search.page_index++;
                }
                this.message_list_loading = false;
            },
            async handleMessageListCollapseChange(index){
                const message = this.message_list[index];

                // 将消息标记为已读
                await this.$http.post({
                    url:  '/message/read',
                    data: { id: message.id },
                });
                // 更新界面状态
                message.unread = false;
            },
            // 消息面板切换 查看全部/仅看未读 状态时重新加载消息列表
            async messageSearchChangeUnread(value){
                // 重置状态和搜索参数
                this.message_list = [];
                this.message_search.page_index = 0;
                if(!value){
                    this.message_search.unread = null;
                }
                this.loadMessageList();
            },
        },
    };
</script>
<style lang="scss">
    .message_list {
        height: 500px;
        overflow: auto;
        margin-top: -21px;
    }
    .message_list .el-collapse-item__header{
        position:relative;
    }
    .message_list .el-collapse-item__header .level{
        font-size: 18px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .message_list .unread .el-collapse-item__header{
        font-weight: bold;
    }
    .message_list .el-collapse-item__header .time{
        display: block;
        position: absolute;
        right: 40px;
        font-weight: 100;
        color: #999;
    }
    .message_list .unread .el-collapse-item__header .unread-icon{
        color: red;
        margin-left: 5px;
    }
    .message_list .el-tag{
        margin-left: 8px;
        margin-right: 8px;
    }
    .message_list .el-collapse-item__content{
        padding:8px;
        text-indent: 30px;
    }
    .success{
        color: #35c895;
    }
    .error{
        color: #f85564;
    }
    .warning{
        color: #f1b92a;
    }
    .info{
        color: #28c2d7;
    }
</style>
