INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Etta West', 'charlielevy@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Margaret Wong', 'makaylaweiss@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leroy Hart', 'jaycereynolds@inbox.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ('Speed lamp', 'description', 'https://www.pexels.com/photo/clouds-and-blue-sky-3783385/', 'https://www.pexels.com/photo/skyline-photography-of-buildings-3052361/', 100, 2, 2, 2, 'Canada', '651 Nami Road', 'Montreal', 'Quebec', '83680', true),
('Port Out', 'description', 'https://www.pexels.com/photo/clouds-and-blue-sky-3783385/', 'https://www.pexels.com/photo/skyline-photography-of-buildings-3052361/', 100, 2, 2, 2, 'Canada', '1650 Hejto Center', 'Toronto', 'Ontario', '45092', true),
('Fun Fact', 'description', 'https://www.pexels.com/photo/clouds-and-blue-sky-3783385/', 'https://www.pexels.com/photo/skyline-photography-of-buildings-3052361/', 100, 2, 2, 2, 'Canada', '1650 Dokto Street', 'Vancouver', 'BC', '45092', true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-10-08', '2018-10-12', 1, 2),
('2019-04-17', '2019-04-25', 2, 3),
('2020-01-05', '2020-01-10', 3, 3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 5, 'message'),
(4, 2, 3, 4, 'message'),
(5, 3, 2, 3, 'message');
