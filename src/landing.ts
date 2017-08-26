import Vue from 'vue';
import VueQr from 'vue-qrcode';

export default Vue.extend({
  components: {
    qrcode: VueQr,
  },
  template: `
    <div>
      Welcome to the landing page
      <qrcode bg-color="#FA4616" fg-color="#0021A5" val="https://github.com/"></qrcode>
    </div>
  `,
});
