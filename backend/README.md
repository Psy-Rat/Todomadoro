# Запросы
- PUT /api/users/ - регистрация или редактирование данных

**пришлю:** name, password

**ожидаю:** статус 201

- POST /api/users/login - вход (да, забыл в таблице отметить)(должен возвращать jwt token, в качестве payload зашить user_id)

**пришлю:** name, password

**ожидаю:** статус 200 и jwt token. В качестве payload для токена - зашить user_id

справка: 

1. https://blog.tecladocode.com/simple-jwt-authentication-with-flask-jwt/
2. https://realpython.com/token-based-authentication-with-flask/#jwt-setup
3. https://medium.com/trabe/user-authentication-with-flask-jwt-be0e6f457dff