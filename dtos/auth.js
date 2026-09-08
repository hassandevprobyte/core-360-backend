class UserResponseDTO {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.effectivePermissions = user.effectivePermissions;
    this.effectiveScope = user.effectiveScope;
    this.indexPath = user.indexPath;
  }
}

class LoginResponseDTO {
  constructor({ user, accessToken, refreshToken }) {
    this.user = new UserResponseDTO(user);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

class RefreshResponseDTO {
  constructor({ accessToken }) {
    this.accessToken = accessToken;
  }
}

class ChangePasswordResponseDTO extends UserResponseDTO {
  constructor(user) {
    super(user);
  }
}

module.exports = {
  UserResponseDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
  ChangePasswordResponseDTO,
};
