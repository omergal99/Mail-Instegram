import mainRoutes from './routes.js';

const mainRouter = new VueRouter({routes: mainRoutes})

window.vueApp = new Vue({
    el: '#app',
    router: mainRouter,
    components: {
    }
})