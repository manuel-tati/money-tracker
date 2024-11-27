import { createRouter, createWebHashHistory } from "vue-router";
import { isSignedIn } from "./api/endpoints/sign/auth";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/sign-up";
import { NotFound } from "./pages";
import { Account, Home } from "./pages/account";
import { ChangePassword, NewAccount, ProfileDetails } from "./pages/account/components";

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/signup', name: "sign-up", component: SignUp, meta: { requiresAuth: false }, },
  { path: '/', name: "sign-in", component: SignIn, alias: "/signin", meta: { requiresAuth: false }, },
  {
    path: '/account', name: "Home", component: Home, meta: { requiresAuth: true }, children: [
      { path: '', name: "Account", component: Account, alias: "/account", },
      { path: 'new-account', name: "New Account", component: NewAccount, },
      { path: 'change-password', name: "Change Password", component: ChangePassword },
      { path: 'profile', name: "Profile", component: ProfileDetails },
    ],

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (
    'requiresAuth' in to.meta &&
    to.meta.requiresAuth &&
    !isSignedIn()
  ) {
    next('/signin');
  } else if (
    'requiresAuth' in to.meta &&
    !to.meta.requiresAuth &&
    isSignedIn()
  ) {
    next('/account');
  } else {
    next();
  }
});
export default router;