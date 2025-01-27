--
-- Create a database using `MYSQL_DATABASE` placeholder
--
CREATE DATABASE IF NOT EXISTS `USER_TASKS`;
USE `USER_TASKS`;

-- Rest of queries
CREATE TABLE IF NOT EXISTS `users` (
    `userid` int(11) NOT NULL auto_increment,
    `name` varchar(250)  default NULL,
    `email` varchar(255) default NULL,
    `password` varchar(255) default NULL,
    primary key(userid)
 );

 CREATE TABLE IF NOT EXISTS `tasks` (
    `taskid` int(11) NOT NULL auto_increment,
    `taskdescription` varchar(255)  default NULL,
    `userid` int(11),
    primary key(taskid),
    foreign key(userid) REFERENCES users(userid)
 );
