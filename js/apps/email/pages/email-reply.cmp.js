import emailService from '../services/email-service.js'

export default {
    template: `
        <section v-if="mail">
            <header>
                <h1>Email Replay</h1>
            </header>
            <main> 
                <div class="mail-details flex space-start">
                    
                    <label style="display: inline-block; float:left; margin-top: 4px;">Sent form:</label>
                    <input type="text" v-model="mail.sentFrom" class="mail-title-edit">        

                </div>

                <div class="mail-details">
                    <span>Sent At: </span>
                    {{mail.sentAt}} 
                
                </div>

                <div class="mail-details">
                    <span>Subject: </span>
                    {{mail.subject}} 
                </div>

                <div class="mail-details message">
                    <div>Message: </div>
                    <textarea class="mail-area-edit" ref="textAreaRef" type="text"
                        v-model="mail.body" 
                        v-on:keyup="resizeArea">
                    </textarea>
                </div>

                <!-- right now the button to only update >> need to add new mail -->
                <!-- its not a problem, just change the splice to only unshift -->
                <!-- and change property type in mail to sent -->
                <router-link exact to="/email-app">
                    <button class="mail-btn-sent"
                        v-on:click="savetostorage"
                        >Send Replay 
                    </button>
                </router-link>
            </main>
        </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    methods: {
        savetostorage(){
            this.mail.subject = 'RE:' + this.mail.subject
            emailService.saveMail(this.mail);
            emailService.addMail(this.mail)
        },
        
        resizeArea(){
            this.$refs.textAreaRef.style.height = "5px";
            this.$refs.textAreaRef.style.height = (this.$refs.textAreaRef.scrollHeight)+"px";
        },
    },
    computed: {
        
    },
    created() {
        const mailId = this.$route.params.mailId;
        emailService.getMailById(mailId)
            .then((serviceMail) => {
                var copy = serviceMail;
                var newMail = JSON.parse(JSON.stringify(copy))
                this.mail = newMail
            });
    },
    mounted() {

    },
    components: {
        // emailService
    }
}