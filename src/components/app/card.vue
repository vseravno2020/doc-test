<template>
  <div class="card">
    <text-item
      :id="item.id"
      :key="item.name"
      :text="item.name"
      :method="METHODS_PAYLOAD[0]"
      @getData="data => albums = data"
    >
      <text-item
        v-for="album in albums"
        :id="album.id"
        :key="album.title"
        :text="album.title"
        :method="METHODS_PAYLOAD[1]"
        :is-subtitle="true"
      />
    </text-item>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import textItem from "@/components/ui/text-item.vue";
import {METHODS_PAYLOAD} from "@/utils/constans";
export default Vue.extend({
  name: 'my-card',
  components: {
    textItem,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      albums: [] as Array<string>,
      METHODS_PAYLOAD: METHODS_PAYLOAD,
    }
  },
})
</script>
