<template>
    <div>
          <div class="top">
             <nav-card eval1="商品管理" eval2="商品列表"></nav-card>   
        </div>
        <el-button tyep="success" plain class="btn" @click="$router.push({name:'addGoods'})"> 添加商品</el-button>
        <el-card>
        <!-- 数据表格 -->
        <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                type="index"
                width="50">
                </el-table-column>
                 <el-table-column
                    property="goods_name"
                    label="商品名称"
                    width="120">
                </el-table-column>

                <el-table-column
                    property="goods_price"
                    label="商品价格"
                    width="120">
                </el-table-column>
                   <el-table-column
                    property="goods_weight"
                    label="商品重量"
                    width="120">
                </el-table-column>

                <el-table-column
                    property="add_time"
                    label="创建时间"
                    width="120">
                </el-table-column>

              <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-row>
                         <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                        <el-button type="warning" plain size="mini" icon="el-icon-delete" ></el-button>    
                    </el-row>
                </template>
                
            </el-table-column>
    </el-table>  

    <!-- 分业 -->
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
        // 渲染商品列表
        async getAllList(){
            const res = await this.$axios.get(`goods?type=3&pagenum=${this.currentpage}&pagesize=${this.pagesize}`);
            const {data:{goods,total},meta:{msg,status}}=res.data;
            // console.log(res);
            if(status==200){
                this.tableData=goods;
                 this.total=total;
                   this.$message.success(msg);
            }else{
                this.$message.error(msg);
            }
        },
        // 分页逻辑
        handleSizeChange(val) {
            this.pagesize=val;
            this.getAllList();
            // console.log(`每页 ${val} 条`);
         },
      handleCurrentChange(val) {
          this.getAllList();
          this.currentpage=val;
        // console.log(`当前页: ${val}`);
      },
    //  
    //   showAddproduct(){

    //   } 
    },
    created(){
        this.getAllList();
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
