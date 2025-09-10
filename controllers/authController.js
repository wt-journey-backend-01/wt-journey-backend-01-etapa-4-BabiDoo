const repository = require("../repositories/usuariosRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt-helpers");

const validatePw = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(password)) {
    return {
      ok: false,
      message:
        "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
    };
  }

  return { ok: true };
};

async function createUser(req, res) {
  try {
    const { nome, email, senha } = req.body || {};
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "nome, email e senha são obrigatórios." });
    }
    const validPw = validatePw(senha);
    if (!validPw.ok) {
      return res.status(400).json({ error: validPw.message });
    }
    const hashPw = await bcrypt.hash(senha, 10);
    const novo = await repository.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: hashPw,
    });
    return res
      .status(200)
      .json({ id: novo.id, nome: novo.nome, email: novo.email });
  } catch (error) {
    console.log(error);
    res.status(500).send("Nao foi possivel criar o usuario.");
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
    const { accessToken, refreshToken } = jwtTokens(user);
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    return res.status(200).json({
      message: "Login efetuado com sucesso.",
      accessToken: accessToken,
      user: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Nao foi possivel fazer login.");
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
