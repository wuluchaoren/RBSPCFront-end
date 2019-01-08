<template>
  <div class="entry">
    <div class="head">{{this.$route.params.courseName}}-{{this.$route.query.seminarTopic}}</div>
    <div v-if="classId" style="margin-top: 10%">
      <div class="entry-div" @click="enterUpload()">
        <div>
          <img style="width:20%" src="../../assets/upload.png"/>
        </div>
        <div class="entry-font-div">上传</div>
      </div>
      <div class="entry-div" @click="enterDownload()">
        <div>
          <img style="width:20%" src="../../assets/download.png"/>
        </div>
        <div class="entry-font-div">下载</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentSeminarOperationSelect",
        data(){
          return{
            courseName:this.$route.params.courseName,
            courseId:this.$route.params.courseId,
            seminarId:this.$route.params.seminarId,
            classId:'',
            teamId:'',
            getMyTeamUrl:`course/${this.$route.params.courseId}/team/mine`,
          }
        },
      created(){
        this.getMyTeam(this.getMyTeamUrl,{})
      },
      methods:{
          getMyTeam:async function(url,params){
            await this.$http.get(url,{params})
              .then(res=>{

                let datas = res.data

                this.classId = datas.class.id

                this.teamId = datas.teamInfo.id

              })
              .catch((err)=>{
                console.log(err)
              })
          },
          enterUpload(){
            this.$router.push(
              {
                name:'seminarUpload',
                params:{
                  courseName:this.courseName,
                  courseId:this.courseId,
                  seminarId:this.seminarId,
                  classId:this.classId,
                  teamId:this.teamId
                },
                query:{
                  seminarTopic:this.$route.query.seminarTopic,
                }
              }
            )
          },
          enterDownload(){
            this.$router.push(
              {
                name:'studentSeminarDownload',
                params:{
                  courseName:this.courseName,
                  courseId:this.courseId,
                  seminarId:this.seminarId,
                  classId:this.classId
                },
                query:{
                  seminarTopic:this.$route.query.seminarTopic,
                }
              }
            )
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
  .entry-font-div{
    font-size:2vmax;
    margin-top: 5%;
  }
  .entry-div{
    width:50%;
    float:left;
  }
</style>
