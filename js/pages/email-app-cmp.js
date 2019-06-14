import emailService from '../apps/email/services/email-service.js';
import sideNav from '../apps/email/cmps/side-nav.cmp.js';
import mailAdd from '../apps/email/cmps/mail-add.cmp.js';
import mailsShow from '../apps/email/cmps/mails-show.cmp.js';
import mailFilter from '../apps/email/cmps/mail-filter.cmp.js'

export default {
    name: 'email-app',
    template: `
        <section>
            <!-- <header>
                <h1>Header - Email app</h1>
            </header> -->
            <div id="mobile-menu-button flex" class="mobile-menu-button" v-on:click.stop.prevent="toggleMenu">☰</div> <br>

            <main class="screen" v-on:click="closeMenu"> 
                <h3>Main - Email app</h3>
                <div>
                    <mail-filter v-on:searched="setSearch" v-on:filterBy="setFilterBy"></mail-filter>
                    <mail-add v-on:addMail="pushNewMail"></mail-add>
                </div>
                
                <div class="mails-container flex">
                    <mails-show v-on:onReading="changeReadMark" 
                    v-bind:mails="mailsToShow" v-on:deleted="deletedMail" v-on:selected="selectingMail"></mails-show>
                    <side-nav v-on:filterEmails="emailsToDisplay"></side-nav>
                </div>                
            </main>
        </section>
    `,
    data() {
        return {
            mails: [],
            filter: {
                subject: ''
            },
            statusMailToDisplay: 0,   //0 display all,1 display read,2 display unread, 3 sent
            selectedMail: null,
            filterBy: 'dateDown',
            isMobileNavOpen: true,
        }
    },
    methods: {
        toggleMenu() {
            document.body.classList.toggle('open');
            this.isMobileNavOpen = true;
        },
        closeMenu() {
            document.body.classList.remove('open');
        },
        pushNewMail(newMail) {
            emailService.addMail(newMail)
                .then(Servicemails => this.mails = Servicemails)
        },
        deletedMail(mailId) {
            emailService.deletedMail(mailId)
                .then(() => {
                    // console.log('mail deleted')
                })
        },
        setSearch(filter) {
            // console.log('filter', filter)
            this.filter = filter
        },
        setFilterBy(filter) {
            this.filterBy = filter
        },
        selectingMail(mail) {
            // console.log('emited', mail)
            this.selectedMail = mail
        },
        changeReadMark(mail) {
            emailService.changeReadMarkService(mail)
        },
        sortBySubjectUP(obj1, obj2) {
            // console.log('sort by subject up', obj1.subject, obj2.subject)
            let e1 = obj1.subject.toLowerCase();
            let e2 = obj2.subject.toLowerCase();
            if (e1 > e2) return -1
            if (e1 < e2) return 1
            return 0
        },
        sortByDateUp(date1, date2) {
            // console.log('sort by date down')
            if (date1.date < date2.date) return -1
            if (date1.date > date2.date) return 1
            return 0
        },
        sortByDateDown(date1, date2) {
            // console.log('sort by date up')
            if (date1.date > date2.date) return -1
            if (date1.date < date2.date) return 1
            return 0
        },

        emailsToDisplay(status) {
            // console.log('status',status)
            this.statusMailToDisplay = status;
            this.mailsToShow
        }
    },
    computed: {
        mailsToShow() {
            // console.log('statusMailToDisplay',this.statusMailToDisplay)
            if (!this.filter && !this.statusMailToDisplay) return this.mails
            let filteredMails = this.mails.filter(mail => {
                if (!mail.subject) return true; // omer add to prevent error with *includes*
                return ((this.filter.hasOwnProperty('subject') && mail.subject.includes(this.filter.subject)) &&
                    (!this.statusMailToDisplay ||
                    (this.statusMailToDisplay === 1 && mail.isRead ||
                     this.statusMailToDisplay === 2 && !mail.isRead)))
            })

            switch (this.filterBy) {
                case 'subjectUp':
                    filteredMails = filteredMails.sort(this.sortBySubjectUp)
                    break;

                case 'subjectDown':
                    filteredMails = filteredMails.reverse()
                    break;

                case 'dateUP':
                    filteredMails = filteredMails.sort(this.sortByDateUp)
                    break;

                case 'dateDown':
                    filteredMails = filteredMails.sort(this.sortByDateDown)
                    break;
            }
            return filteredMails
        }
    },
    created() {

    },
    mounted() {
        emailService.getMails()
            .then(Servicemails => this.mails = Servicemails)
    },
    components: {
        mailsShow,
        mailAdd,
        mailFilter,
        sideNav,

    }
}