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
        <div style="height: 45%;width: 100%;background: white">
          <div style="height: 10%;width: 100%;display: flex;align-items: center;color:#009688;font-size: 18px;padding-left: 3%">{{this.$data.courseName}}-{{this.$data.seminarName}}</div>
          <div style="height: 40%;width: 100%;">
            <div style="width: 50%;height: 100%;display: flex;align-items: center;font-size:23px;font-weight: bolder;color: #aaaaaa;padding-left: 5%;float: left;">主题：{{this.$data.seminarName}}</div>
            <div style="width: 50%;height: 100%;display: flex;align-items: center;font-size:23px;font-weight: bolder;color: #aaaaaa;float: left;">报名情况：{{number}}/6</div>
          </div>
          <div style="height: 50%;width: 100%;">
            <div style="height: 33%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">报名起止时间：{{start}}~{{end}}</div>
            <div style="height: 33%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">报告提交截止时间：{{DDL}}</div>
            <div style="height: 34%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">内容：本次讨论课可容纳6个小组，每个小组15分钟，其中10分钟展示，5分钟讨论</div>
          </div>
        </div>
        <div style="height: 55%;width: 100%;background:#fff">
          <div style="width: 100%;height: 10%">
            <div style="width: 60%;height: 100%;float: left;font-size: 15px;padding-left: 8%;display: flex;align-items: center">已报名小组：</div>
            <div style="width: 40%;height: 100%;float: left;font-size: 15px;display: flex;align-items: center">
              班级：
              <el-select style="width: 70%" v-model="select" v-on:change="changeSelect">
                <el-option v-for="item in classList" :value="item.id" :label="item.name" :key="item.id"></el-option>
              </el-select>
            </div>
          </div>
          <el-table style="width: 90%;margin-left: 5%" border height="85%" :data="teamList">
            <el-table-column label="次序" align="center" prop="order"></el-table-column>
            <el-table-column label="组号" align="center" prop="serial"></el-table-column>
            <el-table-column label="报告" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.reportName}}</div>
                <button v-if="scope.row.reportName==='未上传'" style="display: none;"></button>
                <button v-else style="background-color: #009688;border: none;color: #fff;width: 100px;border-radius: 3px" @click="downLoadReport(scope.row)">下载</button>
              </template>
            </el-table-column>
            <el-table-column label="PPT" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.PPTName}}</div>
                <button v-if="scope.row.PPTName==='未上传'" style="display: none;"></button>
                <button v-else style="background-color: #009688;border: none;color: #fff;width: 100px;border-radius: 3px" @click="downLoadPPT(scope.row)">下载</button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "downloadReport",
      data(){
        return{
          id:localStorage.getItem("token"),
          courseName: this.$route.params.courseName,
          courseId: this.$route.params.courseId,
          seminarName:this.$route.params.seminarName,
          seminarId:this.$route.params.seminarId,
          select:'',
          DDL:'',
          start:'',
          end:'',
          classList:[{
            id: '',
            name: '',
          }],
          teamList:[{
            attendanceId:'',
            order:'',
            id:'',
            serial:'',
            reportName:'',
            PPTName:'',
          }],
          number:0,
        }
      },
      methods:{
        enterChooseCourse:function(){
          this.$router.push({
            name:'teacherPCChooseCourse'
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
        getAllClass: function () {
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/course/' + this.$data.courseId + '/class',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.classList.splice(0, _this.$data.classList.length);
            _this.$data.classList = response.data;
            for (let i = 0; i < response.data.length; i++) {
              _this.$data.classList[i].id = response.data[i].id;
              _this.$data.classList[i].name = response.data[i].name;
            }
            _this.$data.select=_this.$data.classList[0].id;
            _this.getSelectClass();
            _this.getSeminarInfo();
          }).catch(function (error) {
            console.log(error);
          })
        },
        getSelectClass:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/attendance?cClassId='+_this.$data.select+'&seminarId='+_this.$data.seminarId,
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.teamList.splice(0,_this.$data.teamList.length);
            _this.$data.number=0;
            _this.$data.DDL=response.data[0].reportDDL;
            for(var i=0;i<response.data.length;i++){
              _this.$data.teamList.push({
                attendanceId:response.data[i].id,
                order:response.data[i].teamOrder,
                id:response.data[i].teamBaseInfoVO.id,
                serial:response.data[i].teamBaseInfoVO.teamSerials,
                reportName:response.data[i].reportName===null?'未上传':response.data[i].reportName,
                PPTName:response.data[i].pptName===null?'未上传':response.data[i].pptName,
              });
              _this.$data.number++;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },
        changeSelect:function(){
          this.getSelectClass();
          this.getSeminarInfo();
        },
        getSeminarInfo:function(){
          let _this = this;
          this.$axios({
            method: 'get',
            url: '/seminar/'+_this.$data.seminarId+'/class/'+_this.$data.select,
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
            _this.$data.start=response.data.enrollStartTime;
            _this.$data.end=response.data.enrollEndTime;
          }).catch(function (error) {
            console.log(error);
          })
        },
        downLoadReport:function(row){
          this.$axios({
            method: 'get',
            url: '/attendance/'+row.attendanceId+'/report',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
          }).catch(function (error) {
            console.log(error);
          })
        },
        downLoadPPT:function(row){
          this.$axios({
            method: 'get',
            url: '/attendance/'+row.attendanceId+'/ppt',
            headers: {
              'Authorization': 'Bearer ' + this.$data.id
            },
          }).then(function (response) {
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      created() {
          this.getAllClass();
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
