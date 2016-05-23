module.exports = { 
	user: { 
		name: {type: String, required: true},
		password: {type: String, required: true},
		code: {type: String, required: true}
	},
	location: {
		userId: {type: String, required: true},
		x: {type: Number, required: true},
		y: {type: Number, required: true},
		time: {type: Date, default: Date.now, required: true},
		img: {type: String, required: true},
		label: {type: String, required: true}
	},
	lastModified: {
		location: {type: Date, default: Date.now, required: true}
	}

};