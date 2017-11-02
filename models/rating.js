module.exports = function(sequelize, DataTypes) {
	var Rating = sequelize.define(
		"ratings",
		{
			user_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 140]
				}
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					max: 10
				}
			}
		},
		{
			timestamps: false
		}
	);

	Rating.associate = function(db) {
		Rating.belongsTo(db.burgers, {
			onDelete: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Rating;
};
