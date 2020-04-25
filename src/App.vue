<template lang="pug">
  #app
    
    h1 Ubiquiti Product Name Generator
    .name.my-5 {{name}}
    .btn.btn-large.btn-primary.my-2(@click="newName") Hit Me
    .last-names
      .name(v-for="name in reversedNames") {{name.name}}
    .gh-buttons
      gh-btns-star(slug="jonbloom/ubiquiti-name-generator" show-count)
      gh-btns-watch(slug="jonbloom/ubiquiti-name-generator" show-count)
      
</template>

<script>

import random from 'random';
import parts from './assets/parts.json';
import { db } from './services/db';
import firebase from 'firebase/app';


export default {
  name: 'App',
  data() {
    return {
      name: '',
      parts,
      fbNames: [],
    }
  },
  methods: {
    async newName() {
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
      await db.collection('names').add({
        name: this.name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  },
  created() {
    this.newName();
    this.$gtag.pageview({
      page_path: '/',
    });
  },
  firestore: {
    fbNames: db.collection('names').orderBy('createdAt', 'desc').limit(5),
  },
  computed: {
    reversedNames() {
      return this.fbNames//.slice().reverse().slice(0,9)
    }
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

.last-names {
  @for $i from 1 to 6 {
    .name:nth-child(#{$i}) {
      opacity: 1 - (.15 * $i);
    }
  }
}
</style>
