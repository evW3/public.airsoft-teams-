import { sequelize } from './BaseDB';
import { Roles, Permissions, RolePermissions } from '../models/relations';
import { PermissionsList } from '../constants';

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
        let rolePermissions = [];
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
                            rolePermissions.push({ roleId: adminIdx,  })
                        }
                    }
                )
            }
        )
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
            if(!uniquePermissions.includes(k)) {
                uniquePermissions.push(repeatPermissions[k]);
            }
        }
        console.log('uniquePermissions', uniquePermissions);
        return uniquePermissions;
    }

    async syncAll() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            //await this.initRoles();
            //await this.initPermissions();
            await this.initRolePermissions();
            await this.log(sequelize);
        } catch (e) {
            console.log('[DB]: Failed connection to DB!');
        }
    }

    async removeAll() {
        await sequelize.drop();
    }
}