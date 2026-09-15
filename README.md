# Jump2File

VSCode extension to jump to a file related to the current one.

- Fully configurable with regular expressions.
- Allow creation of destination file if not exists.
- Fast, light, open-source, no telemetry... It just works.

## Configuration

In `settings.json`, define rules in a structure like.

```json
{
  "jump2file.rules": [
    {
      "from": "<regex>",
      "to": "<template>"
      "create": "[no (default), yes, ask]"
    },
    ...
  ]
}
```

The idea is:

- `from`: field defines a regex to extract parameters from the absolute path of the original file.
- `to`: defines a template to reconstruct, with the previously extracted parameters, the absolute path file to jump to.
- `create`: (optional, default is no) if the file you want to jump to does not exist... Should the file be created? (no, yes, ask).

See the examples to understand proposed behaviors.

### Examples

Use cases.

### Python src -> tests -> src

- The first rule allows to jump from implementation ('src/' folder) to test files ('test/' folder). If there is no test file, ask the user to create it.
- The second rule allows to jump from test to implementationfiles. If implementation does not exist, do not create the file.

```json
{
  "jump2file.mappings": [
    {
      "from": "(?<path>.*)/src/(?<folder>.+/)*(?<filename>.+)\\.py$",
      "to": "{$path}/test/{$folder}test_{$filename}.py",
      "create": "ask"
    },
    {
      "from": "(?<path>.*)/test/(?<folder>.+/)*test_(?<filename>.+)\\.py$",
      "to": "{$path}/src/{$folder}{$filename}.py"
    }
  ]
}
```
