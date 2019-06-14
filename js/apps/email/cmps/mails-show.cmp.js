
import emailService from '../services/email-service.js'

export default {
    props: ['mails'],
    template: `
    <section>

        <div v-if="mails" >
            <ul class="mails-list">
                <li class="clean-list" v-for="(currMail, idx) in mails"> 
                    <router-link :to="'/email-app/' + currMail.id">
                        <div class="mail-preview flex" 
                        v-bind:class="{'not-bold': currMail.isRead}"
                        @click="selectMail(currMail)"
                        >
                            <div class="mail-input-container flex">
                                <span class="mail-input">{{currMail.sentFrom}}</span>
                                <span class="mail-input">{{currMail.subject}}</span>
                                <span class="sent-at mail-input">{{currMail.sentAt}}</span>
                            </div>
                            
                                <div class="mail-buttons-container flex">
                                    <button class="delete-mail-btn mail-btn" v-on:click.stop.prevent="emitDeleted(currMail.id)" title="Delete">	
                                        <img src="img/icons/garbage.png" class="mail-btn-img">                               
                                    </button>
                                    
                                    <button v-if="!currMail.isRead" 
                                    v-on:click.stop.prevent="markAsRead(currMail)" 
                                    class="mail-btn" title="Mark as unread">
                                        <img src="img/icons/drafts-evelope-button.png" 
                                        class="mail-btn-img">                               
                                    </button>
                                    
                                    <button v-if="currMail.isRead" v-on:click.stop.prevent="markAsRead(currMail)" class="mail-btn" title="Mark as read">
                                        <img src="img/icons/write-email-envelope-button.png"  alt="&#x2709" class="mail-btn-img">                                                              
                                    </button>
                                    
                                    <!-- <button class="mail-btn" title="Send to notes">
                                        <img src="img/icons/post-it.png" class="mail-btn-img">                                                              
                                    </button> -->
                                </div>

                            <!-- </div> -->
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>  
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        emitDeleted(mailId) {
            this.$emit('deleted', mailId)
        },
        selectMail(mail) {
            mail.isRead = true
            // console.log('mail', mail)
            this.$emit('selected', mail)
            this.$emit('onReading', mail)
            if (mail === this.selectedMail) this.selectedMail = null
            else this.selectedMail = mail
        },
        markAsRead(mail) {
            // console.log('mark as read',mail)
            mail.isRead = !mail.isRead
            this.$emit('onReading', mail)
        }
    },
    computed: {

    },
    created() {
        const mailId = this.$route.params.mailId
        emailService.getMailById(mailId)
            .then(currMail => {
                this.mail = currMail
            });
    },
    mounted() {

    },
    components: {

    }
}