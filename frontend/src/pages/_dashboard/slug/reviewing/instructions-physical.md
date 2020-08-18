### Please read this carefully before you begin reviewing. You'll be able to start reviewing at the bottom of this page (once you've read the instructions).

This event uses a modified version of Gavel to decice the winner. Gavel was originally created by the HackMIT team in 2015 to solve the problem of deciding the winner of a large-scale competition in a matter of a few hours in as fair of a way as possible. We at Junction have used it at our events since 2016 and have since improved on the original, as we don't believe outside "experts" are the best people to decide what is a good hack. We want to leave that to the people who know most about hackathons (you, the hackers), and have thus made our own version of the algorithm which allows participants to review each other without being able to skew the results in their favor. If you're interested in reading in detail about the mathematics and reasoning behind the system, please go ahead and view the [original project on GitHub](https://github.com/anishathalye/gavel), as well as [this excellent blog post](https://www.anishathalye.com/2015/03/07/designing-a-better-judging-system/) written by the creator of the original Gavel, Anish Athalye.

### How it works

Gavel is a fully automated judging system that both tells you where to go and collects your votes. The system is based on the model of pairwise comparison. You'll start off by looking at a single submission and then for every submission after that, you'll decide whether it's better or worse than the one you looked at _immediately beforehand_. If at any point, you can't find a particular submission, you will be able to skip it and you will be assigned a new project to review. _Please don't skip projects unless absolutely necessary_. The system makes it really simple for you to submit votes, but please think hard before you vote. _Once you make a decision, you can't take it back_.

When the reviewing period begins, you should split your team into two parts - a few people who will demo your project to other reviewers, and the other members of your team go around and review other peoples' projects. If you're in a team with just one or two members, don't worry - you don't need to participate in reviewing and can just focus on demoing your own project. Keep in mind that each member of your team will be assigned their own random queue of projects to review, which means that should you want to review other projects as a group, you'll need to do it on a single device.

### Reviewing quota

To ensure quality results, we'll need a minimum of at least around 5 votes per project. To help make this happen, we have a small reviewing quota - a minimum amount of other projects that each team needs to go and review. Your team's quota will be calculated when the submission period ends, and will be clearly visible here, along with your progress towards meeting the quota. _If your team fails to meet this quota, your score will be adjusted with a small penalty._

### To recap:

-   The system will always tell you which project to go look at next, and you're free to keep going
    until you've seen all of the projects.
-   You will always compare your current project to the one you saw immediately beforehand,
    regardless of who won the previous comparison.
-   There is a (small) quota of project reviews your team must make (all team members combined), or
    your team's score will be applied a small penalty.
