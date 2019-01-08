import Vue from 'vue'
import Router from 'vue-router'
import PClogin from '@/components/login'

import teacherPCChooseCourse from '@/components/teacher/chooseCourse'
import teacherPCImportStudent from '@/components/teacher/importStudent'
import teacherPCSeminar from'@/components/teacher/seminar'
import teacherPCDownloadReport from'@/components/teacher/downloadReport'


import studentPCChooseCourse from '@/components/student/studentChooseCourse'
import studentPCSeminar from '@/components/student/studentSeminar'
import seminarHome from  '@/components/student/studentSeminarHome'
import seminarOperationSelect from  '@/components/student/studentSeminarOperationSelect'
import seminarDownload from '@/components/student/studentSeminarDownload'
import seminarUpload from '@/components/student/studentSeminarUpload'

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/PC/',
  routes: [
    {
      path: '/',
      redirect: '/PClogin',//设置默认指向的路径
      name: 'PCLogin'
    },
    {
      path: '/PClogin',
      name: 'PClogin',
      component: PClogin
    },
    //老师
    {
      //选择课程
      path: '/PCTchooseCourse',
      name: 'teacherPCChooseCourse',
      component: teacherPCChooseCourse
    },
    {
      //导入名单
      path:'/PCTimportStudent/:courseName/:courseId',
      name:'teacherPCImportStudent',
      component:teacherPCImportStudent,
    },
    // {
    //   //导出成绩
    //   path:'/PCTexportScore/:courseName/:courseId',
    //   name:'teacherPCExportScore',
    //   component:teacherPCExportScore,
    // },
    {
      //讨论课
      path:'/PCTseminar/:courseName/:courseId',
      name:'teacherPCSeminar',
      component:teacherPCSeminar,
    },
    {
      //下载报告
      path:'/downloadReport/:courseName/:courseId/:seminarName/:seminarId',
      name:'teacherPCDownloadReport',
      component:teacherPCDownloadReport,
    },
    //学生
    {
      //选择课程
      path: '/PCSchooseCourse',
      name: 'studentPCChooseCourse',
      component: studentPCChooseCourse
    },
    {
      //讨论课
      path:'/PCSseminar/:courseName/:courseId',
      name:'studentPCSeminar',
      component:studentPCSeminar,
      children:[
        {
          name:'seminarHome',
          path:'home',
          component:seminarHome,
       },
        {
          name:'seminarOperationSelect',
          path:'seminar/:seminarId',
          component:seminarOperationSelect
        },
        {
          name:'studentSeminarDownload',
          path:'seminar/:seminarId/download/class/:classId',
          component:seminarDownload
        },
        {
          name:'seminarUpload',
          path:'seminar/:seminarId/upload/class/:classId/team:teamId',
          component:seminarUpload
        }
        ]
    }

  ]
})
