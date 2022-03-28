<template>
    <div>
        <div class="demo-upload-list" v-for="item in defaultList" :key="item.src">
        <template v-if="item.status === 'finished'">
            <Row>
                <Col span="10">
                <img v-if="item.url === ''" :src="noPic" style="width:300px;">
                <div v-else>
                    <img :src="item.url" style="width:300px;" @click="handleView(item.url)">
                </div>
                </Col>
                <Col span="12">
                    <br>
                    <div><Input v-model="item.name" placeholder="请输入图片名称"/></div>
                    <br>
                    <div><Input v-model="item.url" placeholder="请输入图片地址"/></div>
                    <br>
                </Col>
                <Divider/>
            </Row>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>

    </div>
    
    <Modal title="View Image" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <div class="tip">
        <ul>
            <li>文件必须是 jpg 或 png 格式的图片。</li>
            <li>最多上传5张图片。</li>
            <li>每个文件大小不超过 2M。</li>
        </ul>
    </div>
    <Button type="primary" @click="uploadList">确认修改图片</Button>
    </div>
</template>

<script>
 export default {
        data () {
            return {
                defaultList: [
                    {
                        'name': 'pic1',
                        'url': 'https://hbimg.huabanimg.com/6f881041ee782bfe3f7e8cfd2713d9ec9305c0e128172-CRjPgp_fw240/format/webp',
                        'status':'finished'
                    },
                    {
                        'name': 'pic2',
                        'url': 'https://hbimg.huabanimg.com/374ecd8569411665ed6652277cd06d9752ca6baa11749-smWnwe_/fw/480/format/webp',
                        'status':'finished'
                    },
                    {
                        'name': 'pic3',
                        'url': '',
                        'status':'finished'
                    },
                    {
                        'name': 'pic4',
                        'url': '',
                        'status':'finished'
                    },
                    {
                        'name': 'pic5',
                        'url': '',
                        'status':'finished'
                    }
                ],
                noPic:'https://hbimg.huabanimg.com/e6ffe9bc2c615099956b00474a839b585b1203d85523-XzBUpt_fw658/format/webp',
                visible: false
            }
        },
        methods: {
            uploadList(){
                console.log(this.defaultList)
                let data = this.defaultList
                this.$api.post('admin/setIndexPic/admin',data).then((res)=>{
                    console.log(res)
                }).catch(error=>{
                    this.$Message.error({
                        content: error,
                        duration:3
                    })
                })
            },
            handleView (url) {
                this.imgUrl = url;
                this.visible = true;
            }},
        created(){
            if(sessionStorage.getItem('token')){
                this.token = sessionStorage.getItem('token')
            }
            if(sessionStorage.getItem('username')){
                this.username = sessionStorage.getItem('username')
            }
        },
        mounted () {
            
        }
    }
</script>

<style lang="less" scoped>

</style>