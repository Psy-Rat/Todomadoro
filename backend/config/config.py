class ConfigBase(object):
    ENV = 'production'
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'iNpH8giR44wH0l0jW8TBct8EkebdkIkd'  # example, obviously
    SESSION_COOKIE_NAME = 'session'
    SERVER_NAME = '127.0.0.1:5555'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'


class ConfigDevelopment(ConfigBase):
    DEBUG = True
    ENV = 'development'


class ConfigTest(ConfigBase):
    DEBUG = True
    ENV = 'development'
    SQLALCHEMY_DATABASE_URI = ''


class ConfigProduction(ConfigBase):
    DEBUG = False
    ENV = 'production'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'


configs_register = {
    'PROD': ConfigProduction,
    'TEST': ConfigTest,
    'DEV': ConfigDevelopment,
    '': ConfigProduction,
}
