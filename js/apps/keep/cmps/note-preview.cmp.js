export default {
    props: ['note'],
    template: `
    <section>

        <!------------------ Edit ------------------>
        <div class="body-note" 
        v-if="note.isEdit"
        v-bind:style= "[ note.color ? { backgroundColor: note.color } : {}]">

            <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label>
            <input type="text" v-model="note.title" class="note-title-edit">

            <textarea 
            v-if="note.txt" 
            ref="textAreaRef"
            v-on:keyup="resizeArea"
            v-model="note.txt" 
            class="note-area-edit" type="text"></textarea>

            <!-- Image -->
            <div class="flex wrap space-between" 
                    v-if="note.imgUrl.src || note.imgUrl.isNew">
                <input class="note-url-edit" type="text" placeholder="Image URL"
                    v-model="note.imgUrl.src">
                <button class="note-btn-remove"
                    v-on:click="removeImgUrl()">🗑️</button>
            </div>
            <img class="note-edit-img"
                v-if="note.imgUrl.src"
                v-bind:src="note.imgUrl.src"
            >

            <!-- Video -->
            <div class="flex wrap space-between"
                v-if="note.vdoUrl.src || note.vdoUrl.isNew">
                <input class="note-url-edit" type="text" placeholder="Video URL"
                    v-model="note.vdoUrl.src">
                <button class="note-btn-remove" 
                    v-on:click="removeViedoUrl()">🗑️</button>
            </div>
            <iframe class="note-edit-video"
                v-if="note.vdoUrl.src"
                v-bind:src="note.vdoUrl.src">
            </iframe>

            <!-- Audio -->
            <div class="flex wrap space-between"
                v-if="note.adoUrl.src || note.adoUrl.isNew">
                <input class="note-url-edit" type="text" placeholder="Audio URL"
                    v-model="note.adoUrl.src">
                <button class="note-btn-remove"
                    v-on:click="removeAudioUrl()">🗑️</button>
            </div>
            <audio class="note-edit-audio" controls 
                v-if="note.adoUrl.src"
                v-bind:src="note.adoUrl.src">
            </audio>

            <!-- Todos -->
            <div
                v-for="(currTodo,idx) in note.todos"
                :key="currTodo.id"
                class="flex wrap space-between">
                <input class="note-todo-edit" type="text" v-model="currTodo.txt" placeholder="Write Todo">
                <button class="note-btn-remove" v-on:click="removeTodo(currTodo.id)">🗑️</button>
            </div>

            <!-- Add btn section -->
            <button class="note-btn-add" 
                v-on:click="makeNewTodo">Todo
            </button>

            <button class="note-btn-add" 
                v-if="!note.imgUrl.src && !note.imgUrl.isNew" 
                v-on:click="makeNewImgUrl">Image
            </button>

            <button class="note-btn-add" 
                v-if="!note.vdoUrl.src && !note.vdoUrl.isNew" 
                v-on:click="makeNewVideoUrl">Video
            </button>

            <button class="note-btn-add" 
                v-if="!note.adoUrl.src && !note.adoUrl.isNew" 
                v-on:click="makeNewAudioUrl">Audio
            </button>

        </div>

        <!------------------ Preview ------------------>
        <div class="body-note" 
            v-if="!note.isEdit"
            v-bind:style= "[ note.color ? { backgroundColor: note.color } : {}]">

            <div class="title">
                <!-- <label style="display: inline-block; float:left; margin-top: 3px;">Title:</label> -->
                <h4 style="display: inline-block">{{note.title}}</h4>
            </div>

            <pre v-if="note.txt" class="note-area-show align-left text-wrap">{{note.txt}}</pre>

            <!-- Image -->
            <img class="note-preview-img"
                v-if="note.imgUrl.src"
                v-bind:src="note.imgUrl.src"
            >

            <!-- Video -->
            <iframe class="note-preview-video"
                v-if="note.vdoUrl.src"
                v-bind:src="note.vdoUrl.src">
            </iframe>

            <!-- Audio -->      
            <audio class="note-preview-audio" controls 
                v-if="note.adoUrl.src"
                v-bind:src="note.adoUrl.src">
            </audio>

            <!-- Todos -->
            <div v-if="currTodo.txt"
            v-for="(currTodo,idx) in note.todos" 
            :key="currTodo.id"
            class="align-left"> 
                <div>🔸{{currTodo.txt}}</div>
            </div>
        </div>

    </section>
        `,
    data() {
        return {
            todosIdCounter: 2,
        }
    },
    methods: {
        removeTodo(todoId) {
            var todoIdx = this.note.todos.findIndex(function (todo) {
                return todoId === todo.id
            })
            this.note.todos.splice(todoIdx, 1);
        },
        removeImgUrl() {
            this.note.imgUrl.isNew = false;
            this.note.imgUrl.src = '';
        },
        removeViedoUrl() {
            this.note.vdoUrl.isNew = false;
            this.note.vdoUrl.src = '';
        },
        removeAudioUrl() {
            this.note.adoUrl.isNew = false;
            this.note.adoUrl.src = '';
        },
        makeNewTodo() {
            var toPush = {
                id: this.todosIdCounter + this.todosIdCounter + 1000,
                txt: ''
            }
            this.note.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        makeNewImgUrl() {
            this.note.imgUrl.isNew = true;
        },
        makeNewVideoUrl() {
            this.note.vdoUrl.isNew = true;
        },
        makeNewAudioUrl() {
            this.note.adoUrl.isNew = true;
        },
        resizeArea() {
            this.$refs.textAreaRef.style.height = "5px";
            this.$refs.textAreaRef.style.height = (this.$refs.textAreaRef.scrollHeight) + "px";
        }
    },

    computed: {

    },
    created() {

    },
}