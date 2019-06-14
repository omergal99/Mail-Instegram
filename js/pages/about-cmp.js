import storgeService from '../services/storage-service.js';
import utilService from '../services/util-service.js';

export default {
    template: `
        <section class="about-page">
            <header>
                <h1>About Us</h1>
            </header>
            <main>

                <label class="about-p">Hello&nbsp; there!
                </label>
                <p class="about-p"> We want to tell you that this font style is awesome 🤩
                </p>
                <label class="about-p">But!&nbsp;&nbsp;The weight of it is too large ⚓🙄
                </label>

                <div class="about-img-div">
                    <img src="img/backgrounds/Itamar and I.jpg">
                </div>
                    <router-link exact to="/">Back Home</router-link>
            </main>
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