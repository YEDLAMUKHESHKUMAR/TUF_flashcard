CREATE DATABASE Q_A;

USE Q_A;

CREATE TABLE flashcards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer CHAR(1) NOT NULL
);


-- ALTER TABLE flashcards
-- ADD COLUMN explanation TEXT;
