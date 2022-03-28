<template>
    <div>
        <div class="article-list">
            <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="24">
                    <article-list :list="list" :title="listTitle"></article-list>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import ArticleList from '../components/ArticleList.vue'
export default {
    name:'ArticleType',
    components:{
        ArticleList
        },
    data(){
        return{
            list:[],
            listTitle:''
        }
    },
    created(){
        console.log(this.$route)
        if('type' in this.$route.query){
            let data = {type: this.$route.query.type}
            this.getData(data,'分类：'+this.$route.query.type)
        }
        if('tag' in this.$route.query){
            let data = {tag: this.$route.query.tag}
            this.getData(data,'标签：'+this.$route.query.tag)
        }
    },
    methods:{
        getData(data,title){
            //获取分类下的所有文章
            this.$api.post('getArticles',data).then((res)=>{
                let tData = []
                res.data.map((item)=>{
                    if(item.id !== 0){
                        tData.push(item)
                    }
                })
                this.listTitle = title
                this.list = tData
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>