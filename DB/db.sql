CREATE TABLE event (
	eventId INT(30) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	admin VARCHAR(20) NOT NULL REFERENCES user(username),
	name VARCHAR(30) NOT NULL,
	eventDate DATE NULL,
	address VARCHAR(200) NULL,
	amount DOUBLE(10, 2) NOT NULL
);

CREATE TABLE user (
	username VARCHAR(20) PRIMARY KEY NOT NULL,
	password VARCHAR (64) NOT NULL,
	name VARCHAR(20) NOT NULL,
	email VARCHAR(64) NOT NULL
);

CREATE TABLE participant (
	username VARCHAR(20) NOT NULL,
	eventId INT(30) NOT NULL,
	giftee VARCHAR(20) NULL,
	CONSTRAINT participant_pk PRIMARY KEY (username, eventId)
);

CREATE TABLE wish (
	wishId INT(30) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	eventId INT(30) NOT NULL REFERENCES event (eventId),
	username  VARCHAR(20) NOT NULL REFERENCES user(username),
	wish LONGTEXT
);

CREATE TABLE invitation (
	username VARCHAR(20) NOT NULL,
	eventId INT(30) NOT NULL,
	CONSTRAINT invitations_pk PRIMARY KEY (username, eventId)
);

CREATE TABLE veto (
	eventId INT(30) NOT NULL,
	vetoer VARCHAR(20) NOT NULL,
	vetoed VARCHAR(20) NOT NULL,
	CONSTRAINT invitations_pk PRIMARY KEY (eventId, vetoer, vetoed)
);

ALTER TABLE event 
ADD started BOOLEAN NOT NULL;







