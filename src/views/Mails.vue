<template>
    <div class="article">
        <div class="type">
           <Divider/>
           <List item-layout = "vertical">
               <ListItem v-for="mail in mails" :key="mail.m_id">
                   <router-link :to="/mailGetter/+mail.m_id">
                        <ListItemMeta title = "私信" :description="mail.users[1]+'与'+mail.users[0]" style="text-align:left"></ListItemMeta>
                   </router-link>
               </ListItem>
           </List>
        </div>
    </div>
</template>

<script>
export default {
    name:"Mails",
    components:{},
    data(){
        return{
            mails:[]
        }
    },
    created(){
        console.log('mails')
        this.$api.get('users/user/mailsGet').then((res)=>{
            if(res.code === 0){
                this.mails = res.data
            }else{
                this.info(res.message)
            }
        })
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
        }
    }
}
</script>

<style lang="less" scoped>
.article{
    padding:2vw 10vw
}
</style>