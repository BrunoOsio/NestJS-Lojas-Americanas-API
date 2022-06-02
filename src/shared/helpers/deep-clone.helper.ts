const deepClone = object => {
	if (typeof object !== 'object' || object === null) {
		return object;
	}

	let cloned, i;

	if (object instanceof Date) {
		cloned = new Date(object.getTime());
		return cloned;
	}

	if (object instanceof Array) {
		let l;
		cloned = [];
		for (i = 0, l = object.length; i < l; i++) {
			cloned[i] = deepClone(object[i]);
		}

		return cloned;
	}

	cloned = {};
	for (i in object) if (object.hasOwnProperty(i)) {
		cloned[i] = deepClone(object[i]);
	}

	return cloned;
}

export default deepClone;