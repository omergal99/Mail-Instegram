import { eventBus, EVENT_TOGGLE_SEARCH } from '../../../event-bus.js';

export default {
    template: `
        <section class="notes-filter"
            v-if="isFilterOpen">
            
            <label style="display: inline-block; font-family: merienda-font, arial; font-weight: bold;"
                >Search Title:
            </label>
            <input class="filter-input" type="text" placeholder="Find Title" 
                v-on:keyup.enter="emitFilter" 
                v-model="filterBy.title">
            <button class="filter-btn" title="Search"
                v-on:click="emitFilter">🍭
            </button>
            
             
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
            },
            isFilterOpen: false,
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    },
    created() {
        eventBus.$on(EVENT_TOGGLE_SEARCH, ()=>{
            this.isFilterOpen = !this.isFilterOpen
        })
    },
    destroyed() {
        eventBus.$off(EVENT_TOGGLE_SEARCH);
    },
}