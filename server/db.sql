-- -----------------------------------------------------
-- Drop all tables
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traces`;
DROP TABLE IF EXISTS `transactions`;
DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `users`;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `applications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `applications`;

CREATE TABLE IF NOT EXISTS `applications` (
  `application_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`application_id`),
CONSTRAINT `user_application_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `transactions`;
-- Potential gotcha 
-- SET SQL_MODE='ALLOW_INVALID_DATES';
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` INT(11) NOT NULL AUTO_INCREMENT,
  `application_id` INT(11) NOT NULL,
  `route` VARCHAR(255) NOT NULL,
  `method` VARCHAR(100) NOT NULL,
  `user_agent` TEXT,
  `raw_headers` TEXT,
  `cookies` TEXT,
  `remote_address` VARCHAR(150),
  `start_timestamp` TIMESTAMP(6) NOT NULL,
  `end_timestamp` TIMESTAMP(6) NOT NULL,
  `duration` float(40) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `application_id_idx` (`application_id` ASC),
  CONSTRAINT `transaction_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `traces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `traces`;

CREATE TABLE IF NOT EXISTS `traces` (
  `trace_id` INT(11) NOT NULL AUTO_INCREMENT,
  `application_id` INT(11) NOT NULL,
  `transaction_id` INT(11) NOT NULL,
  `route` VARCHAR(255) NOT NULL,
  `method` VARCHAR(100) NOT NULL,
  `library` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `start_timestamp` TIMESTAMP(6) NOT NULL,
  `end_timestamp` TIMESTAMP(6) NOT NULL,
  `duration` float(40) NOT NULL,
  PRIMARY KEY (`trace_id`),
  INDEX `application_id_idx` (`application_id` ASC),
  CONSTRAINT `trace_application_id`
    FOREIGN KEY (`application_id`)
    REFERENCES `applications` (`application_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `trace_transaction_id`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `transactions` (`transaction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Sample data - do not use in production
-- -----------------------------------------------------

-- Users

insert into users (`email`, `username`, `password`) VALUES ('user_01@gmail.com', 'user_01', 'bcrypthash');
insert into users (`email`, `username`, `password`) VALUES ('user_02@gmail.com', 'user_02', 'bcrypthash');
insert into users (`email`, `username`, `password`) VALUES ('user_03@gmail.com', 'user_03', 'bcrypthash');

select * from users;

-- Applications

insert into applications (`user_id`, `name`) VALUES ('9', 'user01 - app1');
insert into applications (`user_id`, `name`) VALUES ('9', 'user01 - app2');
insert into applications (`user_id`, `name`) VALUES ('9', 'user01 - app3');
insert into applications (`user_id`, `name`) VALUES ('10', 'user02 - app1');
insert into applications (`user_id`, `name`) VALUES ('10', 'user02 - app2');
insert into applications (`user_id`, `name`) VALUES ('10', 'user02 - app3');
insert into applications (`user_id`, `name`) VALUES ('11', 'user03 - app1');

select * from applications;

-- Transactions

INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (9,'/dogs','POST', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (9,'/dogs','GET', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (9,'/dogs','DELETE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (9,'/dogs','UPDATE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);

INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (10,'/dogs','POST', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (10,'/dogs','GET', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (10,'/dogs','DELETE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (10,'/dogs','UPDATE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);

INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (11,'/dogs','POST', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (11,'/dogs','GET', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (11,'/dogs','DELETE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);
INSERT INTO transactions (application_id, route, method, start_timestamp, end_timestamp, duration) 
VALUES (11,'/dogs','UPDATE', '2018-11-11 11:11:11', '2018-11-11 12:12:12',10);

select * from transactions;

-- Traces

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,1,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,1,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,1,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,1,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,2,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,2,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,2,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,2,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,3,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,3,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,3,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,3,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,4,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,4,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,4,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (9,4,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (10,1,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (10,1,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (10,1,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (10,1,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,2,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,2,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,2,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,2,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,3,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,3,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,3,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (11,3,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (12,4,'/dogs','POST','Redis','writeFile','2018-11-11 11:11:11', '2018-11-11 12:12:11',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (12,4,'/cats','GET','FS','writeFile','2018-11-11 11:11:12', '2018-11-11 12:12:12',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (12,4,'/birds','UPDATE','FS','writeFile','2018-11-11 11:11:13', '2018-11-11 12:12:13',30);
INSERT INTO traces (application_id, transaction_id, route, method, library, type, start_timestamp, end_timestamp, duration) 
VALUES (12,4,'/mice','DELETE','Redis','writeFile','2018-11-11 11:11:14', '2018-11-11 12:12:14',30);

select * from traces

-- Selects

select * from users;
select * from applications;
select * from transactions;
select * from traces