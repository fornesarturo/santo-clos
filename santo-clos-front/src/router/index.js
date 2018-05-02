import Vue from 'vue'
import Router from 'vue-router'
import Hub from '@/components/Hub'
import Settings from '@/components/Settings'
import CreateEvent from '@/components/CreateEvent'
import EventInformation from '@/components/EventInformation'
import LoginIndex from '@/components/LoginIndex'

/* eslint-disable */

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", component: LoginIndex },
    { path: "/hub", component: Hub },
    { path: "/settings", component: Settings },
    { path: "/create-event", component: CreateEvent },
    { path: "/eventInformation", component: EventInformation }
  ]
})
