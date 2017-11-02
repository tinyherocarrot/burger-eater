module.exports = function(sequelize, DataTypes) {
	var Burger = sequelize.define(
		"burgers",
		{
			burger_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 140]
				}
			},
			devoured: { type: DataTypes.BOOLEAN, defaultValue: false }
		},
		{
			timestamps: false
		}
	);

	Burger.associate = function(db) {
		Burger.hasMany(db.ratings, {
			onDelete: "CASCADE"
		});
	};
	return Burger;
};
