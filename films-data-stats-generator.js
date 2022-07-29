import { FilmsAPIService } from "./films-api-service.js";
import moment from "moment";


export class FilmsDataStatsGenerator {

    constructor(filmsApiService) {
        this.filmsApiService = filmsApiService;
    }

    /**
     * Retrieves the name of the best rated film that was directed by the director with the given name.
     * If there are no films directed the the given director, this method should return null.
     * Note there will only be one film with the best rating.
    */
    async getBestRatedFilm(directorName) {
        //TODO Implement...
        try {
            const films = await this.filmsApiService.getFilms();
            const bestRating = Math.max(...films.filter((obj) => obj.directorName === directorName).map((obj) => obj.rating));
            const bestRatedFilm = films.filter((obj) => obj.rating === bestRating && obj.directorName === directorName);
            
            if (bestRatedFilm.length === 0) {
                return null;
            } else {
                return bestRatedFilm[0].name;
            }            
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Retrieves the name of the director who has directed the most films in the CodeScreen Film service.
    */
   async getDirectorWithMostFilms() {
        //TODO Implement...
        try {
            const films = await this.filmsApiService.getFilms();
            const numberOfFilms = {};
            films.forEach((obj) => {
                obj.directorName in numberOfFilms ? numberOfFilms[obj.directorName]++ : numberOfFilms[obj.directorName] = 1;
            });
            const mostFilms = Math.max(...Object.values(numberOfFilms));
            const director = Object.keys(numberOfFilms).find((key) => numberOfFilms[key] === mostFilms);

            return director;
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Retrieves the average rating for the films directed by the given director, rounded to 1 decimal place.
     * If there are no films directed by the given director, this method should return null.
    */
   async getAverageRating(directorName) {
        //TODO Implement...
        try {
            const films = await this.filmsApiService.getFilms();
            const filmsByDirector = films.filter((obj) => obj.directorName === directorName);

            if (filmsByDirector.length === 0) {
                return null;
            }

            let avgRating = filmsByDirector.map((obj) => obj.rating)
                                            .reduce((prev, curr) =>  {
                                                    return prev + curr;
                                                 }, 0)/filmsByDirector.length;
            avgRating = Math.round(avgRating * 10)/10;
            
            return avgRating;
            
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Retrieves the shortest number of days between any two film releases directed by the given director.

     * If there are no films directed the the given director, this method should return null.
     * If there is only one film directed by the given director, return 0.
     * Note that no director released more than one film on any given day.
     *
     * For example, if the service returns the following 3 films,
     *
     * {
     *    "name": "Batman Begins",
     *    "length": 140,
     *
     *    "rating": 8.2,
     *    "releaseDate": "2006-06-16",
     *    "directorName": "Christopher Nolan"
     * },
     * {
     *    "name": "Interstellar",
     *    "length": 169,
     *    "rating": 8.6,
     *    "releaseDate": "2014-11-07",
     *    "directorName": "Christopher Nolan"
     * },
     * {
     *   "name": "Prestige",
     *   "length": 130,
     *   "rating": 8.5,
     *   "releaseDate": "2006-11-10",
     *   "directorName": "Christopher Nolan"
     * }
     *
     * then this method should return 147 for Christopher Nolan, as Prestige was released 147 days after Batman Begins.
    */
   async getShortestNumberOfDaysBetweenFilmReleases(directorName) {
        //TODO Implement...

        try {
            const films = await this.filmsApiService.getFilms();
            const filmsByDirector = films.filter((obj) => obj.directorName === directorName);

            if (filmsByDirector.length === 0) {
                return null;
            } else if (filmsByDirector === 1) {
                return 0;
            }

            let min = Infinity;

            filmsByDirector.map((obj) => obj.releaseDate)
                                        .sort((date1, date2) => date1.localeCompare(date2))
                                        .forEach((curr, i, arr) => {
                                            if (i < arr.length-1) {
                                                var first = moment(curr, "YYYY-MM-DD");
                                                var second = moment(arr[i+1], "YYYY-MM-DD");

                                                min = Math.min(min, moment.duration(second.diff(first)).asDays());
                                            }
                                        });
            return min;

        } catch (error) {
            console.error(error.message);
        }
    }   
    
}
