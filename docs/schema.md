# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null, index, unique
session_token   | string    | not null, indexed
open_notebook   | integer   | not null, foreign key

## notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key, indexed
name        | string    | not null

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null

## notebook_notes (join table)
column name     | data type | details
----------------|-----------|-----------------------
notebook_id     | integer   | not null, foreign key
note_id         | integer   | not null, foreign key

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings (join table)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key
note_id     | integer   | not null, foreign key
