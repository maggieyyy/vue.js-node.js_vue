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
import ArticleList from '../components/ArticleList'
export default {
    name:'Collection',
    components:{ArticleList},
    data(){
        return{
            list: [],
            listTitle: '收藏文章'
        }
    },
    created(){
        this.$api.get('users/user/saveList').then((res)=>{
            let tData = []
            res.data.map((item)=>{
                if(item.a_id != 0){
                    tData.push({id:parseInt(item.a_id),title:item.title})
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