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

INSERT INTO user VALUES ("a", "hashed-password", "a", "a@a.com");
INSERT INTO user VALUES ("b", "hashed-password", "b", "b@a.com");
INSERT INTO user VALUES ("c", "hashed-password", "c", "c@a.com");
INSERT INTO user VALUES ("d", "hashed-password", "d", "d@a.com");
INSERT INTO user VALUES ("e", "hashed-password", "e", "e@a.com");
INSERT INTO user VALUES ("f", "hashed-password", "f", "f@a.com");
INSERT INTO participant VALUES ("f", 96, null);
INSERT INTO participant VALUES ("e", 96, null);
INSERT INTO participant VALUES ("d", 96, null);
INSERT INTO participant VALUES ("c", 96, null);
INSERT INTO participant VALUES ("b", 96, null);
INSERT INTO participant VALUES ("a", 96, null);
INSERT INTO veto VALUES (96, "a", "c");
INSERT INTO veto VALUES (96, "a", "d");
INSERT INTO veto VALUES (96, "a", "e");
INSERT INTO veto VALUES (96, "b", "c");
INSERT INTO veto VALUES (96, "b", "d");
INSERT INTO veto VALUES (96, "b", "e");
INSERT INTO veto VALUES (96, "c", "a");
INSERT INTO veto VALUES (96, "d", "a");
INSERT INTO veto VALUES (96, "d", "b");
INSERT INTO veto VALUES (96, "d", "e");
INSERT INTO veto VALUES (96, "e", "A");
INSERT INTO veto VALUES (96, "e", "b");