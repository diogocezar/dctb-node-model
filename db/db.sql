CREATE TABLE agenda (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(150) NOT NULL,
	phone VARCHAR(150) NOT NULL,
	PRIMARY KEY (id)
)DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO agenda (name, phone) VALUES ('Diogo Cezar', '+55 43 3132-2070');
INSERT INTO agenda (name, phone) VALUES ('Padaria Jóia', '+55 43 3524-1477');