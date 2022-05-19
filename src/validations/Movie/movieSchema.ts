import * as yup from 'yup';

export const movieSchema:any = yup.object().shape({
  _id: yup.string(),
  title: yup.string().required().label("Title").min(5),
  genreId: yup.string().required().label("Genre"),
  numberInStock: yup.number()
    .required()
    .min(0)
    .max(100)
    .label("Number in Stock"),
  dailyRentalRate: yup.number()
    .required()
    .min(0)
    .max(10)
    .label("Daily Rental Rate"),
});
