// AuthService.ts
class AuthService {
  private static instance: AuthService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = "http://34.66.73.124/authorization";
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async authorize(role: string = "user"): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY":
            "KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data.message);
      } else {
        localStorage.removeItem("accessToken");
        await this.checkRefresh();
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      await this.checkRefresh();
    }
  }

  public async checkRefresh(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }
}

export default AuthService.getInstance();
