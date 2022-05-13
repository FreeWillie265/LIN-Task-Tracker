# LIN Task Tracker

Take home assessment for the Luke International Software Developer Post.

### It has been developed using

- Laravel (PHP v7.4.3)
- React
- MySQL

## Setting Up the Solution

- Install composer
- Install npm
- run ```composer install```
- copy ```.env.example``` to ```.env```. On Windows, run ```copy .env.example .env```. On Linux, run ```cp .env.example .env```
- create a mysql database and use the name in the ```.env``` file
- open ```.env``` and change the values for 
```dotenv
  DB_CONNECTION=
  DB_HOST=
  DB_PORT=
  DB_DATABASE=
  DB_USERNAME=
  DB_PASSWORD=
  
  MAIL_USERNAME=
  MAIL_PASSWORD=
  MAIL_FROM_ADDRESS=
  ```
- If using gmail, use app password. For instructions follow [this link](https://support.google.com/accounts/answer/185833?hl=en)
- For other email servers, also change the values for:
```dotenv
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=465
    MAIL_ENCRYPTION=ssl
```
- Run ```php artisan key:generate```
- Run ```php artisan migrate```
- Run ```npm install```
- Run ```php artisan serve```
- On a separate terminal, but same root directory, run ```npm run dev```
- visit [http://127.0.0.1:8000](http://127.0.0.1:8000)

###### Due to time I was not able to dockerize the application but that would have been the best course of action to ease deployment
