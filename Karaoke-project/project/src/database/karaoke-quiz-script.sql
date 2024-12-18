CREATE DATABASE KaraokeQuiz;
USE KaraokeQuiz;

CREATE USER 'karol'@'localhost' IDENTIFIED BY 'karola';
GRANT ALL PRIVILEGES ON karaokeQuiz.* TO 'karol'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Player (
	idPlayer INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    avatar VARCHAR(45) DEFAULT 'no-avatar',
    title VARCHAR(45) DEFAULT 'Figurante'
);

CREATE TABLE Score (
	idScore INT NOT NULL AUTO_INCREMENT,
    rankPlayer INT NOT NULL,
    speedrunTime TIME(1) NOT NULL,
    fkPlayer INT NOT NULL,
    FOREIGN KEY (fkPlayer) REFERENCES Player(idPlayer),
    PRIMARY KEY (idScore, fkPlayer)
);

CREATE TABLE QuestionError (
	idQuestionError INT NOT NULL AUTO_INCREMENT,
    questionNumber INT NOT NULL,
    fkPlayer INT NOT NULL,
    FOREIGN KEY (fkPlayer) REFERENCES Player(idPlayer),
    PRIMARY KEY (idQuestionError, fkPlayer)
);

CREATE TABLE Feedback (
	idFeedback INT NOT NULL AUTO_INCREMENT,
    stars INT NOT NULL,
    feedbackDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkPlayer INT NOT NULL,
    FOREIGN KEY (fkPlayer) REFERENCES Player(idPlayer),
    PRIMARY KEY (idFeedback, fkPlayer)
);

select * from Player;

insert into Score (rankPlayer, speedrunTime, fkPlayer) values 
('45', '2', 1);

select * from Score;

insert into QuestionError (questionNumber, fkPlayer) values
(4, 1),
(45, 1),
(60, 1);

select * from QuestionError;
