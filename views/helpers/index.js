//
// register helpers
//
module.exports = (hbs) => {
	// add 1 to index values to have order number
	hbs.registerHelper('inc', (value) => parseInt(value) + 1);
};
