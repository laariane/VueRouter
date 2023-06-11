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
      path: '/teams', components: { default:TeamsList,footer: TeamFooter }, children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true }
      ]
    },
    { path: '/users', components: { default: UsersList, footer:UsersFooter } },

    { path: '/:notFound(.*)', redirect: '/teams' }
  ],
  linkActiveClass:'active',
  scrollBehavior(to,from,savedPosition){
    console.log(to,from,savedPosition)
  }
});

const app = createApp(App);

app.use(router);

app.mount('#app');
