<template>
    <div>
        <el-breadcrumb separator="/" class='bard'>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-input placeholder="请输入内容"  class="input-with-select"  v-model="keywords">
                
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
       <el-button type="success" plain @click="dialogFormVisible=true">添加</el-button>
        </el-card>
          <!-- 添加管理员的弹出框    :visible.sync="dialogFormVisible"属性是控制弹出层的显示与隐藏-->
            <el-dialog title="添加新管理员" :visible.sync="dialogFormVisible" @close="closeAlert">
                <el-form 
                    :rules="rules"
                    :model="formData"
                    label-width="80px"
                    label-position="left">
                    <el-form-item label="用户名"  prop="username">
                        <el-input v-model="formData.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formData.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="formData.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="formData.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>

         <el-table
            :data="tableData"
            type="index"
            style="width: 100%"
            v-loading="loading">
                 <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="100">
                </el-table-column>

                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话"
                     width="180">
                </el-table-column>

                   <el-table-column
                    label="日期"
                    width="100">
                    <template slot-scope="scope">
                        {{scope.row.create_time|dataTotime}}
                    </template>
                </el-table-column>

                <el-table-column
                    label="用户状态"
                     width="80">
                     <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="status(scope.row.id,scope.row.mg_state)">
                        </el-switch>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="editShow(scope.row)"></el-button>
                            <el-button type="danger" plain  size="mini" icon="el-icon-share" @click="rolShow(scope.row)"></el-button>
                            <el-button type="warning" plain size="mini" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
                        </el-row>
                    </template>
                </el-table-column>
    </el-table>
    <!-- 修改编辑的弹出框 -->
    <el-dialog title="修改管理员信息" :visible.sync="editFormVisible" @close="closeAlert">
        <el-form 
            :model="formData"
            label-width="80px"
            label-position="left">
            <el-form-item label="用户名">
                <el-input v-model="formData.username" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formData.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editInfo">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 角色弹出的框 -->
    <el-dialog title="分配角色信息" :visible.sync="rolFormVisible" @close="closeAlert">
        <el-form 
            :model="formData"
            label-width="80px"
            label-position="left">
            <el-form-item label="用户名">
                <el-input v-model="formData.username" auto-complete="off" disabled></el-input>
            </el-form-item>
                    <!-- 选择框 需要绑定数据的-->
            <el-form-item label="用户名">

                <el-select v-model="rolValue">
                 <el-option
                label="请选择"
                :value="-1"
                disabled>
                </el-option>
                   <!-- 下面是要循环的 -->
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
                </el-option>

            </el-select>
            </el-form-item>
            

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="rolFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="rolInfo">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分页html页面 -->   
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 3, 4, 5,6]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
               tableData:[],
               keywords:'',
               loading:true,
                pagesize:2,
                total:0,
                currentPage:1,
                formData:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:''    
                },
                userid:-1,
                rolValue:-1,
                options:[],
                // 角色id
                // rid:-1,
                // 弹出层相关的设置隐藏与显示的
                dialogFormVisible:false,
                editFormVisible:false,
                rolFormVisible:false,
                rules: {
                    username: [
                        { required: true, message: '请输入户名', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ],
                     password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ]
                }
        }
    },
    methods:{
        async getAllList(){
            this.loading=true;
            // var token=sessionStorage.getItem('token');
            // this.$axios.defaults.headers.common['Authorization'] = token;

            const res=await this.$axios.get(`users?pagenum=${this.currentPage}&pagesize=${this.pagesize}&query=${this.keywords}`);
            const {data:{users},meta:{status,msg}}=res.data;
            console.log(users);
            if(status==200){
                 this.tableData=users;
                  this.loading=false;
                  this.total=res.data.data.total;
            }else{
                this.$message.error(msg);
            }
        },
        // 删除用户
        async del(id){

            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 删除的逻辑
                // alert("您点了确定");
                 const res=await this.$axios.delete(`users/${id}`);
                // console.log(res);
                // console.log(1111111111);
                const {meta:{msg,status}}=res.data;
                if(status==200){
                    this.$message.success("删除成功");
                    this.currentPage=1;
                    this.getAllList();
                }else{
                    this.$message.error(msg);
                }
            })
        
        },
        // 添加用户
        async add(){
            // const res=await this.$axios.post('users',{});

            var result=await this.$axios.post("users",this.formData);
            const {meta:{status,msg}}=result.data;
            if(status==201){
                this.dialogFormVisible=false;
                this.$message.success("添加成功");
                this.getAllList();
                for(let key in this.formData){
                    this.formData[key]="";
                }
            }else{
                 this.$message.error(msg);
            }
        },
        // 分页相关
        handleSizeChange(val) {
            // 当煤业多少条发僧改变的时候发生的事件
            // console.log(`每页 ${val} 条`);
            this.pagesize=val;
            this.getAllList();
        },
        handleCurrentChange(val) {
            // 当前页发生改变的时候发生的事件
            this.currentPage=val;
            console.log(`当前页: ${val}`);
            this.getAllList();
        },
        // 更改用户状态
        async status(id,sta){
            const result = await this.$axios.put(`users/${id}/state/${sta}`);
            // console.log(result);
            const {meta:{msg,status}}=result.data;
            if(status===200){
                 this.$message.success(msg);
            }
        },
        // 搜索功能
        search(){
            this.getAllList();
        },
        // 点击显示编辑基础信息
        editShow(info){ 
            this.editFormVisible=true;
            this.formData.username=info.username;
            this.formData.email=info.email;
            this.formData.mobile=info.mobile;
            this.userid=info.id;
        },
        // 修改管理员信息逻辑：
        async editInfo(){ 
            const result =  await this.$axios.put('users/'+this.userid,this.formData);
            const {meta:{msg,status}}=result.data;
            if(status==200){
                this.$message.success(msg);
                this.getAllList();
                this.editFormVisible=false;
            }else{
                 this.$message.success(msg);
            }
        },
        // 关闭对话框的时候将内容清空
        closeAlert(){
            for(let key in this.formData){
                this.formData[key]="";
            }
        },
        // 显示素有的角色
        async rolShow(rols){
            // console.log(rols);
            this.userid=rols.id;
            this.rolFormVisible=true;
             this.formData.username=rols.username;
            //  查询所有的用户角色
            const result = await this.$axios.get("roles");
            // console.log(result);
            this.options=result.data.data;
            // 查询当前点击用户的角色id
            const admin = await this.$axios.get("users/"+rols.id);
            // console.log(admin.data.data.rid);
            // console.log(admin);
            this.rolValue=admin.data.data.rid;
        },
        // 更改角色
        async rolInfo(){
            const r = await this.$axios.put(`users/${this.userid}/role`,{
                rid:this.rolValue
            });    
            const {meta:{msg,status}}=r.data;
            if(status==200){
                this.$message.success(msg);
                this.rolFormVisible=false;
                this.rolValue=-1;
            }else{
                this.$message.success(msg);
            }
        }
    },
    created(){
        
        this.getAllList();
    },
    beforeCreate(){

    }
}
</script>

<style>

    .bard{
        background-color: rgba(180, 23, 3, 0.8);
        line-height: 40px;
        padding-left: 20px;
        border-radius: 10px;
    }
    .box-card{
        margin-top: 10px;
    }
    .input-with-select{
        width: 30%;
    }
</style>
