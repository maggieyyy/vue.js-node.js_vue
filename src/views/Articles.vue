<template>
        <div class="article-list">
            <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="24">
                    <article-list :list="list" :title="listTitle"></article-list>
                </Col>
            </Row>
        </div>
</template>

<script>
import ArticleList from '../components/ArticleList.vue'
export default {
    name:'Home',
    components:{
        ArticleList
    },
    data(){
        return{
            list:[],
            listTitle:'所有文章'
        }
    },
    created(){
        this.$api.get('getNewArticle').then((res)=>{
            let tData = []
            res.data.map((item)=>{
                if(item && item.id !==0){
                    tData.push(item)
                }
            })
            this.list = tData
        })
    }
}
</script>

<style lang="less" scoped>
.article-list{
    padding:2vw
}
</style>