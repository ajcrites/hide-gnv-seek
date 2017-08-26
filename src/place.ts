import Vue from 'vue';
import { createClient } from 'contentful';

import { get, sample } from 'lodash';

import StoryEntry from './story-entry';

const client = createClient({
  space: '881sco8a7hxb',
  accessToken: '41354290dd34a67e7c1f04c8ef22d1be8f9bc402bec4b42bb002cc8b340b200a',
});

export default Vue.extend({
  components: {
    'story-entry': StoryEntry,
  },
  template: `
    <div>
      <div v-if="place && !error">
        <h1>{{place.name}}</h1>

        <img v-if="place.imgSrc" :src="place.imgSrc">

        <p>
          {{place.history}}
        </p>

        <div v-if="place.partner">
          Please see our partner,
          <router-link :to="'/place/' + place.partner.id">
            {{place.partner.name}}
          </router-link>
        </div>

        <blockquote>
          {{place.story}}
        </blockquote>

        <hr>

        <story-entry :placeId="place.id"></story-entry>
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
        let img = null;
        if (place.fields.image) {
          img = await client.getAsset(place.fields.image.sys.id);
        }
        const space = await client.getEntries({
          content_type: 'story',
          'fields.placeId.sys.id': placeId,
        });
        const partnerId = sample(place.fields.partners);
        let partner;
        if (partnerId) {
          partner = await client.getEntry(partnerId.sys.id);
          partner = {
            name: partner.fields.name,
            id: partnerId.sys.id,
          };
        }

        // Select a random story for this place
        const story = sample(space.items);
        this.place = {
          id: place,
          name: place.fields.name,
          image: place.fields.image,
          history: place.fields.history,
          imgSrc: get(img, 'fields.file.url'),
          story: get(story, 'fields.story'),
          partner
        };
        this.$root.$data.lastPlace = this.place.name;
      }
      catch (err) {
        console.warn(err);
        this.error = true;
      }
    },
  },
});

