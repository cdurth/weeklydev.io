module.exports = {
	method: 'GET',
	path: '/surveys',
	handler: (req, res) => {
		res({
			success: true,
			message: "Here we will see all surveys"
		});
	}
}
