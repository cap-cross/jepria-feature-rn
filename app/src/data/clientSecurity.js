export default function isUserHaveRoles(roles, userRoles) {
    for (let userRole of userRoles) {
        roles = roles.filter(role => userRole != role );
        if (roles.length === 0) {
            return true;
        }
    }
    return false;
}