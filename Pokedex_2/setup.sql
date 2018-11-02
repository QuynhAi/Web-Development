-- Ai Nguyen-Trieu
-- CSE 154
-- 5/28/18
-- TA: Conner Ardman
-- Pokedex 2
-- This sql file creates a table name Pokdex that store collected
-- pokemon. The pokedex table have three columns of name of pokemon
-- nickname and the datefound for the date, time collected the pokemon

CREATE TABLE Pokedex(
  name        VARCHAR(30) NOT NULL PRIMARY KEY,
  nickname    VARCHAR(30) NOT NULL,
  datafound   DATETIME    NOT NULL
);