import { FilmsAPIService } from "./films-api-service";
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
        let rating = 0;
        let bestRated;
        const films = await this.filmsApiService.getFilms();
        let directorsFilms = films.filter((film) => {
            return film.directorName === directorName;
        })
        if(!directorsFilms){
            return null
        }
    
        directorsFilms.forEach(e => {
            if(e.rating > rating){
                rating = e.rating;
                bestRated = e
            }
         })
        return bestRated.name
    }

    /**
     * Retrieves the name of the director who has directed the most films in the CodeScreen Film service.
    */
   async getDirectorWithMostFilms() {
        //TODO Implement...
        let directorsFilmsCount = {}
        const films = await this.filmsApiService.getFilms();
        films.forEach((film) => {
            directorsFilmsCount[film.directorName] ? directorsFilmsCount[film.directorName]++ : directorsFilmsCount[film.directorName] = 1;
        })
        let countMostFilms = Math.max(...Object.values(directorsFilmsCount))
        let mostFilms =  Object.keys(directorsFilmsCount).find(key => directorsFilmsCount[key] === countMostFilms);
        
        return mostFilms;
    }

    /**
     * Retrieves the average rating for the films directed by the given director, rounded to 1 decimal place.
     * If there are no films directed by the given director, this method should return null.
    */
   async getAverageRating(directorName) {
        //TODO Implement...
        const films = await this.filmsApiService.getFilms();
        let directorsFilms = films.filter((film) => {
            return film.directorName === directorName;
        })
        let ratings = 0;
        directorsFilms.forEach(film => {
            ratings +=film.rating
        })
        return Math.round((ratings/directorsFilms.length) * 10) / 10;
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
        const films = await this.filmsApiService.getFilms();
        let shortestDaysBetweenFilms = [];
        let directorsFilms = films.filter((film) => {
            return film.directorName === directorName;
        })
        if(!directorsFilms) {
            return null;
        }else if (directorsFilms.length == 1){
            return 0;
        }
    let datedFilms = directorsFilms.map(film => {
            return {...film, releaseDate : new Date(film.releaseDate)};
        })
        const sortedFilms = datedFilms.sort((objA, objB) => Number(objA.releaseDate) - Number(objB.releaseDate));
        sortedFilms.forEach((film,index,arr) => {
            if( index < arr.length - 1 ){
                let current = film.releaseDate;
                let next = sortedFilms[index + 1].releaseDate;
                let differenceTime = Math.abs(current - next);
                let differenceDays = differenceTime / (1000*3600*24);
                shortestDaysBetweenFilms.push(differenceDays);
            }
        })
        return Math.min(...shortestDaysBetweenFilms);
    }   
    
}
