<template>
    <div class="plane">
        <h2 class="plane-s">登录</h2>
        <br><br>
        <Row class="plane-s">
            <Input v-model="username" prefix="ios-contact" placeholder="输入用户名" style="width:auto"/>
        </Row>
        <br>
        <Row class="plane-s">
            <Input v-model="password" prefix="ios-clock-outline" type="password" placeholder="输入密码" style="width:auto"/>
        </Row>
        <br>
        <div class="plane-s">
        <Button v-on:click="login" type="primary" class="plane-b">用户登录</Button>
        <Button v-on:click="register" class="plane-b">用户注册</Button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Login',
    components:{},
    data(){
        return{
            username:'',
            password:''
        }
    },
    created:function(){
    },
    methods:{
        login(){
            let data={
                password: this.password,
                username: this.username
            }
            this.$api.post('users/login',data).then((res)=>{
                console.log(res.data)
                this.$Notice.info({
                    title: '提示',
                    desc: res.message
                })
                if(res.code === 0){
                    sessionStorage.setItem('token',res.data.token)
                    sessionStorage.setItem('username',this.username)
                    this.$router.push({path:'/'})
                }else{
                    sessionStorage.removeItem('token')
                }
            })
        },
        register(){
            this.$router.push({path:'register'})
        }
    }
}
</script>

<style lang="less" scoped>
.plane{
    margin:0 auto;
    text-align:center
}
.plane-s{
    display: block;
}
.plane-b{
    margin:10px 10px;
}
</style>