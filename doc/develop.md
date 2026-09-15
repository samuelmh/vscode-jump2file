# Jump2File - Develop, package, deploy

## Development environment

How to set a development environment.

1. Install [Node Version Manager](https://github.com/nvm-sh/nvm): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash`
1. Install the Node Server version from `.nvmrc`: `nvm install`
1. Activate the Node Server in the terminal session: `nvm use`.
1. Install the project dependencies: `npm install`.

## Develop in VSCode

Once the dev environment is set. You can open the project in vscode and run the command `Debug: Start Debugging` or key F5. A new window will appear with the extension enabled.

## Version

Version format is `X.Y.Z` .
I like to use calver where, X is the year, Y the month and Z the version of the month (as there could be several revisions in a day).

- Manual update: `npm version <X.Y.Z> --no-git-tag-version`

## Package

**NOTE:** what will be ignored in the package is defined in 2 files.

- `.gitignore`: project level.
- `.vscodeignore`: package level.

How to create the VSIX (VS Code extension)

1. Transpile from TypeScript (`src/`) to JavaScript (`dist/`): `npm run compile`
1. Review what will be packaged: `npx vsce ls`
1. Build the package: `npx vsce package`

## Deploy

**NOTE**: it seems getting a Personal Access Token requires an Azure account with an Organization and it requires... **[A credit card!!!](https://github.com/microsoft/vsmarketplace/issues/2135)**

So, upload it manually.

In order to [publish the extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode).

- Upload the extension`npx vsce publish --packagePath <extension>.vsix`.
