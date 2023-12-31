import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers';
import TeamFooter from '@/components/teams/TeamFooter.vue';
import UsersFooter from '@/components/users/UsersFooter.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name:'teams',path: '/teams', 
      components: { default:TeamsList,footer: TeamFooter },
       children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true }
      ]
    },
    { path: '/users', components: { default: UsersList, footer:UsersFooter } , 
    beforeEnter(to,from,next){
      console.log('users Before enter')
      console.log(to,from)
      next()
     
    }},

    { path: '/:notFound(.*)', redirect: '/teams' }
  ],
  linkActiveClass:'active',
  scrollBehavior(_,_2,savedPosition){
   
    if(savedPosition){
      return savedPosition
    }
    return{left :0 , top: 156}
  }
});

// router.beforeEach((to, from , next)=>{
//   console.log("global")
//   console.log(to,from);
//   if(to.name==='team-members') next();
//   next({name:'team-members',params:{teamId:'t2'}});

// });

const app = createApp(App);

app.use(router);

app.mount('#app');
