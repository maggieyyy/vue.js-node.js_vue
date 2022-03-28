<template>
    <div class="article_writer">
        <div class="item">
            <h3>文章名称</h3>
            <Input v-model="title" style="width:300px" placeholder="输入文章名称"/>
        </div>
        <div class="item">
            <h3>文章作者</h3>
            <Input v-model="writer" style="width:300px" placeholder="输入文章作者"/>
        </div>
        <div class="item">
            <h3>文章分类</h3>
            <Select v-model="type" style="width:200px">
                <Option v-for="item in articleType" :value="item.uid" :key="item.uid">{{item.name}}</Option>
            </Select>
        </div>
        <div class="item">
            <h3>文章小标签</h3>
            <Input v-model="tag" style="width:300px" placeholder="使用空格进行分割"/>
        </div>
        <div>
            <h3 style="text-align: left">文章详情</h3>
            <Editor id="tinymce" v-model="text" :init="init"></editor>
            <br><br>
            <Button v-on:click="submission">提交</Button>
        </div>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
export default {
    name:'WriterArticle',
    components:{
        Editor
    },
    data(){
        return{
            text:'',
            title: '',
            type: '',
            tag: '',
            writer: '',
            articleType: [],
            init:{
                selector: 'textarea',
                plugin: 'a_tinymce_plugin',
                a_plugin_option: true,
                skin_url: "tinymce/skins/ui/oxide",
                height: 300,
                branding: false
            }
        }
    },
    mounted(){
        tinymce.init({})
    },
    created(){
        this.$api.get('users/user/getArticleType').then((res)=>{
            this.articleType = res.data
        })
    },
    methods:{
        info(text){
            this.$Notice.info({
                title:'提示',
                desc:text
            })
        },
        submission(){
            let data={
                title: this.title,
                writer:this.writer,
                text:this.text,
                type:parseInt(this.type),
                tag:this.tag.split(" ")
            }
            this.$api.post('admin/setArticle',{article:data}).then((res)=>{
                this.info(res.message)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.article_writer{
    padding:40px 5vw;
    text-align: left;
}
.article_writer .item{
    padding-bottom: 20px;
}
.article_writer h2{
    padding: 20px;
}
</style>