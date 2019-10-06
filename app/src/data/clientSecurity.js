export default function isUserHaveRoles(roles, userRoles) {
    console.log("ClientSecurity: Check if " + roles + " exists in " + userRoles);
    for (let userRole of userRoles) {
        roles = roles.filter(role => userRole != role );
        if (roles.length === 0) {
            return true;
        }
    }
    return false;
}