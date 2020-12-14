# Test Runner

Easily run tests depending on file type. Includes some basic test commands by default, but it's really easy to configure for your own uses - including new file types.

There is only one configuration setting, `test-runner.executorMap`.

```
"test-runner.executorMap": {
  "ruby": "rspec",
  "typescriptreact": "npm run jest",
  ...
  "<filetype>": "<test command>"
}
```

There are two commands.
- Run Test File (`test-runner.run-file`)
- Run Test Line (`test-runner.run-line`)

There are no key bindings by default, you can add them through the Keyboard Shortcuts menu, or directory to your `keybindings.json` file with
```
{ "key": "cmd+r", "command": "test-runner.run-file" },
```

Trying to run an unmapped test file will output an error on your screen. This tells you what filetype needs to be added to the executor map.
