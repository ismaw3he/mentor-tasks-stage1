### 0 - Files

Every time be sure that you wrote `.gitignore` and add necessary files to ignore.

In current rope I found `.idea` folder 3...**three!** times.

### 1 - Classes

If you used classes - use them for hole the project.
And almost all of your listeners will became a methods, global variables(uhh...) will became just properties and so on.

### 2 - Event listeners.  

Perfect situation - you have only one event listener for all your app. It allow you to manage **all** the processes in only one place. It coould be separate class of separate object with its own methods.  

The main idea is to have less listeners. But think your own head and analise, 'cause one listener is not perfect solution for all the cases. Just mind yourself that event listeners are your responsibilities on your work. The more you have - the less will be concentration level.


### 3 - JS Structure

Probably it'll be easier to navigate if you separate your code to several files, that will be added in the bottom of html separately one by another.

### 4 - Font Awesome

It is not a good idea to use it as library, that fully integrated into your project. Just a couple of icons can be easily downloaded from the internet in `.png` format. 

And I didn't get where do you use `all.css` file from your general `css` folder...