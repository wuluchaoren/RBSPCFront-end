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
        <div class="nav">
          <div style="height: 5%;visibility: hidden"></div>
          <div style="height: 5%;background-color: #009688;margin-left: 5%;margin-right: 5%;text-align: center;vertical-align: middle;font-size: 30px">
            <div style="color: white;width: 100%">所有轮次</div>
          </div>
          <div  v-for="round in rounds" :key="round.roundId">
            <div class="title" @click="round.vis=!round.vis">

              <span class="center">
              第{{round.roundOrder}}轮
            </span>

              <img class="arrow" v-if="!round.vis" src="../../assets/down-arrow.png" />
              <img class="arrow" v-else src="../../assets/up-arrow.png">
            </div>

            <div class="content" v-if="round.vis">

              <div class="seminar-cell" v-for="seminar in round.mySeminars" :key="seminar.seminarId"
                   @click="enterSeminarIndex(seminar.seminarId,seminar.seminarTopic)">
                <span class="seminar-cell-front">{{seminar.seminarSerial}}</span>
                <span class="seminar-cell-center">{{seminar.seminarTopic}}</span>
                <span class="seminar-cell-end"><img class="arrow" src="../../assets/arrow.png"></span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="mmain">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "studentPCSeminar",
    data(){
      return{
        courseName: this.$route.params.courseName,
        courseId: this.$route.params.courseId,
        rounds:[{
          roundId:'',
          roundOrder:'',
          vis:'',
          mySeminars:[{
            seminarId:'',
            seminarName:'',
          }],
        }],
        getRoundsUrl:`course/${this.$route.params.courseId}/seminars`,
      }
    },
    methods:{
      enterChooseCourse:function(){
        this.$router.push({
          name:'studentPCChooseCourse'
        })
      },
      getRounds:function (url,params) {
        this.$http.get(url,{params:{params}})
          .then(res=>{
            let datas = res.data.rounds

            let rounds =[]


            // all rounds in course
            datas.forEach((data)=>{
              //if empty
              if (!rounds[datas.roundSerial]){

                let seminars = []

                //all seminars in a round
                data.seminarInfoVOS.forEach(seminar=>{

                  let s = {
                    seminarId:seminar.seminarId,
                    seminarTopic:seminar.seminarName,
                    seminarSerial:seminar.seminarSerial,
                    seminarVisible:seminar.visible,
                  }

                  seminars.push(s)

                })



                let r = {
                  roundId:data.roundId,
                  roundOrder:data.roundSerial,
                  mySeminars:seminars,
                  vis:false,
                }

                rounds.push(r);
              }
            });
            this.rounds =  rounds;
          })
          .catch(err=>{

          })
      },
      enterSeminarIndex(id,topic){
        this.$router.push(
          {
            name:'seminarOperationSelect',
            params:{
              courseName:this.courseName,
              courseId:this.courseId,
              seminarId:id,
            },
            query:{
              seminarTopic:topic,
            }
          }
        )
      }
    },
    created() {
      this.getRounds(this.getRoundsUrl,{});
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
  .nav{
    height: 100%;
    border-bottom:2px solid #eee;
    width: 100%;
    background: #f2f2f2;
    color: #000;
    align-items: center;
    justify-content: center;
    font-size: 17px;
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
    float: left;
  }
  .mmain{
    width:80%;
    height: 100%;
    background: #f2f2f2;
    float: left;
  }
  .title{
    height: 60px;
    display: flex;
    align-items: center;
    width:90%;
    font-size:20px;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 5%;
    margin-left: 5%;
    text-align: center  ;
  }
  .center{
    width: 90%;
    word-wrap: break-word;
    line-height: 50px;
  }
  .front{
    margin-left: 5%;
    width: 30%;
  }
  .seminar-cell{
    height: 50px;
    display: flex;
    align-items: center;
    width:90%;
    font-size:15px;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 5%;
    margin-left: 5%;
    text-align: center  ;
  }
  .seminar-cell-center{
    width: 90%;
    word-wrap: break-word;
    text-align: center;
  }
  .seminar-cell-front{
    margin-left: 5%;
    width: 20%;
    text-align: center;
    color: green;
  }
  .seminar-cell-end{
    width: 30%;
    text-align: center;
  }
  .arrow{
    right: 1px;
    width: 10px;
    height: 10px;
  }
  .scroll{
    max-height: 90vmax;
    overflow-y:scroll
  }
</style>
