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

INSERT INTO user VALUES ("A", "hashed-password", "A", "a@a.com");
INSERT INTO user VALUES ("B", "hashed-password", "B", "b@a.com");
INSERT INTO user VALUES ("C", "hashed-password", "C", "c@a.com");
INSERT INTO user VALUES ("D", "hashed-password", "D", "d@a.com");
INSERT INTO user VALUES ("E", "hashed-password", "E", "e@a.com");
INSERT INTO participant VALUES ("F", 96, null);
INSERT INTO participant VALUES ("E", 96, null);
INSERT INTO participant VALUES ("D", 96, null);
INSERT INTO participant VALUES ("C", 96, null);
INSERT INTO participant VALUES ("B", 96, null);
INSERT INTO participant VALUES ("A", 96, null);
INSERT INTO veto VALUES (96, "A", "C");
INSERT INTO veto VALUES (96, "A", "D");
INSERT INTO veto VALUES (96, "A", "E");
INSERT INTO veto VALUES (96, "B", "C");
INSERT INTO veto VALUES (96, "B", "D");
INSERT INTO veto VALUES (96, "B", "E");
INSERT INTO veto VALUES (96, "C", "A");
INSERT INTO veto VALUES (96, "D", "A");
INSERT INTO veto VALUES (96, "D", "B");
INSERT INTO veto VALUES (96, "D", "E");
INSERT INTO veto VALUES (96, "E", "A");
INSERT INTO veto VALUES (96, "E", "B");