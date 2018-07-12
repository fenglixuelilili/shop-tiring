<template>
    <div>
        <div class="top">
             <nav-card eval1="权限管理" eval2="权限列表"></nav-card>   
        </div>
         <el-card class="box-card power">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="authName"
                    label="权限名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="path"
                    label="路径"
                    width="180">
                </el-table-column>
                <el-table-column
                  
                    label="层级">
                    <template slot-scope="scope">
                        <span v-if="scope.row.level==='0'">一级</span>
                        <span v-if="scope.row.level==='1'">二级</span>
                        <span v-if="scope.row.level==='2'">三级</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
      
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[]
        }
    },
    methods:{
        async getlist(){
            const res = await this.$axios.get('rights/list');
            this.tableData=res.data.data;
        }
    },
    created() {
        this.getlist();
    }
}
</script>

<style>

    .el-card__body{
        height: 450px;
        overflow: auto;
    }
    
</style>
