CREATE TABLE `blog`.`authors` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`));


CREATE TABLE `blog`.`posts` (
`id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(255) NOT NULL,
`summary` VARCHAR(255) NOT NULL,
`body` TEXT NOT NULL,
`date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
`author_id` INT NOT NULL,
PRIMARY KEY (`id`));


SELECT * FROM authors;