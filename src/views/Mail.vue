<template>
    <div class="article">
        <div>
            <h3>与{{mail.toUser}}的对话</h3>
            <List style="text-align:left" item-layout="vertical">
                <ListItem v-for="item in mail.mail" :key="item.time">
                    <ListItemMeta :title="Date(item.time)" :description="item.text" />
                </ListItem>
            </List>
        </div>
        <div>
            <h3 style="text-align:left">评论</h3>
            <Input v-model="mailText" type="textarea" :rows="4" placeholder="请输入..."></Input>
            <br><br>
            <Button v-on:click="submitMail">提交</Button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Mail',
    components:{},
    data(){
        return{
            mail:{mail:[],toUser:''},
            mailText:'',
            id:''
        }
    },
    created(){
        if('id' in this.$route.params){
            let id = this.$route.params.id
            console.log(this.$route.params.id)
            this.getMail(id)
        }
    },
    methods:{
        info(text){
            this.$Notice.info({
                title:'提示',
                desc:text
            })
        },
        submitMail(){
            let sendData = {
                text:this.mailText
            }
            this.$api.post('users/user/mail/'+this.mail.toUser,sendData).then((res)=>{
                if(res.code===0){
                    this.getMail(this.id)
                }else{
                    this.info(res.message)
                }
            })
        },
        getMail(id){
            this.$api.get('users/user/mailGet/'+id).then((res)=>{
                if(res.code === 0){
                    this.mail = res.data
                    this.id = id
                }else{
                    this.info(res.message)
                }
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