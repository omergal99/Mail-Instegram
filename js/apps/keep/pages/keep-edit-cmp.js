import keepService from '../services/keep-service.js';

export default {
    template: `
        <section v-if="note">
        <h2>Welcome to edit page! yay</h2>
            <!-- Edit -->
        <div class="body-note" v-if="note.isEdit">
            <input type="text" v-model="note.title">
            <input v-if="note.txt" type="text" v-model="note.txt">
            <div class="align-left"
            v-for="(currTodo,idx) in note.todos" :key="currTodo.id">
                    <input type="text" v-model="currTodo.txt">
                    <button v-on:click="removeTodo(currTodo.id)">🗑️</button>
            </div>
        </div>

        <!-- Preview -->
        <div class="body-note" v-if="!note.isEdit">
            <div>{{note.title}}</div>
            <div>{{note.txt}}</div>
            <div class="align-left"
            v-for="(currTodo,idx) in note.todos" :key="currTodo.id">
                <div>{{currTodo.txt}}</div>
            </div>
        </div>

        <!-- btn back -->
            <button ref="back-btn" v-on:click="backGalery">Back Galery</button>
        </section>
    `,
    data() {
        return {
            note: null,
        }
    },
    methods: {
        backGalery() {
            this.$refs['back-btn'].innerHTML = 'Returning you to galery...'
            setTimeout(() => {
                this.$router.push('/keep-app')
            }, 1000)
        },
    },
    computed: {
        
    },
    created() {
        const noteId = this.$route.params.noteId;
        keepService.getNoteById(noteId)
            .then(note => this.note = note)
    },
    mounted() {

    },
    components: {
        
    }
}