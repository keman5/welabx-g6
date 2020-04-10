<template>
    <div class="table-component">
        <el-table
            class="mt15"
            :data="data"
            border
            size="mini"
            style="width: 100%">
            <slot name="column"></slot>
        </el-table>
        <div class="text-r mt10" v-if="data.length && showPage">
            <el-pagination
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total"
                @current-change="changePage($event)">
            </el-pagination>
        </div>
    </div>
</template>
<script src="./_dy-table.js"></script>
