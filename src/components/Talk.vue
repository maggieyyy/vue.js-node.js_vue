<template>
    <div>
        <h3 style="text-align:left">评论</h3>
        <Input v-model="data" type="textarea" :rows="4" placeholder="请输入..."></Input>
        <br><br>
        <Button v-on:click="submitTalk" type="primary">提交评论</Button>
    </div>
</template>

<script>
export default {
    name:"Talk",
    data(){
        return{
            data:''
        }
    },
    methods:{
        submitTalk(){
            let data={
                a_id : this.a_id,
                talk : this.data
            }
            this.$api.post('users/user/article/talk',data).then((res)=>{
                if(res.code === 0){
                    this.$parent.getArticleTalk(this.a_id)
                }else{
                    this.$Notice.open({
                        title:'错误',
                        desc:res.message,
                        duration:5
                    })
                }
            })
        }
    },
    props:{
        a_id:Number
    }
}
</script>

<style lang="less" scoped>

</style>