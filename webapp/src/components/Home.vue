<template>
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
</template>

<script>
import axios from "axios";

export default {
    name: 'Home',
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
        }
    }),
    created() {
        axios.get("http://localhost:3000")
            .then(res => {
                this.allCams = res.data
                res.data.forEach(cam => {
                    if (cam.id % 3 === 0 && cam.id % 5 === 0){
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
