import { elements, renderSongs } from "./ui.js";
const url =
    "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR";
const options = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': 'd72c9fa92fmshc2e8f31f442b0eep1d7aa8jsn56f989d4072c',
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
};

export class API {
    constructor() {
        this.songs = [];
    }

    async getPopular() {
        const res = await fetch(url, options);
        const data = await res.json();

        this.songs = data.tracks;

        renderSongs(this.songs);
    }

    // search method

    async searchMusic(query) {
        try {
            elements.loader.classList.toggle("active");
            elements.list.innerHTML = " ";
            const res = await fetch(
                `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
                options
            );

            const data = await res.json();
            //convert data
            const newData = data.tracks.hits.map((song) => ({ ...song.track }));

            this.songs = newData;

            //render searched songs
            elements.loader.classList.toggle("active");
            renderSongs(this.songs);

            console.log(newData);
        } catch (error) {
            console.error(error);
        }
    }
}