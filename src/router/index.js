import Vue from "vue";
import Router from "vue-router";
import Header from "../components/Header.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/login.vue")
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/info.vue"),
      children: [
        //首页
        {
          path: "home",
          name: "home",
          component: () => import("../views/home.vue")
        },
        // 留言板
        {
          path: "/messages",
          name: "messages",
          component: () => import("../components/messages.vue")
        },
        // 管理员权限管理
        {
          path: "/adminAuthority",
          name: "adminAuthority",
          component: () => import("../components/adminAuthority.vue")
        },
        // 用户权限
        {
          path: "/userAuthority",
          name: "userAuthority",
          component: () => import("../components/userAuthority.vue")
        },
        // 企业权限
        {
          path: "/enterpriseAuthority",
          name: "enterpriseAuthority",
          component: () => import("../components/enterpriseAuthority.vue")
        },
        // 招聘简历页面
        {
          path: "/recruitmentResume",
          name: "recruitmentResume",
          component: () => import("../components/recruitmentResume.vue")
        },
        // 招聘信息页面
        {
          path: "/recruitmentInformation",
          name: "recruitmentInformation",
          component: () => import("../components/recruitmentInformation.vue")
        },
        // 个人信息页面
        {
          path: "/userAuthority",
          name: "personalInformation",
          component: () => import("../components/userAuthority.vue")
        },
        // 个人简历信息
        {
          path: "/recruitmentResume",
          name: "resumeInformation",
          component: () => import("../components/recruitmentResume.vue")
        },
        // 个人招聘信息
        {
          path: "/recruitmentInformation",
          name: "recruitmentInfo",
          component: () => import("../components/recruitmentInformation.vue")
        },
        // 企业信息
        {
          path: "/enterpriseAuthority",
          name: "enterpriseInformation",
          component: () => import("../components/enterpriseAuthority.vue")
        },
        // 职位招聘信息
        {
          path: "/recruitmentInformation",
          name: "recruitment",
          component: () => import("../components/recruitmentInformation.vue")
        },
        // 企业简历信息
        {
          path: "/recruitmentResume",
          name: "resumeInfo",
          component: () => import("../components/recruitmentResume.vue")
        },

      ]
    }
  ]
});
