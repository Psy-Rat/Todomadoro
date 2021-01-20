class CLIMsg():
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

    @classmethod
    def warning(cls, string: str):
        return f"{cls.WARNING}{string}{cls.ENDC}"

    @classmethod
    def bold(cls, string: str):
        return f"{cls.BOLD}{string}{cls.ENDC}"

    @classmethod
    def blue(cls, string: str):
        return f"{cls.OKBLUE}{string}{cls.ENDC}"

    @classmethod
    def green(cls, string: str):
        return f"{cls.OKGREEN}{string}{cls.ENDC}"

    @classmethod
    def cyan(cls, string: str):
        return f"{cls.OKCYAN}{string}{cls.ENDC}"

    @classmethod
    def error(cls, string: str):
        return f"{cls.FAIL}{string}{cls.ENDC}"
