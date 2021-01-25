# Todomadoro

## Setup
### Backend
1. Установить [Anaconda](https://www.anaconda.com/products/individual)
2. Создать окружение Todomodoro для анаконды
> conda env create -f todomodoro_env.yml
3. Окружение Todomodoro должно отобразиться в списке доступных
> conda env list
4. > conda activate Todomodoro
5. > python app.py [env]
env - указывает какое окружение использовать: test, dev, prod

### Frontend
1. Установить [node.js](https://nodejs.org/)
2. Установить [yarn](https://yarnpkg.com/) глобально
> npm install -g yarn
3. Установить зависимости фронтенда
> cd frontend && yarn

Подождать установку пакетов
4. Собрать фронтенд
> yarn build


## Управление пакетами
обновление бека
> conda env update --file todomodoro_env.yml

обновление фронта
> cd frontend && yarn
