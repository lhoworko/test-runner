# VSCode Test Runner

Easily run tests depending on file type. Includes some basic test commands by default, but it's really easy to configure for your own uses - including new file types.

There is only one configuration setting, `test-runner.executorMap`

```
"test-runner.executorMap": {
  "ruby": "rspec",
  "typescriptreact": "npm run jest",
  ...
  "<filetype>": "<test command>"
}
```

This plugin doesn't include any key bindings by default. You can add to your `settings.json` file to set these up.
