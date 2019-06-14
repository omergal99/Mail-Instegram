export default {
    template:`
        <section>
            <select v-on:change="emitFilter($event)" v-model="selectedFilter" class="mail-input">
                <option value="dateDown">Date ⇩</option>
                <option value="dateUP">Date ⇧</option>
                <option value="subjectUp">A - Z</option>
                <option value="subjectDown">Z - A</option>
            </select>
            Search <input type="text" placeholder="By subject" v-on:keyup="emitSearch" v-model="filter.subject" class="mail-input">
            <!-- <button v-on:click="emitSearch">Sort by date</button> -->
        </section>
    `,
    data() {
        return {
            filter: {
                subject: '',
                date: Date.now(),
            },
            selectedFilter: 'dateDown'
        }
    },
    methods: {
        emitSearch(event) {
            // console.log('search', this.filter);
            this.$emit('searched', {...this.filter})
        },
        emitFilter(event) {
            // console.log("selectedFilter: ", this.selectedFilter)
            this.$emit('filterBy', this.selectedFilter)
        }
    }
}