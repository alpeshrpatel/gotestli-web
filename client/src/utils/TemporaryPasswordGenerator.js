export function generateStrongTempPassword() {
    // Define character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    
    // Combine all characters
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    
    // Ensure at least one of each type for complexity
    let password = 
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)] +
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)] +
      numberChars[Math.floor(Math.random() * numberChars.length)] +
      specialChars[Math.floor(Math.random() * specialChars.length)];
    
    // Fill remaining 6 positions with random characters
    for (let i = 0; i < 6; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password to avoid predictable pattern
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
  
  // Generate a password
  const tempPassword = generateStrongTempPassword();
  console.log("Temporary Password:", tempPassword);