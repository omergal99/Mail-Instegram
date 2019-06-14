import { eventBus, SEND_NOTE_TO_MAIL } from '../../../event-bus.js';

import notePreview from './note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <!----------------------------- Star Notes ---------------------------->
        <p class="p-galery-pin">Star Notes</p>
        <ul>
            <li v-if="notes && currNote.isPin"
                v-for="(currNote, idx) in notes"
                v-bind:key="currNote.id"
                v-bind:class="{'marked-note': currNote.isPin}"
                v-on:dblclick="toggleLove(currNote)"
                class="square-note clean-list">

                <note-preview
                    v-on:click.native="$emit('selected', currNote)"
                    v-bind:note="currNote">
                </note-preview>
                
                <!-- Close -->
                <div class="container-note-ed flex space-between">
                    <button  class="btn-note-ed delete-note" title="Delete"
                        v-on:click="emitDeleteNote(currNote.id)"
                    >✗</button>

                    <!-- Color -->
                    <label class="label-pic-color" title="Pic color"
                        v-bind:for="idx" >🎨
                    </label>
                    <input class="note-color-input" type="color" value="#f7f1de" list="colors"
                        v-bind:id="idx"
                        v-on:change="changeBgNote(currNote,$event)">
                    <datalist id="colors">
                        <option>#ffef96</option>
                        <option>#eea29a</option>
                        <option>#deeaee</option>
                        <option>#b5e7a0</option>
                        <option>#d5e1df</option>
                        <option>#e6e2d3</option>
                        <option>#92a8d1</option>
                        <option>#f4e1d2</option>
                        <option>#c94c4c</option>
                        <option>#618685</option>
                    </datalist>

                    <!-- <router-link :to="'/keep-edit/' + currNote.id">
                        <button class="btn-note-ed">✍</button>
                    </router-link> -->

                    <!-- Email -->                    
                    <button class="btn-note-ed" title="Send to mail"
                        v-on:click="onSendToEmail(currNote)">
                        <img src="img/icons/email.png">
                    </button>

                    <!-- Satr -->
                    <button class="btn-note-ed" title="Satr"
                        v-if="currNote.isPin" 
                        v-on:click="togglePin(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/star.png">
                    </button>

                    <!-- Like -->
                    <button class="btn-note-ed like-on" title="Like"
                        v-if="currNote.isLove" 
                        v-on:click="toggleLove(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/like5.png">
                    </button>
                    <!-- Unlike -->
                    <button class="btn-note-ed" title="Unlike"
                        v-if="!currNote.isLove" 
                        v-on:click="toggleLove(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/like3.png">
                    </button>
                    
                    <!-- Save -->
                    <button class="btn-note-ed" title="Save"
                        v-if="currNote.isEdit"
                        v-on:click="toggleEditMode(currNote); emitSaveToStorage(currNote)">💾
                    </button>
                    <!-- Edit -->
                    <button class="btn-note-ed" title="Edit"
                        v-if="!currNote.isEdit"
                        v-on:click="toggleEditMode(currNote)">
                        <img src="img/icons/keyboard.png">
                    </button>
                </div>
            </li>
        </ul> 
        
        <!----------------------------- Other Notes --------------------------------->
        <p class="p-galery-pin">Other Notes</p>
        <ul class="wrap flex-col space-even align-center">
            <li class="square-note clean-list"
                v-if="notes && !currNote.isPin"
                v-for="(currNote, idx) in notes"
                v-bind:key="currNote.id"
                v-on:dblclick="toggleLove(currNote)"
                v-bind:class="{'marked-note': currNote.isPin}">

                <note-preview
                    v-on:click.native="$emit('selected', currNote)"
                    v-bind:note="currNote">
                </note-preview>

                <!-- Close -->
                <div class="container-note-ed flex space-between">
                    <button  class="btn-note-ed delete-note" title="Delete"
                        v-on:click="emitDeleteNote(currNote.id)">✗
                    </button>

                    <!-- Color -->
                    <label class="label-pic-color" title="Pic color"
                        v-bind:for="idx">🎨
                    </label>
                    <input class="note-color-input" type="color" value="#f7f1de" list="colors"
                        v-bind:id="idx" 
                        v-on:change="changeBgNote(currNote,$event)">
                    <datalist id="colors">
                        <option>#ffef96</option>
                        <option>#eea29a</option>
                        <option>#deeaee</option>
                        <option>#b5e7a0</option>
                        <option>#d5e1df</option>
                        <option>#e6e2d3</option>
                        <option>#92a8d1</option>
                        <option>#f4e1d2</option>
                        <option>#c94c4c</option>
                        <option>#618685</option>
                    </datalist>

                    <!-- <router-link :to="'/keep-edit/' + currNote.id">
                        <button class="btn-note-ed">✍</button>
                    </router-link> -->

                    <!-- Email -->                    
                    <button class="btn-note-ed" title="Send to mail"
                        v-on:click="onSendToEmail">
                        <img src="img/icons/email.png">
                    </button>

                    <!-- Empty Star -->
                    <button class="btn-note-ed" title="Unstar"
                        v-if="!currNote.isPin"
                        v-on:click="togglePin(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/unstar.png">
                    </button>

                    <!-- Like -->
                    <button class="btn-note-ed like-on" title="Like"
                        v-if="currNote.isLove" 
                        v-on:click="toggleLove(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/like5.png">
                    </button>
                    <!-- Unlike -->
                    <button class="btn-note-ed" title="Unlike"
                        v-if="!currNote.isLove" 
                        v-on:click="toggleLove(currNote); emitSaveToStorage(currNote)">
                        <img src="img/icons/like3.png">
                    </button>
                        
                    <!-- Save -->
                    <button class="btn-note-ed" title="Save"
                        v-if="currNote.isEdit"
                        v-on:click="toggleEditMode(currNote); emitSaveToStorage(currNote)">💾
                    </button>
                    <!-- Edit -->
                    <button class="btn-note-ed" title="Edit"
                        v-if="!currNote.isEdit"
                        v-on:click="toggleEditMode(currNote)">
                        <img src="img/icons/keyboard.png">
                    </button>
                </div>
            </li>
        </ul> 

    </section>
    `,
    data() {
        return {}
    },
    methods: {
        emitDeleteNote(noteId) {
            this.$emit('onDeleteNote', noteId)
        },
        toggleEditMode(currNote) {
            currNote.isEdit = !currNote.isEdit;
        },
        togglePin(currNote) {
            currNote.isPin = !currNote.isPin;
        },
        toggleLove(currNote) {
            currNote.isLove = !currNote.isLove;
        },
        emitSaveToStorage(currNote) {
            this.$emit('onSavetostorage', currNote)
        },
        changeBgNote(currNote,event){
            currNote.color = event.path[0].value;
            this.emitSaveToStorage(currNote);
        },
        onSendToEmail(currNote) {
            this.$router.push('/email-app');
            var toSendNote = JSON.parse(JSON.stringify(currNote));
            setTimeout(() => {
                eventBus.$emit(SEND_NOTE_TO_MAIL, toSendNote);
            }, 150);
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    components: {
        notePreview
    }
}