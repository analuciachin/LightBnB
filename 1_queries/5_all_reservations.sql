SELECT reservations.*, properties.*, avg(property_reviews.rating) AS average_rating
FROM reservations
INNER JOIN properties ON reservations.property_id = properties.id
INNER JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;