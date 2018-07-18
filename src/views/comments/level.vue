<template>
    <div>
         <el-cascader
            expand-trigger="hover"
            :options="option"
            change-on-select
            :props="{
                label:'cat_name',
                children:'children',
                value:'cat_id'   
            }"
            v-model="selectedOptions2"
            @change="cng">
        </el-cascader>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedOptions2:[],
            option:[],
            selectedOptions2:[]
        }
    },
    methods:{
        //   展示全部分类
      async showAddCate(){
        this.selectedOptions2=[];
        this.productDialogFormVisible=true;
        const  result = await this.$axios.get('categories?type='+this.num);
        // console.log(result);
        this.option=result.data.data;
      },
      cng(){
        this.$emit("dataChange",this.selectedOptions2);
      }
    },
    props:['num'],
    created(){
       this.showAddCate(); 
    }
}
</script>

<style>

</style>
