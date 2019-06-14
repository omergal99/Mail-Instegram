 import emailApp from './pages/email-app-cmp.js';
import emailDetails from './apps/email/pages/mail-details.cmp.js'
import emailReply from './apps/email/pages/email-reply.cmp.js'

import keepApp from './pages/keep-app-cmp.js';
import keepEdit from './apps/keep/pages/keep-edit-cmp.js';

import aboutCmp from './pages/about-cmp.js';
import homeCmp from './pages/home-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp },
    { path: '/email-app', component: emailApp },
    { path: '/email-app/:mailId', component: emailDetails },
    { path: '/email-app/:mailId/reply', component: emailReply },
    
    { path: '/keep-app', component: keepApp },
    { path: '/keep-edit/:noteId', component: keepEdit },
]

export default routes;