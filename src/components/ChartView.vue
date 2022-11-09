<template>
  <div class="home">
    <apexchart width="380" type="pie" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";

export default {
  name: 'ChartView',
  setup() {
    const options = ref({});
    const series = ref([44, 55, 41, 17]);

    onMounted(async () => {

      var response = await fetch("/api/inventory/aggregate/groupby");

      if (response.ok) {
        var itemType = await response.json();

        series.value = itemType.map(a => a.count);
        options.value = { labels: itemType.map(a => a._id) };
      }
    });

    return {
      options, series
    }
  }
}
</script>
