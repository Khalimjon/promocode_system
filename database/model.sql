CREATE TABLE Faculties(
     id  serial primary key not null ,
     name varchar(32),
     price int
);

CREATE TABLE Bloggers(
     id  serial primary key not null ,
     name varchar(32),
     balance decimal
);

CREATE TABLE Promocodes(
     id  serial primary key not null ,
     code varchar(255),
     blogger_id int not null REFERENCES bloggers (id),
     percentage decimal
);

CREATE TABLE Students(
     id  serial primary key not null ,
     name varchar(32),
     faculty_id int not null REFERENCES Faculties (id),
     promocode_id int not null REFERENCES promocodes (id),
     amount decimal
);


