create schema PEOPLE_SCHEMA;

create table PEOPLE_SCHEMA.person
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id VARCHAR(16) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    sex ENUM('Male', 'Female', 'Other') NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    date_of_birth DATETIME NOT NULL,
    job_title VARCHAR(255) NOT NULL
);
