# poppy-cli

`poppy-cli` is a project tools & factory.

## Why poppy-cli?

+ make template project easily.
+ make normalized code,config,config,flow
+ support `.poppyignore` (`.gitignore` like) to customize project logic.
+ support `project` & `plugins` structure to organize assets

## Installation

Using npm:
```shell
$ npm i poppy-cli -g
$ yarn add poppy-cli -g
```

## Usage

```shell
Usage: poppy [options] [command]

Options:
  -V, --version                                output the version number
  -h, --help                                   output usage information

Commands:
  list                                         list the poppy project name list
  sync [options] <dest_dir> <project_name...>  sync the project from poppy repo
```

### Example

create new project from `poppy-react-native` and `poppy-plugins-audio`

```shell
poppy sync poppy-react-native poppy-plugins-audio
```


