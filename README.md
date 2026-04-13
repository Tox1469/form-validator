[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/form-validator/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/form-validator/actions)
[![License](https://img.shields.io/github/license/Tox1469/form-validator?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/form-validator?style=flat-square)](https://github.com/Tox1469/form-validator/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/form-validator?style=flat-square)](https://github.com/Tox1469/form-validator/stargazers)

---

# form-validator

Validação de formulários com regras compostas: required, min, max, pattern, email e custom.

## Instalação

```bash
npm install form-validator
```

## Uso

```ts
import { validate, rules } from "form-validator";

const schema = {
  name: [rules.required(), rules.min(3)],
  email: [rules.required(), rules.email()],
  age: [rules.custom<number>((v) => v >= 18, "Maior de idade")],
};

const { valid, errors } = validate({ name: "Tox", email: "a@b.c", age: 20 }, schema);
```

## API

- `validate(data, schema)` — valida objeto completo
- `validateField(value, rules, all?)` — valida campo único
- `rules.required(msg?)`
- `rules.min(n, msg?)` / `rules.max(n, msg?)`
- `rules.pattern(regex, msg?)`
- `rules.email(msg?)`
- `rules.custom(fn, msg?)`

## Licença

MIT