import Vue from 'vue';
import { createClient } from 'contentful';

const client = createClient({
  space: '881sco8a7hxb',
  accessToken: '41354290dd34a67e7c1f04c8ef22d1be8f9bc402bec4b42bb002cc8b340b200a',
});

export default Vue.extend({
  template: `
    <div>
      <div v-if="place && !error">
        <h1>{{place.name}}</h1>

        <img v-if="place.imgSrc" :src="place.imgSrc">

        <p>
          {{place.history}}
        </p>

        <blockquote>
          {{place.story}}
        </blockquote>
      </div>

      <div v-if="error">
        Sorry, but that doesn't seem to be a place!
      </div>
    </div>
  `,
  created() {
    this.fetchData();
  },
  data() {
    return {
      error: null,
      place: null,
    };
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        const placeId = this.$route.params.id;
        const place = await client.getEntry(placeId);
        this.error = false;
        const img = await client.getAsset(place.fields.image.sys.id);
        const space = await client.getEntries({
          content_type: 'story',
          'fields.placeId.sys.id': placeId,
        });

        // Select a random story for this place
        const story = space.items[Math.floor(Math.random() * space.items.length)];
        this.place = {
          name: place.fields.name,
          image: place.fields.image,
          history: place.fields.history,
          imgSrc: img.fields.file.url,
          story: story.fields.story,
        };
      }
      catch (err) {
        this.error = true;
      }
    },
  },
});

