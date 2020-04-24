<template lang="pug">
  #app
    h1 Ubiquiti Product Name Generator
    .name.my-5 {{name}}
    .btn.btn-large.btn-primary.my-5(@click="newName") Hit Me
    .gh-buttons
      gh-btns-star(slug="jonbloom/ubiquiti-name-generator" show-count)
      gh-btns-watch(slug="jonbloom/ubiquiti-name-generator" show-count)
      
</template>

<script>

import random from 'random';
import parts from './assets/parts.json'


export default {
  name: 'App',
  data() {
    return {
      name: '',
      parts,
    }
  },
  methods: {
    newName() {
      const productLine = this.parts.productLines[random.int(0, this.parts.productLines.length-1)];
      const prefix = this.parts.prefixes[random.int(0, this.parts.prefixes.length-1)];
      const product = this.parts.products[random.int(0, this.parts.products.length-1)];
      const suffix = this.parts.suffixes[random.int(0, this.parts.suffixes.length-1)];

      const includePrefix = random.boolean();
      const includeSuffix = random.boolean();

      this.name = `${productLine} ${includePrefix ? prefix : ''} ${product} ${includeSuffix ? suffix: ''}`;
      this.$gtag.event('click', {
        'event_label': 'newName',
        'value': this.name,
      });
    }
  },
  created() {
    this.newName();
    this.$gtag.pageview({
      page_path: '/',
    });
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  padding: 25% 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: column nowrap;
  text-align: center;
  font-size: 3vh;

}
</style>
