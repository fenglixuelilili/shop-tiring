<template>
    <div class="formbox">
        
       <el-form label-position="left" label-width="80px" class="formD">
           <h2>用户登陆</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.password" type="password" @keydown.enter.native="login"></el-input>
            </el-form-item>
            <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        async login(){
            
            let res=await this.$axios.post('login',this.formData);
            console.log(res);
            const {meta:{status,msg}}=res.data;         
            if(status===200){
                this.$message.success("登陆成功");
                let token=res.data.data.token;
                sessionStorage.setItem('token',token);
                this.$router.push('/home');
            }else{
                this.$message.error(msg);
            }
        }
    }
};
</script>

<style>
    .formbox{
        position: absolute;
       width: 100%;
       height: 100%;
       background-color: black;     
    }
    .formD{
        width: 40%;
        background-color: #fff;
        height: 250px;
        position: absolute;
        left: 0;
        top:0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 30px;
        border-radius: 10px;
    }
    .login-btn{
        width: 100%;
    }
</style>
