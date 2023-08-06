import MainLayout from '@layouts/MainLayout';

// import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import ToDo from '@pages/ToDo';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   layout: MainLayout,
  // },
  {
    path: '/',
    name: 'Todo',
    component: ToDo,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout },
];

export default routes;
