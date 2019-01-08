<template>
  <div class="entry">
    <div class="head">{{this.$route.params.courseName}}-{{this.$route.query.seminarTopic}}-上传</div>
    <div style="margin-top: 2%;display: flex" v-if="attendanceId">
      <div style="width: 35%;margin-left: 10%;">

        <Upload
          ref="uploadPPT"
          type="drag"
          :before-upload="handleUploadPPT" action="">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="100" style="color:#009688"></Icon>
            <h1>上传PPT</h1>
            <h3 v-if="pptFile">{{pptFile.name}}</h3>
          </div>
        </Upload>
        <Button type="success" @click="uploadPPT" style="background-color: #009688;color: white; width: 30%;margin-top: 3%;font-size: 20px" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '确认上传' }}
        </Button>

        <div v-if="pptName" style="width: 100%;font-size: 30px;color: green;margin-top: 15%;text-align: center">已提交</div>
        <div v-else style="width: 100%;font-size: 30px;color: red;margin-top: 15%;text-align: center">未提交</div>
      </div>

      <div style="width: 35%;margin-left: 10%;">
        <Upload
          ref="uploadReport"
          type="drag"
          :before-upload="handleUploadReport" action="">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="100" style="color:#009688"></Icon>
            <h1>上传书面报告</h1>
            <h3 v-if="reportFile">{{reportFile.name}}</h3>
          </div>
        </Upload>

        <Button v-if="isAfterReportDDL"  @click="uploadReport" style="background-color: #009688;color: white; width: 30%;margin-top: 3%;font-size: 20px" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '确认上传' }}
        </Button>

        <Button v-else disabled style="background-color: #009688;color: white; width: 30%;margin-top: 3%;font-size: 20px" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '确认上传' }}
        </Button>

        <div v-if="reportName" style="width: 100%;font-size: 30px;color: green;margin-top: 15%;text-align: center">已提交</div>
        <div v-else style="width: 100%;font-size: 30px;color: red;margin-top: 15%;text-align: center">未提交</div>

        <div v-if="!reportName" style="width: 100%;font-size: 20px;color: red;margin-top: 5%;text-align: center">截止日期{{reportDDL}}</div>
      </div>
    </div>
    <div v-else style="margin-top: 14%;display: flex;justify-content: center">
      <span style="color: #009688; width: 100%;margin-top: 3%;font-size: 35px">对不起,你未报名本次讨论课，不能上传文件</span>
    </div>
  </div>
</template>

<script>

    Date.prototype.Format = function(fmt)
    { //author: meizz
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }

    export default {
        name: "studentSeminarReport",
        data() {
          return {
            courseName: this.$route.params.courseName,
            courseId: this.$route.params.courseId,
            classId:this.$route.params.classId,
            teamId:this.$route.params.teamId,
            pptFile:null,
            reportFile:null,
            loadingStatus:false,
            getTeamSignUpStateUrl:`attendance`,
            attendanceId:'',
            reportName:'',
            pptName:'',
            reportDDL:'',
            isAfterReportDDL:false
          }
        },
        created(){
          this.getTeamSignUpState(this.getTeamSignUpStateUrl,
            {seminarId:this.$route.params.seminarId,cClassId:this.$route.params.classId})
        },
        methods:{
          getTeamSignUpState:function (url,params) {
            this.$http.get(url,{params:params})
              .then((res)=>{

                let datas = res.data

                datas.forEach(presentation=>{
                  let teamId = presentation.teamBaseInfoVO.id
                  //如果报名了
                  if (teamId==this.teamId){
                    this.reportName = presentation.reportName
                    this.pptName = presentation.pptName
                    this.attendanceId = presentation.id
                    this.reportDDL = presentation.reportDDL
                    this.isAfterReportDDL = this.isAfterDDL(presentation.reportDDL)
                  }
                })

              })
              .catch(err=>{
                console.log(err)
              })
          },
          handleUploadPPT (file) {
            this.pptFile = file;
            return false;
          },
          handleUploadReport(file){
            this.reportFile=file
            return false;
          },
          uploadPPT () {
            if (this.pptFile.size>0){
              this.loadingStatus = true;
              let formData = new FormData()

              formData.append('ppt',this.pptFile)

              console.log(this.pptFile.size);

              let config = {
                headers:{'Content-Type':'multipart/form-data'}
              };

              this.$http.post(`/attendance/${this.attendanceId}/ppt`,formData,config)
                .then(res=>{
                  this.pptName= this.pptFile.name
                  this.pptFile = null;
                  this.loadingStatus = false;
                  this.$Message.success('上传成功!')
                })
                .catch(err=>{
                  this.pptFile = null;
                  this.loadingStatus = false;
                  this.$Message.error('错误')
                  console.log(err)
                })
            }
            else {
              this.$Message.error('所选择的文件大小为0!')
            }

          },
          uploadReport () {
            if (this.reportFile.size>0){
              this.loadingStatus = true;
              let formData = new FormData()

              formData.append('report',this.reportFile)

              console.log(this.reportFile.size)

              let config = {
                headers:{'Content-Type':'multipart/form-data'}
              };

              this.$http.post(`/attendance/${this.myTeamPresentation.attendanceId}/report`,formData,config)
                .then(res=>{
                  this.reportName= this.reportFile.name
                  this.reportFile = null;
                  this.loadingStatus = false;
                  this.$Message.success('上传成功!')
                })
                .catch(err=>{
                  this.reportFile = null;
                  this.loadingStatus = false;
                  this.$Message.error('错误')
                  console.log(err)
                })
            }
            else {
              this.$Message.error('所选择的文件大小为0!')
            }
          },
          isAfterDDL(teamEndTime){
            let nowTime = new Date().Format("yyyy/MM/dd hh:mm:ss")
            if ((Date.parse(teamEndTime)-Date.parse(nowTime))<0){
              return false
            }
            else {
              return true
            }
          }
        }
    }
</script>

<style scoped>
  .head{
    width: 90%;
    margin-left: 5%;
    height: 10%;
    display: flex;
    justify-content:center;
    align-items: center;
    color:#009688;
    font-size: 30px;
    margin-top: 2%;
    border: 1px solid #dddddd;
    padding-left: 2%
  }
  .entry{
    height: 80%;
    width:100%;
    text-align:center;
  }
</style>
