<template>
    <div>
          <div class="top">
             <nav-card eval1="商品管理" eval2="商品分类"></nav-card>   
        </div>
        <el-button tyep="success" plain class="btn" @click="showAddCate"> 添加分类</el-button>
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
                         <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showEditCate(scope.row)"></el-button>
                        <el-button type="warning" plain size="mini" icon="el-icon-delete" @click="delCate(scope.row)"></el-button>    
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
        <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="productDialogFormVisible">
        <el-form :model="productDate" ref="formDatas">
            <el-form-item label="活动名称" :label-width="'100px'" prop="cat_name">
                <el-input v-model="productDate.cat_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" :label-width="'100px'">

                 <!-- <el-cascader
                    expand-trigger="hover"
                    :options="option"
                    change-on-select
                    :props="{
                        label:'cat_name',
                        children:'children',
                        value:'cat_id'   
                    }"
                    v-model="selectedOptions2">
                </el-cascader> -->
                <level :num="2" @dataChange="getselection"></level>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="productDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addcate">确 定</el-button>
        </div>
    </el-dialog>

     <el-dialog title="编辑分类" :visible.sync="editDialogFormVisible">
        <el-form :model="editDate">
            <el-form-item label="编辑分类" :label-width="'100px'">
                <el-input v-model="editDate.cat_name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editcate">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
import eltree from 'element-tree-grid';
// Vue.component(ElTreeGrid.name,ElTreeGrid);
import level from "../comments/level.vue";
export default {
    components:{
        eltree,
        level
    },
    data(){
        return {
            tableData:[],
            total:0,
            currentpage:1,
            pagesize:4,
            productDate:{
                cat_name:''
            },
             editDate:{
                cat_name:''
            },
            editId:-1,
            productDialogFormVisible:false,
            selectedOptions2:[]
            // option:[],
            // editDialogFormVisible:false
        }
    },
    methods:{
        getselection(select){
            // console.log(select);
            this.selectedOptions2=select;
        },
        async getAllList(){
            const res = await this.$axios.get(`categories?type=3&pagenum=${this.currentpage}&pagesize=${this.pagesize}`);
            // console.log(res,1111111111111111);
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
      },

    //   展示全部分类
      async showAddCate(){
        this.productDialogFormVisible=true;
        const  result = await this.$axios.get('categories?type=2');
        // console.log(result);
        this.option=result.data.data;
      }, 
    //   添加分类业务逻辑
        async addcate(){
            //  console.log(this.selectedOptions2);
            var dataForm={
                ...this.productDate,
                cat_pid:this.selectedOptions2[this.selectedOptions2.length],
                cat_level:this.selectedOptions2.length
            };
            const res = await this.$axios.post("categories",dataForm);
            console.log(res);
            const {data,meta:{msg,status}}=res.data;
            if(status==201){
                // this.$refs.formDatas.resetField();
                this.productDate.cat_name="";
                this.selectedOptions2=[];
                 this.productDialogFormVisible = false;
                this.$message.success(msg);
                this.getAllList();
            }else{
                this.$message.error(msg);
            }
            
        },
        // 删除分类
        async delCate(scope){
            console.log(scope.cat_id);
            const res = await this.$axios.delete('categories/'+scope.cat_id);
            // console.log(res);
            const {msg,status}=res.data.meta;
            if(status===200){
                this.getAllList();
                this.$message.success(msg);
            }else{
                 this.$message.error(msg);
            }
        },
        // 显示编辑分类，并将分类填到对话框
        async showEditCate(scope){
            this.editId=scope.cat_id;
            this.editDialogFormVisible=true;
            const result = await this.$axios.get("categories/"+scope.cat_id);
            // console.log(result);
            const {data:{cat_name},meta:{msg,status}}=result.data;
            if(status==200){
                this.$message.success(msg);
                this.editDate.cat_name=cat_name;
            }else{
               this.$message.error(msg);      
            }

        },
        // 点击确定按钮实现编辑功能业务逻辑
        async editcate(){
            const result = await this.$axios.put("categories/"+this.editId,{
                cat_name:this.editDate.cat_name
            });
            // console.log(result);
            const {data,meta:{msg,status}}=result.data;
            if(status==200){
                this.$message.success(msg);
                this.getAllList();
                this.editDialogFormVisible=false;
            }else{
                this.$message.error(msg);
            }
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
