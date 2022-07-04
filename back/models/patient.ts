import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Table, Column, Model, AutoIncrement, Default, AllowNull, PrimaryKey, HasMany } from "sequelize-typescript";

@Table({
    tableName: 'Paciente',
    timestamps: false,
    freezeTableName: true
})
class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    @PrimaryKey
    @Column(DataTypes.STRING)
    paciente_id!: string;

    @AllowNull
    @Column(DataTypes.DATEONLY)
    data_nasc!: Date;

    @AllowNull
    @Column(DataTypes.INTEGER)
    idade!: number;

    @AllowNull
    @Column(DataTypes.STRING(5))
    endereco_cep!: string;

    @AllowNull
    @Column(DataTypes.STRING(2))
    endereco_uf!: string;

    @AllowNull
    @Column(DataTypes.INTEGER)
    fk_categoria_id!: number;
};

export default Patient;