<template>
    <div>
          <div class="top">
             <nav-card eval1="商品管理" eval2="商品列表"></nav-card>   
        </div>
        <el-button tyep="success" plain class="btn"> 添加分类</el-button>
        <el-card>
        <el-table
            :data="tableData"
            style="width: 100%">
            <eltree
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            levelKey="cat_level"
            parentKey="cat_pid"
            childKey="children"
            indentSize="30">
                
            </eltree>  
            <!-- <el-table-column
                prop="cat_name"
                label="分类名称"
                width="180">
            </el-table-column> -->
            <el-table-column
                label="级别"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_level===0">一级</span>
                    <span v-if="scope.row.cat_level===1">二级</span>
                    <span v-if="scope.row.cat_level===2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                    {{scope.row.cat_deleted?"无效":"有效"}}
                </template>
            </el-table-column>

              <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-row>
                         <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                        <el-button type="warning" plain size="mini" icon="el-icon-delete"></el-button>    
                    </el-row>
                </template>
                
            </el-table-column>
    </el-table>  
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[4, 8, 16, 32]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </el-card>
    </div>
</template>

<script>
import eltree from 'element-tree-grid';
// Vue.component(ElTreeGrid.name,ElTreeGrid);
export default {
    components:{
        eltree
    },
    data(){
        return {
            tableData:[],
            total:0,
            currentpage:1,
            pagesize:4
        }
    },
    methods:{
        async getAllList(){
            const res = await this.$axios.get(`categories?type=3&pagenum=${this.currentpage}&pagesize=${this.pagesize}`);
            console.log(res,1111111111111111);
            const {data:{result,total},meta:{msg,status}}=res.data;
            // console.log(data);
            if(status==200){
                this.tableData=result;
                 this.total=total;
                   this.$message.success(msg);
            }else{
                this.$message.error(msg);
            }
            
           
        },
        handleSizeChange(val) {
            this.pagesize=val;
            this.getAllList();
            // console.log(`每页 ${val} 条`);
         },
      handleCurrentChange(val) {
          this.getAllList();
          this.currentpage=val;
        // console.log(`当前页: ${val}`);
      }
    },
    created(){
        this.getAllList()
    }
}
</script>

<style>
    .top{
        margin-bottom: 10px;
    }
    .btn{
        margin-bottom: 10px;
        border-radius: 10px;
    }
</style>
