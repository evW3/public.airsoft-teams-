import { sequelize } from './BaseDB';
import { Roles, Permissions, RolePermissions } from '../models/relations';
import { Users } from "../models/users";
import { PermissionsList } from '../constants';
import { encrypt } from "./security";
import { Sequelize } from "sequelize";
import { IKeyValue } from "./interfaces";
import {deprecate} from "util";

interface IRolesPermission {
    roleId: number,
    permissionId: number
}
class ModelsSynchronizer {
    private async log(sequelize: Sequelize) {
        Object.keys(sequelize.models).map(modelName => console.log(`[DB]: Model "${ modelName }" were synchronized!`));
    }

    private async initRoles() {
        await Roles.destroy({ truncate: true, cascade: true });
        await Roles.bulkCreate([{ name: "ADMIN" }, { name: "MANAGER" }, { name: "PLAYER" }]);
    }

    private async initPermissions() {
        await Permissions.destroy({ truncate: true, cascade: true });
        const permissions = this.getListPermissions(PermissionsList);
        await Permissions.bulkCreate(permissions);
    }

    private getListPermissions(PermissionsList: IKeyValue): object[] {
        let permissionNames: object[] = [];
        Object.keys(PermissionsList).forEach(key => permissionNames.push({ name: key }));
        return permissionNames;
    }

    private async initRolePermissions() {
        await RolePermissions.truncate();
        const roles = await Roles.findAll({ raw: true });
        let rolePermissions: IRolesPermission[] = [];
        const permissions = await Permissions.findAll({ raw: true });

        let adminIdx: number = this.findRoleIndex("ADMIN", roles);
        let managerIdx: number = this.findRoleIndex("MANAGER", roles);
        let playerIdx: number = this.findRoleIndex("PLAYER", roles);

        for(const i of permissions) {
            PermissionsList[i.name].forEach( roleName =>
                roleName === "ADMIN" ? rolePermissions.push({ roleId: adminIdx, permissionId: i.id }) :
                    roleName === "MANAGER" ? rolePermissions.push({ roleId: managerIdx, permissionId: i.id }) :
                        rolePermissions.push({ roleId: playerIdx, permissionId: i.id })
            )
        }

        await RolePermissions.bulkCreate(rolePermissions);
    }

    private findRoleIndex(roleName: string, roles: object[]): number {
        let id: number = 0;
        roles.forEach(
            (item: any) => item.name === roleName ? id = item.id : null )
        return id;
    }

    private async createAdmin() {
        const email = "byruk228i@gmail.com";
        await Users.destroy({ where: { email } });
        const roles: any = await Roles.findOne({ where: { name: "ADMIN" }, attributes:['id'] })
        const encryptData = await encrypt('test');
        await Users.create({
            email,
            activation: true,
            password: encryptData.strongPassword,
            password_salt: encryptData.salt,
            roleId: roles.id
        });
    }

    async syncAll() {
        try {
            //await this.removeAll();
            await sequelize.authenticate();
            await sequelize.sync();
            // await this.initRoles();
            // await this.createAdmin();
            // await this.initPermissions();
            // await this.initRolePermissions();
            await this.log(sequelize);
        } catch (e) {
            console.log(e);
        }
    }

    async removeAll() {
        await sequelize.drop();
    }
}