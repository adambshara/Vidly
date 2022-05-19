import httpService from "./httpService";

const apiEndPoint = "http://localhost:3900/api/movies";
export function getMovies() {
  return httpService.get(apiEndPoint);
}
export function getMovie(movieId) {
  return httpService.get(apiEndPoint + "/" + movieId);
}

// export const saveMovie = (movie) => {
//   return httpService.post(apiEndPoint, movie);
// };

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(apiEndPoint + "/" + movie._id, body);
  }
  return httpService.post(apiEndPoint, movie);
};

// export const updateMovie = (movieId, movie) => {
//   const url = `${apiEndPoint}/${movieId}`;

//   return httpService.put(url, movie);
// };
export function deleteMovie(movieId) {
  return httpService.delete(apiEndPoint + "/" + movieId);
}
