module.exports = function(sequelize, DataTypes) {
	var Burger = sequelize.define(
		"burgers",
		{
			burger_name: { type: DataTypes.STRING },
			devoured: { type: DataTypes.BOOLEAN, defaultValue: false }
		},
		{
			timestamps: false
		}
	);
	return Burger;
};
