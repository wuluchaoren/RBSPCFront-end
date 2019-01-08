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
            <div style="width: 50%;height: 100%;display: flex;align-items: center;font-size:23px;font-weight: bolder;color: #aaaaaa;float: left;">报名情况：</div>
          </div>
          <div style="height: 50%;width: 100%;">
            <div style="height: 33%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">报名起止时间：</div>
            <div style="height: 33%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">报告提交截止时间：</div>
            <div style="height: 34%;width: 100%;color: #000;font-size: 20px;padding-left: 5%">内容：本次讨论课可容纳6个小组，每个小组15分钟，其中10分钟展示，5分钟讨论</div>
          </div>
        </div>
        <div style="height: 55%;width: 100%;background:#fff">
          <div style="width: 100%;height: 10%">
            <div style="width: 60%;height: 100%;float: left;font-size: 15px;padding-left: 8%;display: flex;align-items: center">已报名小组：</div>
            <div style="width: 40%;height: 100%;float: left;font-size: 15px;display: flex;align-items: center">
              班级：
              <el-select style="width: 70%" v-model="select">
                <el-option value="" label="" key="1">1</el-option>
                <el-option value="" label="" key="2">2</el-option>
                <el-option value="" label="" key="3">3</el-option>
              </el-select>
            </div>
          </div>
          <el-table style="width: 90%;margin-left: 5%" border max-height="85%">
            <el-table-column label="次序" align="center" ></el-table-column>
            <el-table-column label="组号" align="center" ></el-table-column>
            <el-table-column label="组长" align="center" ></el-table-column>
            <el-table-column label="报告" align="center" ></el-table-column>
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
          select:''
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
        }
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
