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
        <div style="height: 50%;border-bottom:2px solid #eee;width: 100%;background: #f2f2f2;border-left: #f2f2f2 2px solid;color: #000;display: flex;align-items: center;justify-content: center;font-size: 17px;"> 导入学生名单</div>
        <div style="height: 50%;border-bottom:2px solid #eee;width: 100%;background: #dddddd;color: #000;display: flex;align-items: center;justify-content: center;font-size: 17px;" @click="enterSeminar">讨论课</div>
      </div>
      <div class="mmain">
        <div style="width: 90%;margin-left: 5%;height: 10%;display: flex;align-items: center;color:#009688;font-size: 20px;margin-top: 2%;border: 1px solid #dddddd;padding-left: 2%">{{this.$route.params.courseName}}-导入学生名单</div>
        <div style="width: 90%;margin-left: 5%;height: 5%;display: flex;align-items: center;color:#009688;font-size: 20px;padding-left: 3%;margin-top: 1%;margin-bottom: 1%">班级列表</div>
        <el-table :data="classList" style="width: 90%;margin-left: 5%" max-height="75%" :show-header="false" border>
          <el-table-column width="200px" align="center">
            <template slot-scope="scope">
              <div style="color: #009688;font-size: 18px">{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <div>
                <div style="margin-left:30%;float:left;margin-right:5%;color: blue;font-style: italic;height: 100%;display: flex;align-items: center;">{{scope.row.fileName}}</div>
                <div style="float: left"><input type="file" v-on:change="uploadFile(this,scope.row)"></input></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="250px" align="center">
            <template slot-scope="scope">
              <button style="width: 40%;height:35px;border: none;background:#009688;color: #fff;border-radius: 3px" @click="overFile(scope.row)" >提交</button>
              <button style="width: 40%;height:35px;margin-left: 10%;border: none;background:#aaaaaa;color: #fff;border-radius: 3px">重置</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "importStudent",
      data() {
        return {
          id: localStorage.getItem("token"),
          courseName: this.$route.params.courseName,
          courseId: this.$route.params.courseId,
          classList: [{
            id: '',
            name: '',
            fileName: '',
            file: '',
          }],
          currentFile:''
        }
      },
      methods: {
        enterChooseCourse: function () {
          this.$router.push({
            name: 'teacherPCChooseCourse'
          })
        },
        enterSeminar: function () {
          this.$router.push({
            name: 'teacherPCSeminar',
            params: {
              courseName: this.$data.courseName,
              courseId: this.$data.courseId
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
              _this.$data.classList[i].fileName = response.data[i].fileName;
              if (_this.$data.classList[i].fileName === null) _this.$data.classList[i].fileName = '未上传';
              _this.$data.classList[i].file = null;
            }
          }).catch(function (error) {
            console.log(error);
          })
        },

        uploadFile:function(event,row){
          var e=window.event||event;

          // 获取当前选中的文件
          var oFile = e.target.files[0];

          let formData = new FormData();
          formData.append('file', oFile);
          console.log(oFile);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          };
          this.$http.post('/class/' + row.id + '/studentfile', formData, config)
            .then(res => {
              row.file = null;
              row.fileName=res.data;
            })
            .catch(err => {
              console.log(err)
            })
        },

        overFile:function(row){
          let _this=this;
          this.$axios({
            url:'/class/'+row.id,
            method:'post',
            data:({
              fileName:row.fileName
            }),
            headers: {
              // 'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + _this.$data.id
            }
          }).then(function(response){
            if(response.data===true) {
              _this.$message({
                message:'上传成功!',
                type:'success'
              })
            }
          }).catch(function(error){
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
