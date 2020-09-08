# Tabifier Action

Want to work at Piep Piper? You must use this action in all of your repository!

This action converts leading whitespaces in your repository to tabs. Richard
Hendricks will be happy!

This action takes 1 optional input - `tabLength` (default value is 4 - means 4
spaces will be replaced by 1 tab. The values are always rounded up, _e.g._ 7
spaces will be replaced by 2 tabs). Note that, files inside `.github` directory
are ignored.

Here is an example workflow:

```yaml
name: Tabify

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Repo checkout
      uses: actions/checkout@v2
    - name: Tabify
      uses: ayan-b/tabifier-action@master
      env:
        github_token: ${{ secrets.GITHUB_TOKEN }}
      with:
        tabLength: 4
    - name: Commit and push
      run: |
        git status
        git add .
        git config --global user.name "github-actions[bot]"
        git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"
        git commit -m "Tabify"
        # change the link according to your repository
        git push https://ayan-b:${GITHUB_TOKEN}@github.com/ayan-b/tabifier-playground HEAD:master
```

You can see this action in action [here](https://github.com/ayan-b/tabifier-playground).

Jump responsibly!

![richard-jumping](./assets/richard-jumping.jpg)

<small><i><a href="https://www.youtube.com/watch?v=SsoOG6ZeyUI">Source</a></i></small>

## License

[MIT](./LICENSE)
