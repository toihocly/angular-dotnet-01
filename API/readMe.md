create database by appsetting.Devlopment.json

> dotnet ef database update

create migrate Entities file to convert Data to ORM

> dotnet ef migrations add InitialCreate -o Data/Migrations

run dotnet

> dotnet run

update migrations after change new Entities

> dotnet ef migrations add UserEntityUpdated

remove migrations before

> dotnet ef migrations remove

add new migrations new Entities

> dotnet ef migrations add UpdatedUserEntity

drop the database

> dotnet ef database drop
