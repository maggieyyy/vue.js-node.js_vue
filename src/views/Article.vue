<template>
    <div class="article">
        <div class="type">
        <Breadcrumb>
            <BreadcrumbItem to="/"><Icon type="ios-home-outline"></Icon>主页</BreadcrumbItem>
            <BreadcrumbItem to="/articles"><Icon type="logo-buffer"></Icon>全部文章</BreadcrumbItem>
            <BreadcrumbItem :to="{path:'/articleType',query:{type:article.type}}">
                <Icon type="ios-cafe"></Icon>{{article.typename}}</BreadcrumbItem>
            <BreadcrumbItem :to="'/article/'+article.id">
                <Icon type="ios-body"></Icon>{{article.title}}</BreadcrumbItem>
        </Breadcrumb>
        </div>
        <div>
            <Tag v-for="item in article.tag" :key="item">
                <router-link :to="{path:'/articleType',query:{tag:item}}">{{item}}</router-link>
            </Tag>
        </div>
        <div>
            <h2>{{article.title}}</h2>
            <p class="article-p">{{Date(article.time)}}</p>
            <p class="article-p">作者：{{article.writer}} 浏览量：{{article.view}} 收藏：{{article.like}}</p>
            <div v-html="article.text" class="article-text"></div>
        </div>
        <!--收藏和点赞-->
        <div>
            <Button v-on:click="aLike(article.a_id,1)" type="info" ghost>
                <Icon type="ios-arrow-up"/>赞
            </Button>
            <Button v-on:click="aLike(article.a_id,0)" type="info" ghost>
                <Icon type="ios-arrow-down"/>踩
            </Button>
        </div>
        <span>
            <Button v-on:click="collection(article.a_id)" type="text">
                <Icon type="ios-heart"/>收藏
            </Button>
        </span>
        <!--评论-->
        <div class="type">
            <Divider />
            <List item-layout="vertical">
                <ListItem v-for="talk in articleTalk" :key="talk.talk">
                    <ListItemMeta :title="talk.username" :description="Date(talk.date)"/>{{talk.talk}}
                </ListItem>
            </List>
        </div>
        <talk :a_id="article.a_id"></talk>
    </div>
</template>

<script>
import Talk from '../components/Talk.vue'

export default {
    name: 'Article',
    components: {Talk},
    data(){
        return{
            article: {},
            articleTalk: []
        }
    },
    created(){
        if('id' in this.$route.params){
            let id = this.$route.params.id
            console.log(id)
            //获取文章
            this.$api.get('getArticle/'+id).then((res)=>{
                if(res.code === 0){
                    this.article = res.data
                    console.log(this.article)
                    this.$api.get('getArticleTalk/'+id).then((res)=>{
                        this.articleTalk = res.data
                        console.log(this.articleTalk)
                    })
                }else{
                    this.info(res.message)
                }
            })
            //判断用户是否看过该篇文章，如果是第一次看，则调用浏览量+1的api
            let view = localStorage.getItem('article_'+id)
            console.log(view)
            if(view){
                //如果有数据则将数据+1
                localStorage.setItem('article_'+id,parseInt(view)+1)
            }else{
                //增加次数
                this.$api.get('viewArticle/'+id).then((res)=>{
                    console.log(res)
                })
                localStorage.setItem('article_'+id,1)
            }
        }
    },
    methods:{
        info(text){
            this.$Notice.info({
                title:'提示',
                desc:text
            })
        },
        getArticleTalk(id){
            this.$api.get('getArticleTalk/'+id).then((res)=>{
                this.articleTalk = res.data
                console.log(this.articleTalk)
            })
        },
        //收藏
        collection(id){
            this.$api.get('users/user/save/'+id).then((res)=>[
                this.info(res.message)
            ])
        },
        aLike(id,like){
            if(localStorage.getItem('article_'+id+'_like')){
                this.info('您已经进行过了选择')
            }else{
                this.$api.get('users/user/like/'+id+'/'+like).then((res)=>{
                    this.info(res.message)
                    localStorage.setItem('article_'+id+'like',1)
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.article{
    padding:40px 10vw 40px 10vw;
}
.type{
    text-align: left;
}
.article-p{
    color:#ababab;
}
.article h2{
    padding:20px;
}
.article-text{
    padding:20px 10vw 20px 10vw;
}
</style>