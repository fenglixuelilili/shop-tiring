<template>
    <div>
         <div id="main" style="width: 800px;height:600px;"></div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    data(){
        return {
            myChart:null
        }
    },
    mounted(){
        this.myChart = echarts.init(document.getElementById('main'));
        this.myChart.showLoading();
        // 显示标题，图例和空的坐标轴
        this.myChart.setOption({
            title: {
                text: '异步数据加载示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: []
            }]
        });


    },
    created(){
        setTimeout(()=>{
            var option = {
            title: {
                text: '数据统计'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        this.myChart.hideLoading();
        this.myChart.setOption(option);
        },3000);
    }
}
</script>

<style>

</style>
