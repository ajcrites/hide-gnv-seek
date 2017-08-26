import Vue from 'vue';
import VueQr from 'vue-qrcode';

export default Vue.extend({
  components: {
    qrcode: VueQr,
  },
  data() {
    return {
      lastPlace: null,
    };
  },
  created() {
    this.lastPlace = this.$root.$data.lastPlace;
  },
  template: `
    <div>
      Welcome to the landing page
      <qrcode bg-color="#FA4616" fg-color="#0021A5" val="http://hide-gnv-seek.s3-website.us-east-2.amazonaws.com/#/place/2AxmrpUAlCW8UukOSUOSwu"></qrcode>

      Last Place: {{lastPlace}}
      <a href="#/hint">Get Hunting</a>
    </div>
  `,
});
