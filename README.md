# everywhereIM-technical-assignment


### *Notice on setting up the laravel API:*
The Laravel application uses docker to provide the correct runtime and a Postgresql container. There has to be .env file created in order to make docker-compse usable, .env.example can be used a template. I actually used 'sail', which laravel indroduses in the Getting Started guide. Is this the preferable way or is it better to use the system version of PHP instead?

## API design 
| Endpoint | Method | Description |
|-------- | ------- | ------- |
| /user/ | GET | This endpoints returns the list of users combined with an arrary of the colors and its ids using Laravel relations functionality.  |
| /user/signup | GET | It creates a new User and returns its ID in the response.|
| /user/{id}/colors | GET | Returns a list of the user colors. |
| /user/{id} | DELETE | Deletes a user. |
| /user/{id}/color/{color_id}?replaceWith={new_color} | PUT | This endpoint can be used to edit a color relation or to insert one, this is depending on the existence of the optional paramter 'replaceWith'. The endpoint uses user_id and color_id to find the color relation. |
| /user/{id}/color/{color_id} | DELETE | Deletes a color relation |

## Ionic APP
I implmented some extra features to the application, and I would like to know your opinion of them!
### Features:
* The logo is in the Tabs module to show it on all tabs with ease and to not make the code redundant.
* Implemented shuffling by implemting the Fisher-Yates algorithm. Wondering if there is a better or faster way?
* Refreshing on Tab Navigation keeping content up to date for the user.
* Returning user to sign up if there is no user_id in Localstorage.

## Dashboard:
It consists of only one page making use of javascript to manupilate the view. Also it implemnts an event to discard the color picker using the Escape button. Lastly it refreshes on change of colors.