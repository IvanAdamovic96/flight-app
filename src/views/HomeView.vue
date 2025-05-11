<script setup lang="ts">
import type { ActorModel } from '@/models/actor.model';
import type { DirectorModel } from '@/models/director.model';
import type { FlightModel } from '@/models/flight.model';
import type { GenreModel } from '@/models/genre.model';
import type { MovieModel } from '@/models/movie.model';
import type { SearchModel } from '@/models/search.model';
import { FlightService } from '@/services/flight.service';
import { MovieService } from '@/services/movie.service';
import type { RefSymbol } from '@vue/reactivity';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


/* const movies = ref<MovieModel[]>();
const actors = ref<ActorModel[]>()
const genres = ref<GenreModel[]>()
const directors = ref<DirectorModel[]>()
const search = ref<SearchModel>({
    actor: 0,
    genre: 0,
    director: 0
}) */

const flights = ref<FlightModel[]>();
const savedFlights = ref<FlightModel[]>();
const user = ref();

/* FlightService.getAllFlights()
    .then(rsp => flights.value = rsp.data); */


/* MovieService.getActors()
    .then(response => actors.value = response.data)

MovieService.getGenres()
    .then(response => genres.value = response.data)

MovieService.getDirectores()
    .then(response => directors.value = response.data)



function loadMovies() {
    MovieService.getMovies(search.value)
        .then(response => movies.value = response.data)
}


loadMovies() */

function loadData(page = 0) {
    FlightService.getAllFlights(page, 5)
        .then(rsp => {
            flights.value = rsp.data
        })
    console.log(flights)
}

loadData()

function saveFlight(flight: FlightModel) {
    console.log(flight)
    /* BackendService.saveFlight(flight.id)
      .then(rsp => {
        if (rsp.status === 200) {
          alert("Successfuly saved flight")
          router.push('/saved')
          return
        }
  
        alert("Something went wrong...")
        localStorage.clear()
        router.push('/login')
      })
      .catch(e => {
        alert(e.message)
        localStorage.clear()
        router.push('/login')
      }) */
}
function loadFirst() {
    if (flights.value.first) return
    loadData()
}

function loadPrev() {
    if (flights.value.first) return
    loadData(flights.value.number - 1)
}

function loadNext() {
    if (flights.value.last) return;
    loadData(flights.value.number + 1)
}

function loadLast() {
    if (flights.value.last) return;
    loadData(flights.value.totalPages - 1)
}

const router = useRouter();
function showDetails(id: number) {
    router.push('/flight/' + id)
}

function isSaved(flight: FlightModel) {
    if (savedFlights.value) {
        for (const flt in savedFlights.value) {
            const fltAny = flt as any
            if (fltAny.id === flight.id) return true
        }
        const flitered = savedFlights.value.filter((fl: FlightModel) => fl.id === flight.id)
        return flitered.length > 0
    }
    return false
}

</script>

<template>
    <h1>All available flights</h1>
    <!-- Filters -->
    <!-- <div class="row">
        <div class="col-12 col-md-4 mb-3" v-if="actors">
            <select class="form-select" v-model="search.actor" @change="loadMovies">
                <option :value="0">Choose an actor/actress:</option>
                <option v-for="a of actors" :value="a.actorId" selected>{{ a.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="genres">
            <select class="form-select" v-model="search.genre" @change="loadMovies">
                <option :value="0">Choose genre:</option>
                <option v-for="g of genres" :value="g.genreId" selected>{{ g.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="directors">
            <select class="form-select" v-model="search.director" @change="loadMovies">
                <option :value="0">Choose director:</option>
                <option v-for="d of directors" :value="d.directorId" selected>{{ d.name }}</option>
            </select>
        </div>
    </div> -->
    <!-- / -->

    <!-- <div class="card-holder" v-if="movies && movies.length > 0">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ m.director.name }}</h6>
                <p class="card-text">
                    {{ m.shortDescription }}
                </p>
            </div>
            <div class="card-footer">
                <RouterLink :to="`/movie/${m.shortUrl}`" class="btn btn-sm btn-info">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="text-center" v-else-if="movies">
        No movies
    </div>
    <div class="text-center" v-else="">
        Loading movies...
    </div> -->

    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">FLIGHT NUMBER</th>
                <th scope="col">DESTINATION</th>
                <th scope="col">AIRPLANE MODEL</th>
                <th scope="col">TYPE</th>
                <th scope="col">SCHEDULED AT</th>
                <th scope="col">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="flight in flights">
                <th scope="row">{{ flight.id }}</th>
                <td>{{ flight.flightNumber }}</td>
                <td>{{ flight.destination }}</td>
                <td>{{ flight.plane }}</td>
                <td>{{ flight.gate }}</td>
                <!-- <td>{{ flight.type.name }}</td> -->
                <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-primary btn-sm"
                            @click="(e) => showDetails(flight.id)"><i class="fa-solid fa-circle-info"></i></button>
                        <button type="button" class="btn btn-outline-success btn-sm" v-if="/* user && */ !isSaved(flight)"
                            @click="(e) => saveFlight(flight)">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" v-if="/* user && */ isSaved(flight)"
                            @click="(e) => saveFlight(flight)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-center">
        <ul class="pagination">
            <li class="page-item">
                <button class="page-link" type="button" @click="(e) => loadFirst()">First</button>
            </li>
            <li class="page-item">
                <button class="page-link" type="button" @click="(e) => loadPrev()">Prev</button>
            </li>
            <li class="page-item" aria-current="page">
                <p class="page-link" href="#">{{ flights.number + 1 }}</p>
            </li>
            <li class="page-item">
                <button class="page-link" type="button" @click="(e) => loadNext()">Next</button>
            </li>
            <li class="page-item">
                <button class="page-link" type="button" @click="(e) => loadLast()">Last</button>
            </li>
        </ul>
    </div>
    <!-- <div class="card-holder" v-if="flights && flights.length > 0">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ m.director.name }}</h6>
                <p class="card-text">
                    {{ m.shortDescription }}
                </p>
            </div>
            <div class="card-footer">
                <RouterLink :to="`/movie/${m.shortUrl}`" class="btn btn-sm btn-info">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="text-center" v-else-if="movies">
        No movies
    </div>
    <div class="text-center" v-else="">
        Loading movies...
    </div> -->

    <!-- <p>Unos korisnika: </p>
    <pre>{{ search }}</pre>
    <label for="title">Enter title: </label>
    <input id="title" type="text" v-model="search.title" />
    <label for="actor">Enter actor: </label>
    <input id="actor" type="text" v-model="search.actor" />

    <p v-if="search.title !== ''">Pretraga naslova: {{ search.title }}</p>
    <p v-else>Niste uneli nista u polje pretrage naslova</p>
    <p v-if="search.actor !== ''">Pretraga glumca: {{ search.actor }}</p>
    <p v-else>Niste uneli nista u polje pretrage glumca</p> -->

</template>

<style>
.card-holder {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.movie-card {
    width: 18rem;
    min-height: 200px;
}
</style>