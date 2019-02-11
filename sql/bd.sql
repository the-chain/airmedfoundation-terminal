CREATE DATABASE airmed;
CREATE USER 'airmed'@'localhost' IDENTIFIED BY 'LYbAWCErGttRsP9y';
GRANT ALL PRIVILEGES ON airmed.* TO 'airmed'@'localhost';
ALTER USER 'airmed'@'localhost' IDENTIFIED WITH mysql_native_password BY 'LYbAWCErGttRsP9y';