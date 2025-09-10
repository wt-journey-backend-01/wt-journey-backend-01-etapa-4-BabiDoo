const ApiError = require("../utils/ApiError");
const repository = require("../repositories/usuariosRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt-helpers");

const isEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

async function createUser(req, res) {
  try {
    const ALLOWED = ["nome", "email", "senha"];
    const hasExtra = Object.keys(req.body).some((k) => !ALLOWED.includes(k));
    if (hasExtra)
      throw new ApiError(400, "Payload contém campos não permitidos.");

    const { nome, email, senha } = req.body || {};
    if (typeof nome !== "string" || !nome.trim()) {
      throw new ApiError(400, "Nome é obrigatório.");
    }
    if (!isEmail(email)) {
      throw new ApiError(400, "E-mail inválido.");
    }
    if (typeof senha !== "string" || senha.length < 8) {
      throw new ApiError(400, "A senha deve ter no mínimo 8 caracteres.");
    }

    const exists = await repository.find(email);
    if (exists) throw new ApiError(400, "E-mail já cadastrado.");

    const hashPw = await bcrypt.hash(senha, 10);
    const novo = await repository.create({ nome, email, senha: hashPw });

    return res.status(201).json(novo);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function logUser(req, res) {
  try {
    const { email, senha } = req.body || {};
    if (!email || !senha)
      return res.status(400).json({ error: "email e senha são obrigatórios." });
    const user = await repository.find(String(email).trim().toLowerCase());
    if (!user) {
      return res.status(400).send("Usuario nao encontrado");
    }

    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) {
      return res.status(401).send("Senha incorreta.");
    }
    const tokens = jwtTokens({ id: user.id, email: user.email });
    return res.status(200).json({ message: "Login efetuado.", tokens });
  } catch (err) {
    const code = err.statusCode || 500;
    return res
      .status(code)
      .json({ error: err.message || "Nao foi possivel fazer login." });
  }
}

const refreshToken = (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: "Refresh token ausente." });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Refresh token inválido." });

    const { accessToken, refreshToken } = jwtTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Login efetuado com sucesso.",
      accessToken: accessToken,
    });
  });
};

const logout = (req, res) => {
  res.clearCookie("refresh_token", { path: "/auth/refresh" });
  return res.status(204).send();
};

module.exports = { createUser, logUser, refreshToken, logout };
