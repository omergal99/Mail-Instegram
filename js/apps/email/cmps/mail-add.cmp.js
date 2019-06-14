import { eventBus, SEND_NOTE_TO_MAIL } from '../../../event-bus.js';

export default {
    template: `
    <section>
        <div class="flex new-email" v-if="isClickNewMAil">
            <div>
                <button class="close-new-email btn" v-on:click="closeNewMail">Close</button>
            </div>   

            <input v-model="newMail.sentTo" type="text" placeholder="Email Adress" class="mail-input">
            <input v-model="newMail.subject" type="text" placeholder="Subject" class="mail-input">

            <textarea v-if="!mailFromNote" placeholder="Message" cols="30" rows="10" class="mail-text-area-input"
                v-model="newMail.body">
            </textarea>
            <div v-else class="mail-from-note-body">
                <div v-if="newMail.body[0]">
                <textarea class="mail-from-note-area" type="text"
                    v-model="newMail.body[0]">
                </textarea>
                </div>
                <div v-if="newMail.body[1]"
                    v-for="todo in newMail.body[1]" :key="todo.id">🔸
                    <input class="mail-from-note-input" type="text" v-model="todo.txt">
                </div>
            </div>

            <button v-on:click="emitNewMail" class="send-mail-btn btn">
                <img src="img/icons/send-button.png" class="send-icon">
            </button>
        </div>

        <button v-if="!isClickNewMAil" v-on:click="clickedNewEmail" class="compose-btn btn">Compose</button>
    </section>
    `,
    data() {
        return {
            newMail: {
                sentTo: 'Omer@misterBit.com',
                sentFrom: 'Itamar@misterBit.com',
                subject: '',
                body: '',
                isRead: false,
                sentAt: new Date().toLocaleString(),
                date: Date.now(),
                // isSent: false
            },
            isClickNewMAil: false,
            mailFromNote: null,
        }
    },
    methods: {
        emitNewMail() {
            this.mailFromNote = null;
            // this.newMail.isSent = true;
            this.$emit('addMail', { ...this.newMail })
            this.isClickNewMAil = false;
            document.body.classList.toggle('open');
            this.newMail.sentTo = 'Omer@misterBit.com';
            this.newMail.sentFrom = 'Itamar@misterBit.com';
            this.newMail.subject = '';
            this.newMail.body = '';
            this.newMail.isRead = false;
            this.newMail.sentAt = new Date().toLocaleString();
            this.newMail.date = Date.now();
            // this.newMail.isSent = false;
        },
        clickedNewEmail() {
            this.isClickNewMAil = true;
            document.body.classList.add('open');
        },
        closeNewMail() {
            this.mailFromNote = null;
            this.isClickNewMAil = false;
            document.body.classList.remove('open');
        },
        syncNoteToEmail() {
            var note = this.mailFromNote;
            this.newMail.subject = note.title;
            
            this.newMail.body = [];
            this.newMail.body.push(note.txt);
            this.newMail.body.push(note.todos);

            // newMail: {
            //     sentTo: 'Omer@misterBit.com',
            //     sentFrom: 'Itamar@misterBit.com',
            //     subject: '',
            //     body: '',
            //     isRead: false,
            //     sentAt: new Date().toLocaleString(),
            //     date: Date.now(),
            //     isSent: false
            // },
            // newNote: {
            //     title: null,
            //     txt: null,
            //     imgUrl: { src: '', isNew: false },
            //     vdoUrl: { src: '', isNew: false },
            //     adoUrl: { src: '', isNew: false },
            //     upload: null,
            //     todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
            //     isPin: true,
            //     isEdit: false,
            //     color: '',
            // },
        }
    },
    computed: { // v-bind

    },
    created() {
        eventBus.$on(SEND_NOTE_TO_MAIL, note => {
            this.mailFromNote = note;
            // console.log(note);
            this.isClickNewMAil = true;
            document.body.classList.add('open');
            this.syncNoteToEmail();
            // this.mailFromNote= null;
            // ***************************************************
        });
    },
    destroyed() {
        eventBus.$off(SEND_NOTE_TO_MAIL);
    },
    mounted() {

    },
    components: {

    }
}