<template>
    <div>
         <Menu mode="horizontal" :theme="theme1" active-name="1">
             <MenuItem name="1">
             <div class="main">
                 <Icon type="md-book"/>
                 <router-link to="/">
                    {{index}}
                 </router-link>
                 </div>
                </MenuItem>
            <MenuItem v-for="(menuItem,index) in menu" :name="menuItem.name" :key="index">
                <router-link :to="menuItem.src">
                {{menuItem.name}}
                </router-link>
            </MenuItem>
            <MenuItem name="3">
                <Dropdown v-if="userBtn">
                    <a href = "javascript:void(0)">
                        用户:{{username}}
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <div v-on:click="goUrl('/userInfo/'+username)">个人信息</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div v-on:click="goUrl('/mails')">我的私信</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div v-on:click="goUrl('/collection')">我的收藏</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div v-on:click="exit">退出</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <router-link v-if="!userBtn" :to="{path:'/login'}">登录</router-link>
            </MenuItem>
        </Menu>
    </div>
</template>
<script>
export default {
    name:"Nav",
    data(){
        return {
            menu:[],
            index:'Mysite',
            theme1:'light',
            userBtn: false,
            username:''
        }
    },
    created(){
        //获取导航菜单
        this.$api.get('getNavMenu').then((res)=>{
            //写数据
            this.menu = res.data
        })
        setInterval(() => {
            console.log("轮询")
            if(sessionStorage.getItem('token')){
                this.userBtn = true
                this.username = sessionStorage.getItem('username')
            }else{
                this.userBtn = false
            }
        }, 3000);
    },
    methods:{
        exit(){
            console.log(sessionStorage.getItem('token'))
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('username')
            this.goUrl('/')

        },
        goUrl(url){
            if(this.$route.path!=='/admin/'+url+'/admin'){
                this.$router.push({path:url})}
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    font-weight: 600;
}
a {
    color: #2f2f2f
}
</style>