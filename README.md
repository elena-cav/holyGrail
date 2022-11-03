# Holy Grail

Your task this week is to find the location of the Holy Grail. Given a collection of treasure chests in JSON format, you'll need to traverse and explore the contents of each JSON treasure chest to find clues. The chests and their various items may have attached notes, engravings, messages and other cryptic clues on/in them - you should explore these properties for any external links which could lead you to additional lists of treasure. If you locate such links, your code should download the list and search those chests as well. You've located the Holy Grail when you locate a chest item with the name holy-grail.

Rewards:

- five: Points are awarded for a working algorithm which returns the location of the chest containing the Holy Grail
- three: Further points are awarded for returning the total value\*\* of all chest contents across all lists
- one: Further points are awarded for returning the total number of dead spiders across all lists
- one: Further points are awarded for returning the most common size of boots across all lists

\*\* Values are all measured in doubloons. Any Sapphires found are worth 200 doubloons, Rubies are worth 250 doubloons, and Diamonds are worth 400 doubloons.

Example:
Your solution might return:
Holy Grail location: 20.19 -19.83
Total chest value: 25600 doubloons
Dead spiders: 27
Most common boot size: 8
