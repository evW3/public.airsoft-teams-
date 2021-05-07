export const ROLES: any = { PLAYER: "PLAYER", MANAGER: "MANAGER" };

export const PermissionsList: any = {
    admin: [
        {
            name: "/api/admins/activate-manager"
        },
        {
            name: "/api/admins/managers"
        }
    ],
    manager: [],
    player: []
}