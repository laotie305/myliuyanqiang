# 留言板

一个使用 Vue 3 + Supabase 构建的留言板应用。

## 功能

- 发表留言
- 查看留言列表
- 管理员登录删除留言

## 配置

创建 `.env` 文件并配置以下环境变量：

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
```

## Supabase 数据库设置

在 Supabase 中创建 `messages` 表：

```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 本地开发

```bash
npm install
npm run dev
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量