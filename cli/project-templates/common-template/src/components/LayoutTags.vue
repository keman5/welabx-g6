<template>
    <div class="base-tags">
        <div
            ref="tags-nav"
            class="tags-list"
        >
            <el-tag
                v-for="(item, index) in tagsList"
                :key="index"
                :class="{'is-active': isActive(item.name)}"
                closable
                @close="closeTags(index)"
            >
                <template v-if="item.path">
                    <router-link
                        :to="{ name:item.name, query: $route.query }"
                        class="tags-li-title"
                    >
                        {{ item.title }}
                    </router-link>
                </template>
            </el-tag>
        </div>
        <el-dropdown
            class="tags-close-box"
            @command="handleTags"
        >
            <el-button
                size="mini"
                type="primary"
            >
                标签选项<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu
                slot="dropdown"
                size="small"
            >
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        computed: {
            tagsList() {
                return this.$store.state.base.tagsList || [];
            },
        },
        watch: {
            '$route.path'(newValue, oldValue) {
                this.setTags(this.$route);
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.setTags(this.$route);
            });
        },
        methods: {
            isActive(name) {
                return name === this.$route.name;
            },
            commitStore(list) {
                this.$store.commit('UPDATE_TAGSLIST', list);
            },
            // 关闭单个标签
            closeTags(index) {
                const tagsList = [...this.tagsList];
                const delItem = tagsList.splice(index, 1)[0];
                const item = tagsList[index] ? tagsList[index] : tagsList[index - 1];

                if (item) {
                    delItem.name === this.$route.name && this.$router.push({ name: item.name });
                }/*  else {
                    this.$router.push({ name: 'index' });
                } */
                this.commitStore(tagsList);
            },
            // 关闭全部标签
            closeAll() {
                this.commitStore([]);
            },
            // 关闭其他标签
            closeOther() {
                const tagsList = [...this.tagsList];
                const curItem = tagsList.filter(item => {
                    return item.name === this.$route.name;
                });

                this.commitStore(curItem);
            },
            // 设置标签
            setTags(route) {
                const tagsList = [...this.tagsList];
                const tagIndex = tagsList.findIndex(item => item.name === route.name);

                if (tagIndex < 0) {
                    tagsList.push({
                        title: route.meta.title,
                        path:  route.path,
                        name:  route.name,
                        query: route.query,
                    });
                }
                this.commitStore(tagsList);

                this.$nextTick(() => {
                    // 将该位置显示出来
                    const tagsNav = this.$refs['tags-nav'];
                    const tag = tagsNav.children[tagsList.findIndex(item => item.name === route.name)];

                    tagsNav.scrollTo(0, 0);

                    if(tag.offsetLeft + tag.offsetWidth > tagsNav.offsetWidth) {
                        tagsNav.scrollTo(tag.offsetLeft - tagsNav.offsetWidth + tag.offsetWidth, 0);
                    }
                });
            },
            handleTags(command) {
                command === 'other' ? this.closeOther() : this.closeAll();
            },
        },
    };
</script>

<style lang="scss">
    @import '@assets/styles/_variable';

    .base-tags {
        height: 30px;
        background: #f5f6fa;
        padding: 3px 120px 3px 10px;
        box-shadow: 0 3px 3px rgba(146, 146, 146, 0.1);
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
    }
    .tags-list {
        overflow-x: auto;
        white-space: nowrap;
        &::-webkit-scrollbar{height: 0;}
        .el-tag {
            border: 0;
            height: 24px;
            line-height: 24px;
            margin-right: 10px;
        }
        .tags-li-title{
            text-decoration: none;
            color: $color-text-light;
        }
        .el-tag__close {
            color: $color-text-light;
        }
        .is-active {
            color: #fff;
            background: $color-link-base;
            &:hover {
                background: $color-link-base-hover;
            }
            .tags-li-title,
            .el-tag__close {
                color: #fff;
            }
        }
    }
    .tags-close-box {
        position: absolute;
        top: 3px;
        right: 10px;
        .el-button {
            height: 24px;
            line-height: 22px;
            padding:0 10px;
        }
    }
</style>
