<template>
    <div>
         <div class="top">
             <nav-card eval1="商品管理" eval2="商品列表"></nav-card>   
        </div>
        <!-- <el-button tyep="success" plain class="btn" @click="$router.push({name:'addGoods'})"> 添加商品</el-button> -->
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
                    property="order_number"
                    label="订单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    property="order_price"
                    label="订单价格"
                    width="120">
                </el-table-column>
                   <el-table-column
                    label="是否付款"
                    width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.order_pay==0">未付款</span>
                        <span v-if="scope.row.order_pay==1">已经付款</span>
                    </template>
                </el-table-column>

                <el-table-column
                    property="is_send"
                    label="是否发货"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="下单时间"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row.create_time | dataTotime}}
                </template>
                </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-row>
                         <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="editAdress"></el-button>
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
         <div id="app">
            
    <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
       
         <el-form-item label="选择省市" label-width="120px">
               <el-cascader
                size="large"
                :options="options"
                v-model="regionData"
                @change="handleChange">
            </el-cascader> 
        </el-form-item>

          <el-form-item label="详细地址" label-width="120px">
                <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    </div>
    </div>
</template>

<script>
import { regionData } from 'element-china-area-data';

export default {
    data(){
        return {
            tableData:[],
            total:0,
            currentpage:1,
            pagesize:4,
            options: regionData,
            selectedOptions: [],
            form:{

            },
            dialogFormVisible:false
            
        }
    },
    methods:{
        async getpayList(){
            const res =  await this.$axios.get(`orders?pagenum=${this.currentpage}&pagesize=${this.pagesize}`);
            console.log(res);
            this.tableData=res.data.data.goods;
            this.total=res.data.data.total;
        },
         // 分页逻辑
        handleSizeChange(val) {
            this.pagesize=val;
            this.getpayList();
            // console.log(`每页 ${val} 条`);
         },
      handleCurrentChange(val) {
          this.currentpage=val;
          this.getpayList();
        // console.log(`当前页: ${val}`);
      },
      handleChange(value){
          console.log(value);
      },
      editAdress(){
          this.dialogFormVisible=true;
      }
    },
    created(){
        this.getpayList();
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
