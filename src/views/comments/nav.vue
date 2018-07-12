<template>
    <div>
          <el-breadcrumb separator="/" class='bard'>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{eval1}}</a></el-breadcrumb-item>
            <el-breadcrumb-item>{{this.eval2}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name:'nav-card',
    data(){
        return {

        }
    },
    props:["eval1","eval2"]
}
</script>

<style>

</style>
