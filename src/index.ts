export type ValidationResult = { valid: boolean; error?: string };
export type Rule<T = any> = (value: T, all?: Record<string, any>) => ValidationResult;

export const rules = {
  required: (msg = "Campo obrigatório"): Rule => (v) => ({
    valid: v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0),
    error: msg,
  }),
  min: (n: number, msg?: string): Rule<string | number> => (v) => {
    const len = typeof v === "string" ? v.length : Number(v);
    return { valid: len >= n, error: msg ?? `Mínimo ${n}` };
  },
  max: (n: number, msg?: string): Rule<string | number> => (v) => {
    const len = typeof v === "string" ? v.length : Number(v);
    return { valid: len <= n, error: msg ?? `Máximo ${n}` };
  },
  pattern: (re: RegExp, msg = "Formato inválido"): Rule<string> => (v) => ({
    valid: re.test(v ?? ""),
    error: msg,
  }),
  email: (msg = "E-mail inválido"): Rule<string> => (v) => ({
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? ""),
    error: msg,
  }),
  custom: <T>(fn: (v: T, all?: Record<string, any>) => boolean, msg = "Inválido"): Rule<T> =>
    (v, all) => ({ valid: fn(v, all), error: msg }),
};

export type Schema = Record<string, Rule[]>;
export type Errors = Record<string, string>;

export function validate(data: Record<string, any>, schema: Schema): { valid: boolean; errors: Errors } {
  const errors: Errors = {};
  for (const key of Object.keys(schema)) {
    for (const rule of schema[key]) {
      const res = rule(data[key], data);
      if (!res.valid) {
        errors[key] = res.error ?? "Inválido";
        break;
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateField(value: any, fieldRules: Rule[], all?: Record<string, any>): ValidationResult {
  for (const rule of fieldRules) {
    const res = rule(value, all);
    if (!res.valid) return res;
  }
  return { valid: true };
}
