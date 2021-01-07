const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [email])
  .then(res => {
    //console.log(res.rows)
    if (res.rows.length > 0) {
      console.log(res.rows)
      return res.rows[0];
    }
    else return null;
  })
  .catch(error => {
    console.log(error);
    return null;
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [id])
  .then(res => {
    //console.log(res.rows)
    if (res.rows.length > 0) {
      console.log(res.rows)
      return res.rows[0];
    }
    else return null;
  })
  .catch(error => {
    console.log(error);
    return null;
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *; `, [user.name, user.email, user.password])
  .then(res => {
    console.log(res.rows);
  })
  .catch(error => {
    console.log(error);
    return null;
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.*, properties.*, avg(property_reviews.rating) AS average_rating
    FROM reservations
    INNER JOIN properties ON reservations.property_id = properties.id
    INNER JOIN property_reviews ON reservations.property_id = property_reviews.property_id
    WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2; `, [guest_id, limit])
    .then(res => res.rows)
    .catch(error => console.log(error));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city && options.owner_id && options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`%${options.city}%`, `${options.owner_id}`, `${options.minimum_price_per_night}`,`${options.maximum_price_per_night}`);
    queryString += `WHERE city LIKE $${queryParams[0]} 
                    AND owner_id = $${queryParams[1]} 
                    AND minimum_price_per_night > $${queryParams[2]} AND maximum_price_per_night < $${queryParams[3]}
                    ` ;
  }
  else {
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    } 
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`,`${options.maximum_price_per_night}`);
      queryString += `WHERE minimum_price_per_night > $${queryParams[0]} AND maximum_price_per_night < $${queryParams[1]} `;
    }
  }
  
  

  // 4
  
  queryString += `
  GROUP BY properties.id `

  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating}%`);
    queryString += `HAVING avg(property_reviews.rating) > $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => {
    console.log('line 169: ', res.rows);
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
