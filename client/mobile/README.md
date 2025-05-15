# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Using Git As A Group

## Getting Started 

##### _EACH TEAM MEMBER MUST CLONE THE PROJECT — DO NOT FORK IT!_

Alright, now let's make a branch and code.

## Setting Up Your Branches

*Before creating a new branch, make sure you are up to date with the main branch. Simply:*

```sh
$ git pull origin main
```

Don’t ever work on the main branch. Let’s refresh your memories on how to make branches:

```sh
$ git checkout -b branchName
```

> Tip: Each branch should be made based on each feature, not page. For example, some branches could be:
> fbAuth,
> editUserInfo,
> addingGulp,
> etc.

When you make a branch, it's only created locally. So, we need to make it exist on
your remote so your team members can see it.

```sh
$ git push --set-upstream origin sameBranchName
```

This will make your branch visible on GitHub to other team members and set the upstream to push to
your specific branch. Double check to make sure your new branch is there by going to your
organization on GitHub, then to branches.

## Adding, Committing, and Pushing

##### If you've completed the steps above, you're ready to code on your branch now!

*You add and commit your files the same way you've always done it when you’re on a branch, but:*

> BEFORE YOU COMMIT, MAKE SURE YOU ARE ON YOUR BRANCH, NOT MAIN.

After you add and commit your files, push your changes to your branch on GitHub:

```sh
$ git push origin sameBranchName
```

##### Now, if you’re ready to make a pull request in order to merge your branch's code with Main, head over to GitHub:

* _Your Organization >> Branches >> Your Branch >> Compare & Pull Request_
* NEVER MERGE YOUR OWN PULL REQUEST UNTIL SOMEONE IN YOUR GROUP APPROVES IT!

## Merging Master Into Your Branch

You should keep your branch up-to-date with main. First, commit any changes on your branch.
Make sure your work in good shape and committed, so it won't be a difficult process if there are conflicts.

```sh
# on your branch
$ git add -A
$ git commit -m “blah"
$ git checkout main
$ git pull origin main
```

Now, merge your branch with main. There could be conflicts if you haven't been pulling regularly.
No worries, this can usually be fixed in just a few minutes.

```sh
$ git checkout branchName
$ git merge main
```

#### If you tried a merge which resulted in complex conflicts and want to start over, you can recover:

```sh
# on your branch
$ git merge --abort
```

## Deleting Branches

When you are finished with a feature, and everything has been merged with the main branch via pull request,
you should delete your branch associated with that feature locally and on GitHub to keep things clean and organized.
You can delete it manually on GitHub by going to the organization then to branches, or you can delete it with:

```sh
$ git push origin :BranchName
```

The difference from before is simply the colon :

To delete your branch locally:

```sh
$ git branch -d branchName
```

To FORCE branch deletion locally:

```sh
$ git branch -D branchName
```

And to prune local references to deleted branches:

```sh
$ git remote prune origin
```

### _Important Reminders:_

* Tell your team every time a pull request has been merged with main. Don’t let your team members fall behind main.
* Pull often, just to be sure. Even if no one has told you about changes on main, pull anyways. It doesn’t hurt.
* Under Branches on GitHub you can find a visual representation of how far behind or head your branch is from main.
* Double check with team members before merging.
* Make sure you are on a branch before you start working. Get in the habit of checking.

