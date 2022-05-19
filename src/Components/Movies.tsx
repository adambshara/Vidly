import React, { Component, EffectCallback } from "react";
//import { getMovies } from "./../services/fakeMovieService";
import "./Movies.css";
import { toast } from "react-toastify";
import ListGroup from "./listGroup";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
//import { getGenres } from "../services/fakeGenreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _, { isUndefined } from "lodash";
// import { Route } from "react-router";
// import LoginForm from "./loginForm";
// import { BrowserRouter } from "react-router-dom";
// import MovieForm from "./movieForm";
import { Link, RouteComponentProps } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

interface MoviesProps {
  user: any;
  history: RouteComponentProps["history"] | null;
}

interface SortingColumn {
  path: string;
  order: boolean | "asc" | "desc";
}

const Movies: React.FC<MoviesProps> = (props) => {
  const [movies, setMovies] = useState<any>([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortColumn, setSortColumn] = useState<SortingColumn>({
    path: "title",
    order: "asc",
  });

  useEffect(() => {
    const getGenresApi: any = async () => {
      const genres = await getGenres();
      const genresCopy: any = [{ _id: "", name: "All Genres" }, ...genres.data];
      setGenres(genresCopy);
    };

    const getMoviesApi = async () => {
      const movies: any = await getMovies();

      setMovies(movies.data);
    };

    getGenresApi();
    getMoviesApi();
  }, []);

  const handleDelete = async (movie: { id: any; _id: any }) => {
    const moviesCopy = movies.filter((m: { id: any }) => m.id !== movie.id);
    setMovies(movies);

    try {
      await deleteMovie(movie._id);
      props.history?.push("/");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      setMovies(moviesCopy);
    }
    props.history?.push("/movies");
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre: any) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn: any) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filtered: any =
      selectedGenre && selectedGenre._id
        ? movies.filter(
            (m: { genre: { _id: any } }) => m.genre._id === selectedGenre._id
          )
        : movies;

    const sorting = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const filteredMovies = paginate(sorting, currentPage, pageSize);

    return { totalCount: filtered.length, filteredMovies };
  };

  const count = movies?.length ?? 0;

  const { user } = props;

  //Displaying the message
  if (count === 0) return <p>There are no movies in the DB</p>;
  //debugger;
  //turner filtering

  const result = getPagedData();

  const checkUserAuthorization = () => {
    return props.user?.name ?? "" ? true : false;
  };

  return (
    <div className="row m-2 mt-3">
      <div className="col-3  list">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
          textProperty={"name"}
          valueProperty={"label"}
        />
      </div>
      <div className="col">
        {user && (
          <Link to="/movies/new" className="btn btn-primary">
            Add movies
          </Link>
        )}

        <p className="showing mt-2">
          Showing {result.totalCount} movies in the DB
        </p>
        <MoviesTable
          movies={result.filteredMovies}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
          isAuthorized={checkUserAuthorization()}
        />
        <Pagination
          itemsCount={result.totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
