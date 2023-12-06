<template>
  <div>
    <md-table v-model="devices" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        <md-table-cell md-label="Last Position">{{
          item.lastPosition
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import ax from "../../services/axios.service.js";
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    userDevices: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: [],
      devices: [
        {
          id: 1,
          name: "Dakota Rice",
          status: "Active",
          lastPosition: "Lat: 37.7789999, Long: -122.4018465",
        },
      ],
    };
  },
  mounted() {
    ax.get("/v1/users/devices").then((res) => {
      this.devices = res.data.map((device) => {
        return {
          id: device.id,
          name: device.name,
          status: device.status,
          lastPosition: `Lat: ${device.timeVariantData.latitude}, Long: ${device.timeVariantData.longitude}`,
        };
      });
    });
  },
};
</script>
