<template>
    <div class="table-component">
        <el-table
            class="mt15"
            :data="data"
            border
            size="mini"
            style="width: 100%"
        >
            <slot name="column" />
        </el-table>
        <div
            v-if="data.length && showPage"
            class="text-r mt10"
        >
            <el-pagination
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total"
                @current-change="changePage($event)"
            />
        </div>
    </div>
</template>

<script src="./_dy-table.js"></script>
