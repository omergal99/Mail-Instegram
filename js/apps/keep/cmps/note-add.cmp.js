import { eventBus, EVENT_TOGGLE_SEARCH } from '../../../event-bus.js';

export default {
    template: `
    <section>
        <div class="add-new-note-section flex wrap align-center">

            <input class="new-note-main" ref="mainInput"  type="text" placeholder="Add title"
                v-on:keyup.enter="emitNewNote(); cleanPost();" 
                v-model="newNote.title">

            <button v-bind:class="{ active: typeChoose === 'text' }" title="Text area"
                v-on:click="changeType('text')">
                <img src="img/icons/Tfont2.png">
            </button>

            <button v-bind:class="{ active: typeChoose === 'todo' }" title="Todo"
                v-on:click="changeType('todo')"><img src="img/icons/todo.png">
            </button>

            <button v-bind:class="{ active: typeChoose === 'imgUrl' }" title="Image URL"
                v-on:click="changeType('imgUrl')"><img src="img/icons/image.png">
            </button>

            <button v-bind:class="{ active: typeChoose === 'videoUrl' }" title="Video URL"
                v-on:click="changeType('videoUrl')"><img src="img/icons/video-player.png">
            </button>

            <button v-bind:class="{ active: typeChoose === 'audioUrl' }" title="Audio URL"
            v-on:click="changeType('audioUrl')"><img src="img/icons/music-player.png">
            </button>

            <!-- <button v-bind:class="{ active: typeChoose === 'upload' }" title="Upload"
                v-on:click="changeType('upload')">
                    <img src="img/icons/cloud.png">
            </button> -->

            <!-- <button v-on:click="cleanPost">🔥</button> -->
        </div>

        <textarea class="new-note-text-area" placeholder="Add text"
            v-if="typeChoose === 'text'" 
            v-model="newNote.txt">
        </textarea>

        <input class="new-note-input" type="text" placeholder="Add Image URL"
            v-on:keyup.enter="emitNewNote(); cleanPost();" 
            v-if="typeChoose === 'imgUrl'" 
            v-model="newNote.imgUrl.src">

        <input class="new-note-input" type="text" placeholder="Add Video URL"
            v-on:keyup.enter="emitNewNote(); cleanPost();" 
            v-if="typeChoose === 'videoUrl'"
            v-model="newNote.vdoUrl.src">

        <input class="new-note-input" type="text" placeholder="Add Audio URL"
            v-on:keyup.enter="emitNewNote(); cleanPost();" 
            v-if="typeChoose === 'audioUrl'" 
            v-model="newNote.adoUrl.src">
        
        <div v-if="typeChoose === 'todo'">
            <div ref="lines-todo" 
                v-for="currTodo in newNote.todos" :key="currTodo.id">
                <div>
                <input class="new-note-input" type="text" placeholder="Write Todo"
                    v-on:keyup.enter="emitNewNote(); cleanPost();" 
                    v-model="currTodo.txt">
                <button class="new-note-remove-btn" title="Delete"
                    v-on:click="removeTodo(currTodo.id)">🗑️
                </button>
                </div>
            </div>
            <button class="new-note-add-todo" title="Add Todo"
                v-on:click="makeNewTodo">Add todo
            </button>
        </div>

        <label class="custom-upload-note-file" title="Upload file"
            v-if="typeChoose === 'upload'" 
            for="upload-note-file">Upload File ☁
        </label>
        <input id="upload-note-file" class="upload-note-file" multiple type="file"/>

        <div class="flex wrap align-center space-even">
            <button class="new-note-add-btn" title="Add note"
                v-on:click="emitNewNote(); cleanPost();">ADD NOTE
                <span style="font-size: 0.8em;">&nbsp;(Enter)</span>
            </button>

            <!-- filter button -->
            <button v-bind:class="toggleSearchBtn" title="Search notes"
                v-on:click="onFilterClicked">{{toggleSearchName}}🍭
            </button>

            <!-- <button class="new-note-clear-btn" title="Delete All Notes!"
                v-on:click="emitClearAllNotes">Delete All !!
            </button> -->
        </div>

    </section>
    `,
    data() {
        return {
            newNote: {
                title: null,
                txt: null,
                imgUrl: { src: '', isNew: false },
                vdoUrl: { src: '', isNew: false },
                adoUrl: { src: '', isNew: false },
                upload: null,
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: true,
                isLove: false,
                isEdit: false,
                color: '',
            },
            typeChoose: '',
            todosIdCounter: 2,
            toggleSearchName: 'Search ',
            toggleSearchBtn: 'filter-open',
            window: {
                width: 0,
                height: 0
            },
        }
    },
    methods: {
        emitNewNote() {

            this.checkForTodos();

            var copy = this.newNote;
            var newNote = JSON.parse(JSON.stringify(copy));
            this.$emit('addNote', newNote);

            this.newNote.todos = [{ id: 0, txt: '' }, { id: 1, txt: '' }];
        },
        emitClearAllNotes() {
            this.$emit('clearNotes')
        },
        changeType(newType) {
            if (newType === this.typeChoose) {
                this.typeChoose = '';
            } else {
                this.typeChoose = newType;
            }
        },
        makeNewTodo() {
            var toPush = { id: this.todosIdCounter, txt: '' }
            this.newNote.todos.push(toPush);
            this.todosIdCounter = this.todosIdCounter + 1;
        },
        removeTodo(todoId) {
            var todoIdx = this.newNote.todos.findIndex(function (todo) {
                return todoId === todo.id
            })
            this.newNote.todos.splice(todoIdx, 1);
        },
        cleanPost() {
            this.newNote = {
                title: null,
                txt: null,
                imgUrl: { src: '', isNew: false },
                vdoUrl: { src: '', isNew: false },
                adoUrl: { src: '', isNew: false },
                upload: null,
                todos: [{ id: 0, txt: '' }, { id: 1, txt: '' }],
                isPin: true,
                isLove: false,
                isEdit: false,
                color: '',
            }
            this.typeChoose = '';
        },
        checkForTodos() {
            var text = '';
            this.newNote.todos.forEach(todo => {
                if (todo.txt.length) {
                    text += todo.txt;
                }
            })
            if (text.length === 0) {
                this.newNote.todos = [];
            }
        },
        onFilterClicked() {
            eventBus.$emit(EVENT_TOGGLE_SEARCH);

            if (this.toggleSearchName === 'Search ') {
                this.toggleSearchName = 'Close ';
            } else {
                this.toggleSearchName = 'Search ';
            }

            if (this.toggleSearchBtn === 'filter-open') {
                this.toggleSearchBtn = 'filter-close';
            } else {
                this.toggleSearchBtn = 'filter-open';
            }
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
    },
    computed: {
        addTitle() {

        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted() {
        this.handleResize();
        if (this.window.width > 500) {
            this.$refs.mainInput.focus();
        }
    },
    components: {

    }
}

// Select img to upload
function onFileInputChange(ev) {
    handleImageFromUpload(ev, renderCanvasGallery);
    moveToEdit();
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromUpload(ev, onImageReady) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        // img.onload = onImageReady.bind(null, img);
        img.onload = function () {
            // console.log('how fun')
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}