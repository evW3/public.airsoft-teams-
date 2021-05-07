import { sequelize } from './BaseDB';
import { Roles, Permissions, RolePermissions, Users } from '../models/relations';
import { PermissionsList } from '../constants';
import { encrypt } from "./security";

export class ModelsSynchronizer {
    private async log(sequelize: any) {
        Object.keys(sequelize.models).map(modelName => console.log(`[DB]: Model "${ modelName }" were synchronized!`));
    }

    private async initRoles() {
        await Roles.destroy({ truncate: true, cascade: true });
        await Roles.bulkCreate([{ name: "ADMIN" }, { name: "MANAGER" }, { name: "PLAYER" }]);
    }

    private async initPermissions() {
        await Permissions.destroy({ truncate: true, cascade: true });
        const permissions = this.getUniquePermissions(PermissionsList);
        await Permissions.bulkCreate(permissions);
    }

    private async initRolePermissions() {
        const roles = await Roles.findAll({ raw: true });
        let rolePermissions: any = [];
        const permissions: any = await Permissions.findAll({ raw: true });
        let adminIdx:any;
        let managerIdx:any;
        let playerIdx:any;
        roles.forEach((item: any) => {
            if(item.name === "ADMIN")
                adminIdx = item.id;
            else if(item.name === "MANAGER")
                managerIdx = item.id;
            else
                playerIdx = item.id
        });

        permissions.forEach(
            (item: any) => {
                PermissionsList.admin.forEach(
                    (adminPermission: any) => {
                        if(adminPermission.name === item.name) {
                            rolePermissions.push({ roleId: adminIdx, permissionId: item.id });
                        }
                    }
                )
            }
        );

        permissions.forEach(
            (item: any) => {
                PermissionsList.manager.forEach(
                    (adminPermission: any) => {
                        if(adminPermission.name === item.name) {
                            rolePermissions.push({ roleId: managerIdx, permissionId: item.id });
                        }
                    }
                )
            }
        );

        permissions.forEach(
            (item: any) => {
                PermissionsList.player.forEach(
                    (adminPermission: any) => {
                        if(adminPermission.name === item.name) {
                            rolePermissions.push({ roleId: playerIdx, permissionId: item.id });
                        }
                    }
                )
            }
        );

        await RolePermissions.bulkCreate(rolePermissions);
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

    private getUniquePermissions(permissions: any) {
        let repeatPermissions = [...permissions.admin, ...permissions.manager, ...permissions.player];
        let repeatPermissionsIdx = [];
        let uniquePermissions: any = [];

        for(let i= 0; i < repeatPermissions.length; i++) {
            for(let j = i+1; j <= repeatPermissions.length; j++) {
                if(j === repeatPermissions.length){
                    break;
                }
                if(repeatPermissions[i].name === repeatPermissions[j].name) {
                    repeatPermissionsIdx.push(j);
                }
            }
        }

        for(let k = 0; k < repeatPermissions.length; k++) {
            if(!repeatPermissionsIdx.includes(k)) {
                uniquePermissions.push(repeatPermissions[k]);
            }
        }

        return uniquePermissions;
    }

    async syncAll() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            //await this.initRoles();
            //await this.createAdmin();
            //await this.initPermissions();
            //await this.initRolePermissions();
            await this.log(sequelize);
        } catch (e) {
            console.log('[DB]: Failed connection to DB!');
        }
    }

    async removeAll() {
        await sequelize.drop();
    }
}