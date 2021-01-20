from ..cli.utils import CLIMsg
from .config import configs_register


class ConfigElector():

    @classmethod
    def __config_print(cls):
        print("Registred configurations:")
        for k, v in configs_register.items():
            name = CLIMsg.cyan(k) if len(k) > 0 else CLIMsg.cyan("none")
            print(f"  {name}\t- \t{v.__name__}")
        print('\n')

    @classmethod
    def configuration_choice(cls, config: str):
        config_obj = None
        try:
            config_obj = configs_register[config.upper()]
        except KeyError as e:
            print(CLIMsg.error(
                f"Requested configuration [{config}] is not found"))
            cls.__config_print()
            exit()
        return config_obj
