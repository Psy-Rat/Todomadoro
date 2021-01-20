import argparse


class ArgparseFacade():
    CLI_CONFIG = 'config'

    def __init__(self):
        self.parser = self.__create_parser()
        self.parsed = {}

    def __create_parser(self):
        parser = argparse.ArgumentParser(description="Server run")
        parser.add_argument(
            self.CLI_CONFIG,
            nargs='?',
            default="",
            help='Launch configuration choice [dev/prod/test etc]')
        return parser

    def parse(self):
        self.parsed = vars(self.parser.parse_args())

    def get_configuration(self):
        ''' Get server configuration string option that been put into argv
        '''
        return self.parsed[self.CLI_CONFIG]
