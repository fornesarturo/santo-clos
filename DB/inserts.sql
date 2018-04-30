INSERT INTO user VALUES ("fornesarturo", "hashed-password", "Arturo", "fornesarturo@gmail.com");
INSERT INTO user VALUES ("sebasdlhl", "hashed-password", "Sebastian", "sebasdlhl@gmail.com");
INSERT INTO user VALUES ("miguel-mzbi", "hashed-password", "Miguel", "miguel-mzbi@gmail.com");

INSERT INTO event(admin, name, eventDate, address, amount) VALUES ("fornesarturo", "Evento de Arturo", "2018/12/25", "Mi casa", 200.50, 0);
INSERT INTO event(admin, name, eventDate, address, amount) VALUES ("miguel-mzbi", "Evento de Miguel", "2018/12/23", "Casa de Miguel", 150.30, 0);
INSERT INTO event(admin, name, eventDate, address, amount) VALUES ("sebasdlhl", "Evento de Sebas", "2018/12/12", "Por ahí", 500.90, 0);

INSERT INTO participant VALUES ("fornesarturo", 1, "miguel-mzbi");
INSERT INTO participant VALUES ("miguel-mzbi", 1, "fornesarturo");
INSERT INTO participant VALUES ("fornesarturo", 3, "sebasdlhl");
INSERT INTO participant VALUES ("sebasdlhl", 3, "fornesarturo");
INSERT INTO participant VALUES ("miguel-mzbi", 2, "sebasdlhl");
INSERT INTO participant VALUES ("sebasdlhl", 2, "miguel-mzbi");

INSERT INTO wish (eventId, username, wish) VALUES (1, "fornesarturo", "Sólo dinero");
INSERT INTO wish (eventId, username, wish) VALUES (1, "miguel-mzbi", "Una foto de Sebas");
INSERT INTO wish (eventId, username, wish) VALUES (2, "miguel-mzbi", "Significado para mi vida");
INSERT INTO wish (eventId, username, wish) VALUES (2, "sebasdlhl", "Algo de Amazon");
INSERT INTO wish (eventId, username, wish) VALUES (3, "fornesarturo", "Sólo dinero");
INSERT INTO wish (eventId, username, wish) VALUES (3, "sebasdlhl", "Una revista de esas con gente sin ropa");

INSERT INTO wish (eventId, username, wish) VALUES (96, "osoazul1_1", "Algo de Amazon");
INSERT INTO wish (eventId, username, wish) VALUES (96, "osoazul1_1", "Sólo dinero");
INSERT INTO wish (eventId, username, wish) VALUES (96, "osoazul1_1", "Significado para mi vida");
INSERT INTO wish (eventId, username, wish) VALUES (96, "lafercho", "Regalo lafercho 1");
INSERT INTO wish (eventId, username, wish) VALUES (96, "lafercho", "Regalo lafercho 2");
INSERT INTO wish (eventId, username, wish) VALUES (96, "lafercho", "Regalo lafercho 3");
