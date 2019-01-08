<template>
  <div class="root">
    <div class="head">
      <div class="head-font">个人信息综合管理平台</div>
      <div class="choose">
        <div class="text" @click="enterChooseCourse">🏚选择课程</div>
      </div>
    </div>
    <div class="main">
      <div style="width: 98%;height: 98%;margin-left: 1%;margin-top: 1%;background: white">
        <div style="margin-left:15%;width: 70%;color:#009688;height: 15%;display: flex;align-items: center;font-size: 25px;">选择课程</div>
        <el-table style="width: 65%;margin-left: 15%" :data="courseList" :show-header="false" height="85%">
          <el-table-column>
            <template slot-scope="scope">
              <div style="color:#009688;font-size:20px">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="120px">
            <template slot-scope="scope">
              <button style="background: #009688;border: none;color: #fff;border-radius: 5px;height: 25px;width: 80px" @click="enterCourse(scope.row.id,scope.row.name)">进入</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "chooseCourse",
      data(){
          return{
            id:localStorage.getItem("token"),
            courseList:[{
              name:'',
              id:''
            }]
          }
      },
      methods:{
        enterChooseCourse:function(){
          this.$router.push({
            name:'teacherPCChooseCourse'
          })
        },
        getAllCourse:function() {
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.courseList=response.data;
            for(let i=0;i<response.data.length;i++){
              _this.$data.courseList[i].id=response.data[i].id;
              _this.$data.courseList[i].name=response.data[i].name;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        enterCourse:function(id,name){
          this.$router.push({
            name:'teacherPCImportStudent',
            params:{
              courseName:name,
              courseId:id
            }
          })
        }
      },
      created() {
          this.getAllCourse();
      }
    }
</script>

<style scoped>
  .root{
    height: 100%;
    width:100%;
    background: #eee;
    border-right:2px solid transparent;
  }
  .head {
    background-color:#F8F8F8;
    height:9%;
    width:100%;
    border:1px solid transparent;
  }
  .head-font{
    font-family:思源黑体;
    height:100%;
    width: 50%;
    font-size: 19px;
    color:#009688;
    letter-spacing:1px;
    display: flex;
    align-items: center;
    float: left;
    padding-left: 2%;
  }
  .main{
    height:89%;
    width:100%;
  }
  .choose{
    height:100%;
    width: 50%;
    display: flex;
    align-items: center;
    float: left;
  }
  .text{
    font-size: 15px;
    color:#009688;
    letter-spacing:1px;
    margin-left: 70%;
  }
</style>
