<template>
  <div class="entry">
  <div class="head">{{this.$route.params.courseName}}</div>
  <div style="margin-top: 10%">

  </div>
  </div>
</template>

<script>
    export default {
        name: "studentSeminarHome",
        data() {
          return {
            courseName: this.$route.params.courseName,
            courseId: this.$route.params.courseId,
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
