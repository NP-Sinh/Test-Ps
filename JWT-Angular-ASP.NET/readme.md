# Hướng Dẫn Cài Đặt

---

## 📌 Angular Frontend

### Tạo Project Mới

```bash

# Tạo project Angular (bỏ qua Git)
ng new tên-project --skip-git

# Cài đặt dependencies
npm install
```
---

## 📌 ASP.NET Core Backend

### Tạo Project Web API

```bash
# Tạo project ASP.NET Core Web API với .NET 10.0
dotnet new webapi -n tên-project -f net10.0

# Cài thư viện
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 10.0.0
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 10.0.0
dotnet add package AutoMapper --version 12.0.0
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 12.0.0

dotnet add package BCrypt.Net-Next

# Scaffold Database bằng EF Core

scaffold-DbContext "Name=ConnectionStrings:Connection" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models/Entities -Force -Context JwtTestDBContext

```