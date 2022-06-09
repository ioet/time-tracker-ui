#!/usr/bin/python3
import sys
from os.path import exists

FILE_NAME = 'secret.auto.tfvars'


def append_secret_to_file(key, value):
    with open(FILE_NAME, 'r') as file:
        text = file.readlines()
    with open(FILE_NAME, 'w') as file:
        text[-1] = f'"{key}" = "{value}"'
        file.writelines(text)
        file.write('\n}')


if __name__ == '__main__':
    key = sys.argv[1]
    value = sys.argv[2]

    if not exists(FILE_NAME):
        with open(FILE_NAME, 'w') as file:
            file.write('additional_settings = {\n')
            file.write('}')
        append_secret_to_file(key, value)
    else:
        append_secret_to_file(key, value)
