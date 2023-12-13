import { $Enums } from ".prisma/client";
import Role = $Enums.Role;

export type UserRoleAndProfile = {
  id: string;
  role: Role; // Assuming Role is an enum or a type defined elsewhere in your code
  profile: {
    displayName: string;
    profilePicture: string;
  } | null; // 'profile' can be null if the user doesn't have an associated profile
};
