### How to contribute

To contribute to the development of this app, you should follow these steps:

1. Find the issue you want to solve under Issues, and leave a comment indicating you're going to start working on it. In case you want to work on something that does not relate to any existing issue, please make a new Issue about it, so we can have some sort of dialogue on it first.
2. Fork the repository, checkout the `dev` branch and start working on your issue.
3. Once you think you're ready, make sure to merge the latest code from the upstream repository (`dev` branch) into your fork (https://hackernoon.com/sync-a-fork-from-upstream-repo-in-github-c2c29c8eca3b)
4. Make a Pull Request into this repository, link the related issue there and add a few comments on what you've made.

For further details and guidance, please reach out to the Junction tech team at dev@hackjunction.com or start a discussion on our github discussions page.

### Branch structure / CI

We have the following branch structure for this project:

| Branch name | Purpose                                                                                                                                                                             | CI                                                    | Other notes                                                                                   |     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------- | --- |
| `dev`       | Represents the latest stage of development for the app. All pull requests are merged here.                                                                                          | Automatically deploys to dev.app.hackjunction.com     | This branch can be used to experiment with new features and can contain broken/crashing code. |     |
| `master`    | Contains the production code of the app. All changes to `master` should be introduced in the form of Pull Requests from `dev`, and have been tested in the development environment. | Automatically deploys to staging.app.hackjunction.com | This branch should only contain production-ready code, which has been sufficiently tested.    |     |
|             |
