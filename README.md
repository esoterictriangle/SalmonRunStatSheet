# SalmonRunStatSheet
a google apps script to pull stat.ink data into a google sheet for custom statistics

# Prereqs
In order to use this you need:
- a [stat.ink](https://stat.ink/) account
- [s3s](https://github.com/frozenpandaman/s3s)
- some games uploaded to stat.ink
- a google spreadsheet
 
You can best determine whether you need to automate s3s or just start it manually every time you sit down and play. Just be sure that's going; this whole thing rides or dies on it. If you automate, be sure it runs often enough that you never play more than 50 shifts between script runs!

# Setup
1. in your google spreadsheet, open `Extensions>Apps Script`. This will open a new tab
2. copy & paste PollStatDotInk.gs into the code editor
3. On line 33 replace `[username]` with your stat.ink username, then save
4. in the toolbar, make sure the function set to run is `onOpen` (there's a little dropdown to choose functions), then click run. This adds a convenient new menu item to your spreadsheet named "stats.ink"
5. hop back over to your spreadsheet tab and name a sheet "data"
6. use the new menu option and click `Get stats!` (you may need to refresh once for the button to show)
7. data should now fill up with up to 100 shifts
8. jump back to the Apps Script tab and choose the alarm clock icon `Triggers` tab on the far left
9. click `Add Trigger` in the bottom right
10. set the function to `PollStatsDotInk`, the event source as `Time-driven` and then set your frequency. You just need this to run often enough that you never have more than 100 shifts between script runs. I have it running daily for simplicity's sake.

# add lost data function
the `checkStatDotInkURL()` function checks a url against your data and either edits its row or adds a new row.
To use it, insert the tail end of a stat.ink url (e.g. the bolded section of this url: stat.ink/@triangle/salmon3/**6a9137ad-438d-4a4f-91ad-cddc6f0dda8f**) into the appropriate cell on your spreadsheet's stat sheet and use the new `check URL` command in the stats.ink dropdown. This function assumes the sheet you're using to visualize your data is named `stats`; if yours is something else, adjust line 114 apropriately or rename your stat sheet. This function currently has C20 set as the target cell--see line 116 to adjust to a different target cell.
