<template>
    <v-container>
        <v-row>
            <v-col>
                <l-map style="height: 300px" :zoom="zoom" :center="center">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                    <l-marker v-for="cam in allCams"
                              :lat-lng="[cam.latitude, cam.longitude]"
                              :key="cam.id"/>
                </l-map>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Cameras 3</v-card-title>
                    <v-data-table :headers="headers" :items="groupedCams.three"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Cameras 5</v-card-title>
                    <v-data-table :headers="headers" :items="groupedCams.five"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Cameras 3 & 5</v-card-title>
                    <v-data-table :headers="headers" :items="groupedCams.threeAndFive"/>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Cameras remaining</v-card-title>
                    <v-data-table :headers="headers" :items="groupedCams.remaining"/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

// Fix for missing leaflet marker icons
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'Home',
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    data: () => ({
        headers: [
            {
                text: "ID",
                value: "id"
            },
            {
                text: "Name",
                value: "camera"
            },
            {
                text: "Latitude",
                value: "latitude"
            },
            {
                text: "Longitude",
                value: "longitude"
            }
        ],
        allCams: [],
        groupedCams: {
            three: [],
            five: [],
            threeAndFive: [],
            remaining: []
        },
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 10,
        center: [52.1, 5.1],
        markerLatLng: [51.504, -0.159]
    }),
    created() {
        axios.get("http://localhost:3000")
            .then(res => {
                this.allCams = res.data
                res.data.forEach(cam => {
                    if (cam.id % 3 === 0 && cam.id % 5 === 0) {
                        this.groupedCams.threeAndFive.push(cam)
                    } else if (cam.id % 3 === 0) {
                        this.groupedCams.three.push(cam)
                    } else if (cam.id % 5 === 0) {
                        this.groupedCams.five.push(cam)
                    } else {
                        this.groupedCams.remaining.push(cam)
                    }
                })
            })
    }
}
</script>
