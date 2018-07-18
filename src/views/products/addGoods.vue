<template>
    <div>
         <div class="top">
             <nav-card eval1="商品管理" eval2="商品添加"></nav-card>   
        </div>
        <el-card>
            <!-- 此乃步骤条 -->
            <el-steps 
                :space="350" 
                :active="nextNumber" 
                finish-status="success" 
                align-center
                class="step">
                <el-step title="基本信息"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
            </el-steps>

        <el-tabs tab-position="left"  class="tab-h" :value="nextstrimg" @tab-click="tabclick">
            <el-tab-pane label="基本信息">
                <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="商品名称">
                        <el-input v-model="formLabelAlign.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="formLabelAlign.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="formLabelAlign.goods_number"></el-input>
                    </el-form-item>
                      <el-form-item label="商品重量">
                        <el-input v-model="formLabelAlign.goods_weight"></el-input>
                    </el-form-item>
                </el-form>   
                <level num="3" @dataChange="chang"></level>   
                <el-button @click="next(1,'1')">下一步</el-button>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
                <el-upload
                class="upload-demo"
                action="http://localhost:8888/api/private/v1/upload"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture"
                :headers="headertoken"
                :on-success="successupload">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-button @click="next(2,'2')">下一步</el-button>
            </el-tab-pane>
            <el-tab-pane label="商品内容">

             
                   <el-row>
                    <el-col :span="5">
                        <el-button @click="create">创建</el-button>
                    </el-col>     
                </el-row>         
            </el-tab-pane>
        </el-tabs>
        </el-card>
      
    </div>
</template>

<script>
import level from "@/views/comments/level.vue";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    data(){
        return {
            formLabelAlign:{
                goods_name:'',
                goods_price:'',
                goods_number:'',
                goods_weight:'',
                goods_introduce:'',
                goods_cat:'',
                pics:[
                    // {"pic":"/tmp_uploads/30f08d52c551ecb447277eae232304b8"}
                ]
            },
            nextNumber:0,
            nextstrimg:'0',
            fileList2: [
                    // {
                    //     name: 'food.jpeg', 
                    //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    // }
                ],
            headertoken:{
                Authorization: sessionStorage.getItem('token')
            }
        }
    },
    methods:{
        async create(){
            console.log(this.formLabelAlign);
            console.log(1111);
            const res = await this.$axios.post('goods',this.formLabelAlign);
            console.log(res);
             const {meta:{msg,status}}=res.data;
             if(status==201){
                 this.$message.success(msg);
                 for(let key in this.formLabelAlign){
                     this.formLabelAlign[key]='';
                 }
             }else{
                 this.$message.error(msg);
             }
        },
        next(num,str){
            this.nextNumber=num;   
            this.nextstrimg=str;
        },
        tabclick(name){
            var num=parseInt(name.index);
            var str=name.index+'';
            this.next(num,str);
        },
        chang(data){
            console.log(data.join(","));
            this.formLabelAlign.goods_cat=data.join(",");
        },
        handleRemove(file, fileList) {
            //移除图片的时候触发的事件
             this.formLabelAlign.pics.filter(item=>{
                 if(item.pic!= file.response.data.tmp_path){
                     return item;
                 }
             });
        },
        successupload(response, file, fileList){
            this.formLabelAlign.pics.push({
                pic:response.data.tmp_path
            });
        }
    },
    components: {
        quillEditor,
        level
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
    .step{
         margin-bottom: 30px;
    }
    .el-tabs__content{
        overflow: auto;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow{
        height: 300px;
    }

</style>
