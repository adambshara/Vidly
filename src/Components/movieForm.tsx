import React, { useState, useEffect } from "react";
import { getMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import { saveMovie } from "../services/movieService";
import { RenderSelect } from "./renderSelect";
import { movieSchema } from "../validations/Movie/movieSchema";
import { RenderInput } from "./renderInput";
import { Formik } from "formik";
import { RouteComponentProps } from "react-router-dom";

interface MovieFormProps {
  match: any;
  from: Location;
  history: RouteComponentProps["history"] ;
}

interface Movie {
  title: string;
  genreId: string;
  numberInStock: number | null;
  dailyRentalRate: number | null;
}

const MovieForm: React.FC<MovieFormProps> = (props) => {
  const [data, setData] = useState<Movie>({
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  const [genres, setGenres] = useState<any>([]);

  // const initialValues = {
  //   title: "",
  //   password: "",
  //   genreId:"",
  //   numberInStock:"",
  //   dailyRentalRate:""
  // };

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    populateGenres();
    populateMovie();
  }, []);

  const populateGenres = async () => {
    const { data: genres } = await getGenres();
    setGenres(genres);
  };

  const populateMovie = async () => {
    try {
      const movieId = props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      const dataObj = mapToViewModel(movie);
      setData(dataObj);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404)
        window.location.href = "/not-found";
      // this.props.history.replace("/not-found");
    }
  };

  

  const mapToViewModel = (movie: any) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };


  const renderButton = (label: string) => {
    return <button className="btn btn-primary">{label}</button>;
  };

  const handleSubmit = async(e: any) => {
    console.log("e", e);

    await saveMovie(e);

    props.history.push("/movies");  
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={movieSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const {
          values, //internal state
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;

        return (
          <div>
            <h1>Movie Form</h1>
            <form onSubmit={handleSubmit}>
              <RenderInput
                name="title"
                label="Title"
                value={values.title}
                onChange={handleChange}
                error={errors?.title}
              />

              <RenderSelect
                name="genreId"
                label="Genre"
                options={genres ?? []}
                value={values.genreId}
                onChange={handleChange}
                error={errors?.genreId}
              />

              <RenderInput
                name="numberInStock"
                label="Number in Stock"
                value={values.numberInStock}
                onChange={handleChange}
                error={errors?.numberInStock}
                type="number"
              />

              <RenderInput
                name="dailyRentalRate"
                label="Rate"
                value={values.dailyRentalRate}
                onChange={handleChange}
                error={errors?.dailyRentalRate}
                type="number"
              />

              {renderButton("Save")}
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default MovieForm;
