<template>
    <div class="box">
    <section class="el-container is-vertical el-box">
          <header class="el-header" style="height: 60px;">
            <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <img src="" alt="">
                        </div>
                    </el-col>
                    <el-col :span="19" class="el-center-h2">
                        <div class="grid-content bg-purple-dark">
                            <h2>后台管理系统</h2>
                        </div>
                    </el-col>
                     <el-col :span="1">
                        <div class="grid-content bg-purple-dark logout">
                            <a href="#" @click.prevent="logout">退出</a>
                        </div>
                    </el-col>
            </el-row>
          </header>
        <section class="el-container el-container-box">
            <aside class="el-aside" style="width: 200px;">
                <el-menu :router="true" :unique-opened="true">
                    <el-submenu :index="i" v-for="(item,i) in dataList" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item-group>

                            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
                                <i class="el-icon-menu"></i>
                                {{item2.authName}}
                            </el-menu-item>

                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </aside>
            <main class="el-main">
                <router-view></router-view>
            </main>
        </section>
    </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dataList:[]
        };
    },
    methods:{
        logout(){
            sessionStorage.clear();
            this.$router.push("/login");
            this.$message.error("退出了您类");
        },
        // 获取用户的菜单权限
        async menu(){
            const res = await this.$axios.get('menus');
            console.log(res)
            const {data,meta:{msg,status}}=res.data;
            if(status==200){
               this.dataList=data;   
            }else{
                this.$message.error(msg);
            }
        }
    },
    created(){
        this. menu();
    }
};
</script>

<style scope>
    .box .el-box{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .el-header{
        background-color: brown;

    }
    .el-aside{
        background-color:bisque;
    }
    .el-main{
        background-color: beige;
    }
    .el-center-h2{
        text-align: center;
    }
    .el-center-h2 h2{
        padding: 0;
        margin: 0;
        color: #fff;
        line-height: 60px;
    }
    .logout{
        line-height: 60px;
    }
    .logout a{
        color: antiquewhite;
        text-decoration: none;
    }
    .el-container-box{
        position: relative;
        height: 100%;
    }
    .el-menu{
        height: 100%;
    }
</style>
