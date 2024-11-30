CREATE DATABASE karaokeQuiz;
USE karaokequiz;

CREATE USER 'karol'@'localhost' IDENTIFIED BY 'music2024';
GRANT ALL PRIVILEGES ON karaokequiz.* TO 'karol'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Player (
	idPlayer INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE,
    passwordd VARCHAR(45) NOT NULL,
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