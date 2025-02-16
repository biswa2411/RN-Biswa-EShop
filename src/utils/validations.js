export const validateUsername = (username) => {
  if (!username) { return 'Username is required'; }
  if (username.length < 4) { return 'Username must be at least 4 characters long'; }
  if (/\s/.test(username)) { return 'Username cannot contain spaces'; }
  return null;
};

export const validatePassword = (password) => {
    if (!password){ return 'Password is required';}
    if (password.length < 8){ return 'Password must be at least 8 characters';}
    // if (!/[A-Z]/.test(password)){ return 'Password must contain at least one uppercase letter';}
    // if (!/[a-z]/.test(password)){ return 'Password must contain at least one lowercase letter';}
    // if (!/\d/.test(password)){ return 'Password must contain at least one number';}
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)){ return 'Password must contain at least one special character';}
    return null; };
