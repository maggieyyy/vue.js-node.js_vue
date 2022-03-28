<template>
    <div>
        <div class="list-manager">
            <Row type="flex" justify="space-around" class="code-row-bg">
                <Col span="15">
                    <List>
                        <ListItem v-for="item in list" :key="item.id" class="item">
                            <ListItemMeta :title="item.username" :description="'ip地址:'+item.ip"/>
                            <template slot="action">
                                <li>
                                    <Button v-on:click="online(item.username)">{{item.login==0?'封停':'解封'}}</Button>
                                </li>
                            </template>
                        </ListItem>
                    </List>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminUsers',
    components:{},
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getUsers()
    },
    methods:{
        online(username){
            this.$api.post('admin/stopLogin/'+username).then((res)=>{
                this.$Notice.info({
                    title: '提示',
                    desc: res.message
                })
                this.getUsers()
            })
        },
        getUsers(){
            this.$api.get('admin/getAllUser').then((res)=>{
                this.list= res.data
            })
        }        
    }
}
</script>

<style lang="less" scoped>

</style>