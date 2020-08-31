

# ACME PROJECT
built with React and Redux, tested with Jest and Enzyme

**steps to run project locally:**
1. npm install
2. npm start
3. visit localhost:3000 to view project

**to run tests:**
run npm test

**some searches to try:**
* "acme": it will have results for all categories
* "acme dave": it will update more relevant results to the top
* add tag "new" to a result and search "new": results with tags added can be searched by those tags

## Additional features implemented:
 * User interaction with search results 
     * pin and unpin posts (pinned post will remain at the top)
     * adding and removing tags from search results
     * deleting results (can not undo but if you're running locally, refreshing the page will reset the data)
 * Sort results based on number of matching terms (search results with more matching terms will be displayed first) 
 * Filtering results by category (eg: category, contacts...)
 
## Approach to design
**dates** 
 * represented in long text format for better readability 
 * appears as today, tomorrow, or yesterday if date is today, tomorrow, or yesterday respectively
 
**accessibility**
 * can search with enter key
 * can add tags with enter key in tags popup

**results**
 * option to filter results by category to make it easier to browse through
 
**icons**
 * used icons to indicate different pieces of information on each result

**input sanitization**
* all inputs are sanitized, tags and search inputs are converted to lowercase and empty spaces are removed
