export default function isUserHaveRoles(roles, userRoles) {
    if (userRoles && userRoles.length > 0) {
        for (let userRole of userRoles) {
            roles = roles.filter(role => userRole != role );
            if (roles.length === 0) {
                return true;
            }
        }
    }
    return false;
}