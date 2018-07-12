<template>
    <div class="rols">
         <div class="top">
             <nav-card eval1="权限管理" eval2="角色管理"></nav-card>   
        </div>
        <el-button>添加角色</el-button>
        <el-card>

            <el-table
                :data="tableData"
                style="width: 100%">
                 <el-table-column
                   
                     type="expand">
                     <template slot-scope="scope"> 
                         <el-row 
                            v-for="item1 in scope.row.children"
                            :key="item1.id">
                             <el-col :span="6">
                                <el-tag 
                                    type="success" 
                                    closable
                                    class="tag"
                                    @close="tagClose(scope.row,item1.id)">
                                    {{item1.authName}}
                                </el-tag>
                             </el-col>
                             <el-col :span="18">
                                 <el-row
                                  v-for="item2 in item1.children"
                                    :key="item2.id">
                                    <el-col :span="8">
                                        <el-tag 
                                            type="success" 
                                            closable
                                            class="tag"
                                            @close="tagClose(scope.row,item2.id)">
                                            {{item2.authName}}
                                        </el-tag>  
                                    </el-col>

                                    <el-col :span="16">
                                        <el-tag 
                                             type="success" 
                                            closable
                                            v-for="item3 in item2.children"
                                            :key="item3.id"
                                            class="tag"
                                            @close="tagClose(scope.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>    
                                    </el-col>
                                 </el-row>
                             </el-col>
                         </el-row>
                       
                    </template>   
                </el-table-column>

                <el-table-column
                    type="index"
                    >
                </el-table-column>

                <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="180">
                     
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="角色描述"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                     <template slot-scope="scope">
                        <el-row>
                            <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                            <el-button type="danger" plain  size="mini" icon="el-icon-share" @click="showTree(scope.row)"></el-button>
                            <el-button type="warning" plain size="mini" icon="el-icon-delete"></el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="提示"
                :visible.sync="treeVisible"
                width="50%"
                >
                <!-- <span>这是一段信息</span> -->
                <!-- 这里放树装结构 -->
                <el-tree
                    :data="treeList"
                    show-checkbox
                    node-key="id"
                    default-expand-all="true"
                    :default-checked-keys="defaultKeysArr"
                    :props="defaultProps"
                    ref="tree">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="treeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="resetPower">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[],
            treeVisible:false,
            treeList:[],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            // 默认选中的id数组集合，也是双向数据绑定，只要有选中的数组中就存着呢
            defaultKeysArr:[],
            rolId:-1
        }
    },
    methods:{
        // 获取所有的角色列表，总体的
        async getList(){
            const res=await this.$axios.get("roles");
            console.log(res);
            const {meta:{msg,status}}=res.data;
            if(status==200){
                this.$message.success(msg);
                this.tableData=res.data.data;
                
            }else{
                this.$message.success(msg);
            }
        },
    //   删除角色，也就是关闭对话框删除角色
        async tagClose(rol,powerid){
             const res=await this.$axios.delete(`roles/${rol.id}/rights/${powerid}`);
                // console.log(res);
             rol.children=res.data.data;
        },
        // 查询获取所有的总的树形权限列表:
        async getAllPower(){
            const res=await this.$axios.get(`rights/tree`);
            const {data,meta:{msg,status}}=res.data;
            this.treeList=data;
        },
        // 点击按钮出现框框
       async showTree(rol){
            this.treeVisible=true;
            this.getAllPower();
            var arr = [];
            this.rolId=rol.id;
            rol.children.forEach(element1 => {
                element1.children.forEach(element2=>{
                      element2.children.forEach(element3=>{
                          arr.push(element3.id);
                      })      
                })
            });
            this.defaultKeysArr=arr;
        },
        // 点击确定按钮重置权限
       async resetPower(){

           console.log(this.rolId);
          
           const arr1=this.$refs.tree.getCheckedKeys();
           const arr2=this.$refs.tree.getHalfCheckedKeys();
            this.defaultKeysArr=[...arr1,...arr2];
           const res=await this.$axios.post(`roles/${this.rolId}/rights`,{
               rids:this.defaultKeysArr.join(",")
           });
            const {meta:{msg,status}}=res.data;
            if(status==200){
                this.getList();
                this.treeVisible=false;
                this.$message.success(msg);
            }else{
                this.$message.success(msg);
            }
       }
    },
    
    created(){
          this.getList();  
    }
}
</script>

<style>
    .top{
        margin-bottom: 10px;
    }
    .tag{
        margin-right: 8px;
        margin-bottom: 8px;
    }
</style>
