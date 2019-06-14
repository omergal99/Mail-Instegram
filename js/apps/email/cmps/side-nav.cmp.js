export default {
    template: `
        <section class="side-nav">
            <div class="side-bar-element" v-on:click="$emit('filterEmails', 0)">Inbox (<span>5</span>)</div>
            <div class="side-bar-element" v-on:click="$emit('filterEmails', 2)">Unread (<span>5</span>)</div>
            <div class="side-bar-element" v-on:click="$emit('filterEmails', 1)">Read (<span>9</span>)</div>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {
    },
    mounted() {
        
    },
    components: {

    }
}