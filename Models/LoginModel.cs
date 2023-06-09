public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }

    public LoginModel(string email, string password, bool rememberMe) {
        Email = email;
        Password = password;
        RememberMe = rememberMe;
    }
}