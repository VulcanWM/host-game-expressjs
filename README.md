# Hosting Games with Express.js and Socket.io

This is a template where you can host games in Express.js with the help of Socket.io.

## All Pages

- `/`: has a link to the join game page and the host game page
- `/host`: generates a game id and creates a game which others can play the game. The host can decide when to start the game and this triggers a change in Socket.io which changes. the content on the player's screens
- `/join` contains a form in which you have to enter your game id
- `/join` (`POST`): redirects you to `/join/[game_id]`
- `/join/[game_id]`: renders a page where you enter your nickname for the game
- `/join/[game_id` (`POST`): the user's game id and nickname gets saved to the session and then they get redirected to `/play`
- `/play`: the play screen is rendered, and the screen is updated whenever a new socket event is triggered
