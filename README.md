# Shared shopping list

The application is designed to provide an easy interface for usets to create and manage shopping lists. 

## Features
- Create and manage shopping lists 
- Add items to individual lists
- Mark items as collected

## Live Demo 
You can try out the live demo at [here](https://project-1-share-shopping-lists.onrender.com/) (deploy on Render) 

## Local test
1. Clone this repository
```git clone git@github.com:huyenemmashared_shopping_list_app.git```
2. Run the application:
```docker-compose up --build``` 
3. Or you can run the e2e playwright uni test by this command: 
```docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf```
