import keepService from '../apps/keep/services/keep-service.js';

import noteAdd from '../apps/keep/cmps/note-add.cmp.js';

import notesShow from '../apps/keep/cmps/notes-show.cmp.js';
import notesFilter from '../apps/keep/cmps/notes-filter-cmp.js';

export default {
    template: `
        <section>
            <main> 
                <note-add 
                    v-on:addNote="pushNewNote"
                    v-on:clearNotes="clearAll"
                ></note-add>

                <notes-Filter
                    v-on:filtered="setFilter"   
                ></notes-Filter>

                <notes-show 
                    v-bind:notes="notesToShow" 
                    v-on:selected="selectNote"
                    v-on:onDeleteNote="deleteNote"
                    v-on:onSavetostorage="savetostorage"
                ></notes-show>
            </main>
        </section>
    `,
    data() {
        return {
            notes: [],
            selectedNote: null,
            filterBy: {
                title: '',
            }
        }
    },
    methods: {
        pushNewNote(newNote) {
            // debugger
            keepService.addNote(newNote)
                .then(ServiceNotes => this.notes = ServiceNotes)
        },
        selectNote(currNote) {
            // this.selectedNote = currNote;
        },
        deleteNote(noteId){
            keepService.deleteNote(noteId)
        },
        clearAll(){
            keepService.clearAll()
            .then(emptyNotes =>{
                this.notes = emptyNotes
           })
        },
        savetostorage(currNote){
            keepService.saveNewNote(currNote);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    computed: {
        notesToShow(){
            // return this.notes;
            return this.notes.filter(note => {
               if(note.title){
                   var noteTitle = note.title.toLowerCase();
                   var filterTitle = this.filterBy.title.toLowerCase();
                   
                   var isTitleOk = noteTitle.includes(filterTitle)
                   
                   if (isTitleOk) {
                       return true
                    } else {
                        return false
                    }
                }else{
                    return true;
                }
            })
        }
    },
    created() {
        keepService.getNotes()
        .then(ServiceNotes =>{
             this.notes = ServiceNotes
        })
    },
    mounted() {

    },
    components: {
        noteAdd,
        notesShow,
        notesFilter,
    }
}