<template>
  <div class="root">
    <div class="head">
      <div class="head-font">个人信息综合管理平台</div>
      <div class="choose">
        <div class="text" @click="enterChooseCourse">🏚选择课程</div>
      </div>
    </div>
    <div class="main">
      <div class="aside">
        <div style="height: 50%;border-bottom:2px solid #eee;width: 100%;background: #dddddd;border-left: #f2f2f2 2px solid;color: #000;display: flex;align-items: center;justify-content: center;font-size: 17px;" @click="enterImport"> 导入学生名单</div>
        <div style="height: 50%;border-bottom:2px solid #eee;width: 100%;background: #f2f2f2;color: #000;display: flex;align-items: center;justify-content: center;font-size: 17px;">讨论课</div>
      </div>
      <div class="mmain">
        <div style="width: 90%;margin-left: 5%;height: 10%;display: flex;align-items: center;color:#009688;font-size: 20px;margin-top: 2%;border: 1px solid #dddddd;padding-left: 2%">{{this.$route.params.courseName}}-讨论课</div>
        <el-table style="width: 90%;margin-left: 5%;margin-top: 2%" :show-header="false" height="80%" :data="rounds">
          <el-table-column>
            <template slot-scope="scope">
              <div style="color: #009688;font-size: 17px;font-weight: bolder">{{scope.row.roundSerial}}</div>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.seminarInfoVOS">
                <el-table-column>
                  <template slot-scope="scope">
                    <div style="font-size: 15px;">{{scope.row.seminarName}}</div>
                  </template>
                </el-table-column>
                <el-table-column width="150px" align="center">
                  <template slot-scope="scope">
                    <button style="width: 100px;height: 35px;background: #009688;border: none;border-radius: 3px;color: white" @click="enterDownloadReport(scope.row.seminarName,scope.row.seminarId)">进入</button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "seminar",
      data(){
        return{
          id:localStorage.getItem("token"),
          courseName: this.$route.params.courseName,
          courseId: this.$route.params.courseId,
          rounds:[{
            roundId:'',
            roundSerial:'',
            seminarInfoVOS:[{
              seminarId:'',
              seminarName:'',
            }]
          }]
        }
      },
      methods:{
        enterChooseCourse:function(){
          this.$router.push({
            name:'teacherPCChooseCourse'
          })
        },
        enterDownloadReport:function(name,id){
          this.$router.push({
            name: 'teacherPCDownloadReport',
            params:{
              courseName:this.$data.courseName,
              courseId:this.$data.courseId,
              seminarName:name,
              seminarId:id
            }
          })
        },
        enterImport:function(){
          this.$router.push({
            name: 'teacherPCImportStudent',
            params:{
              courseName:this.$data.courseName,
              courseId:this.$data.courseId
            }
          })
        },
        getAllSeminar:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/'+this.$data.courseId+'/seminars',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.rounds.splice(0,_this.$data.rounds.length);
            _this.$data.rounds=response.data.rounds;
            for(let i=0;i<response.data.rounds.length;i++) {
              _this.$data.rounds[i].roundId=response.data.rounds[i].roundId;
              _this.$data.rounds[i].roundSerial='第'+response.data.rounds[i].roundSerial+'轮讨论课';
              for(var j=0;j<response.data.rounds[i].seminarInfoVOS.length;j++){
                _this.$data.rounds[i].seminarInfoVOS[j].seminarId=response.data.rounds[i].seminarInfoVOS[j].seminarId;
                _this.$data.rounds[i].seminarInfoVOS[j].seminarName=response.data.rounds[i].seminarInfoVOS[j].seminarName;
              }
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      created() {
          this.getAllSeminar();
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
    height:91%;
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
  .aside{
    width:20%;
    height: 100%;
    background: #aaaaaa;
    float: left;
  }
  .mmain{
    width:80%;
    height: 100%;
    background: #f2f2f2;
    float: left;
  }
</style>
