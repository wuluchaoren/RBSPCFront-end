<template>
  <div class="entry">
    <div class="head">{{this.$route.params.courseName}}-{{this.$route.query.seminarTopic}}-下载</div>
    <div style="margin-top: 5%">
        <div v-for="(pre,index) in allPres" :key="pre.attendanceId"  style="display: flex;height:4vmax;align-items: center;background-color: white;margin-top: 2px">
          <div style="width: 30%;justify-content: center;text-align: center">
            <span class="span1" slot="default">第{{index+1}}组</span>
          </div>
          <div style="width: 40%;justify-content: center;text-align: center">
            <span class="span2" v-if="pre.preFileName" slot="default"><a  @click="downloadPPT(pre)">{{pre.preFileName}}</a></span>
            <span class="span2" style="color: red" v-else>暂未上传</span>
          </div>
          <div  style="width: 30%;justify-content: center;text-align: center">
            <span class="span1" slot="default">{{pre.teamNumber}}</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentSeminarPPT",
        data() {
          return {
            courseName: this.$route.params.courseName,
            courseId: this.$route.params.courseId,
            classId:this.$route.params.classId,
            getTeamListUrl:`attendance`,
            pres:[]
          }
        },
      created(){
        this.getTeamList(this.getTeamListUrl,{cClassId:this.$route.params.classId,seminarId:this.$route.params.seminarId})
      },
      methods:{
        getTeamList:function (url,params) {
          this.$http.get(url,{params:params})
            .then((res)=>{

              let datas = res.data

              let pres = []

              datas.forEach(presentation=>{
                let pre = {
                  attendanceId:presentation.id,
                  teamId:presentation.teamBaseInfoVO.id,
                  teamNumber:presentation.teamBaseInfoVO.teamSerials,
                  teamName:presentation.teamBaseInfoVO.teamName,
                  preOrder:presentation.teamOrder,
                  preFileName:presentation.pptName,
                  preFileUrl:presentation.pptUrl
                }

                pres.push(pre)

              })

              this.pres = pres


            })
            .catch(err=>{

            })
        },
        downloadPPT(pre){
          this.$http.get(`attendance/${pre.attendanceId}/ppt`,{
            responseType:'arraybuffer'
          })
            .then(res=>{
              // let blob = new window.Bolb([res.data],{type:"application/force-download"})
              // let objectUrl = URL.createObjectURL(blob)
              // window.location.href = objectUrl;
              this.$downloadFile(pre.preFileName,res.data)
              this.$Message.success('下载成功')
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
      computed:{
        allPres:function () {

          let all = []

          this.pres.forEach(pre=>{
            all[pre.preOrder-1] = pre
          })

          var r = all.filter(function (s) {
            return !(s==null);
          })

          return r
        }
      },
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
  .span1{
    font-size: 30px;
  }
  .span2{
    font-size: 25px;
  }
</style>
