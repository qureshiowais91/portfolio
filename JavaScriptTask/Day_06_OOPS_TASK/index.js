// The class Movie is stated below. An instance of class Movie represents a Movie. This class has the following three properties:

// title, which is a String representing the title of the movie
// studio, which is a String representing the studio that made the movie
// rating, which is a String representing the rating of the movie (i.e. PG­13, R, etc)
// a) Write a constructor for the class Movie, which takes a String representing the title of the movie, a String representing the studio, and a String representing the rating as its arguments, and sets the respective class properties to these values.

// b) The constructor for the class Movie will set the class property rating to "PG" as default when no rating is provided.

// c)
// Write a method getPG, which takes an array of base type Movie as its argument,
// and returns a new array of only those movies in the input array with a rating of "PG".
// You may assume the input array is full of Movie instances. The returned array need not be full.

// d) Write a piece of code that creates an instance of the class Movie with the title “Casino Royale”, the studio “Eon Productions”, and the rating “PG­13”

class Movie {
  constructor(title, studio, rating = 'PG') {
    this._title = title;
    this._studio = studio;
    this._rating = rating;
  }

  getPG(movies) {
    return movies.filter((movie) => movie._rating == 'PG');
  }
}


//  just test data for getPG i know this is not Movie class instance 
const data = [
    {
        _title: "test1",
        _studio: "studio1",
        _rating: "PG"
    },
    {
        _title: "test2",
        _studio: "studio2",
        _rating: "Not"
    },
    {
        _title: "test3",
        _studio: "studio3",
        _rating: "PG"
    }
];



const test = new Movie('title1', 'studio1', 'PG');

const returnTest = test.getPG(data);
console.log(returnTest[0]);


const moviet =  new Movie('Casino Royale','Eon Productions','PG­13')
console.log(moviet)