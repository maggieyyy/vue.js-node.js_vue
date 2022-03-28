<template>
    <div>
        <!--轮播图-->
        <Carousel autoplay v-model="value2" loop :autoplay-speed="playspeed">
            <div v-for="item in pic" :key ="item.name">
            <CarouselItem v-if="item.url!==''">
                <div class="demo-carousel">
                    <!--router-link :to = "item.name"-->
                        <img referrer="no-referrer|origin|unsafe-url" :src = "item.url"/>
                        <div>{{item.name}}</div>
                    <!--/router-link-->
                </div>
            </CarouselItem>
            </div>
        </Carousel>
        <!--文章列表-->
        <div class="article-list">
            <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="11">
                    <article-list :list="list" :title="listTtile"></article-list>
                </Col>
                <Col span="11">
                    <article-list :list="hotList" :title="hotListTitle"></article-list>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
    name:'Index',
    components:{
        ArticleList
    },
    data(){
        return{
            value2:0,
            pic:[],
            list:[],
            listTtile:'最新文章',
            hotList:[],
            hotListTitle:'最热文章',
            playspeed:3000
        }
    },
    created(){
        //获取主页轮播图
        this.$api.get('getIndexPic').then((res)=>{
            this.pic = res.data
            console.log(this.pic)
        })
        
        //获取所有文章
        this.$api.get('getNewArticle').then((res)=>{
            let rData = res.data.slice(0,5)
            let tData = []
            rData.map((item)=>{
                if(item&&item.id !==0){
                    tData.push(item)
                }
            })
            this.list = tData
        })
        //获取热点文章
        this.$api.get('getHotArticle').then((res)=>{
            let rData = res.data.slice(0,5)
            let tData = []
            rData.map((item)=>{
                if(item.id !==0){
                    tData.push(item)
                }
            })
            this.hotList = tData
        })
    }
}
</script>

<style lang="less" scoped>
.demo-carousel {
    width : 98vw;
    height : 30vw;
    background: RGBA(0,0,0,0.3);
}
.demo-carousel img {
    height : 100%;
    position: relative
}
.demo-carousel div {
    padding:30px;
    background: RGBA(0,0,0,0.5);
    position:absolute;
    z-index:1;
    color:white;
    font-size: 60px;
    width:70vw;
    top: 10vw;
    text-align: center;
    margin-left: 15vw;
}
.article-list{
    padding: 20px 0 20px 0
}
</style>