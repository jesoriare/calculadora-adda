# Calculadora ADDA

Calculadoras interactivas para conocer tu nota final de la asignatura **ADDA**. Hay dos versiones: una para el curso normal y otra para convocatoria.

---

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Calculadora del curso (anual) |
| `convocatoria.html` | Calculadora de convocatoria |

---

## index.html — Curso normal (anual)

ADDA es una asignatura anual dividida en dos cuatrimestres. Cada cuatrimestre se calcula por separado y al final se hace la media entre los dos.

### Fórmulas

**Nota de prácticas:**
- Cuatrimestre 1 → Práctica 1 × 50% + Práctica 2 × 50%
- Cuatrimestre 2 → Práctica 1 × 40% + Práctica 2 × 60%

**Nota de cada cuatrimestre** — se elige automáticamente la opción más favorable:
- Opción A = Teoría × 60% + Prácticas × 40%
- Opción B = Teoría × 40% + Prácticas × 40% + Cuestionarios × 20%

**Nota final:**
```
Nota final ADDA = (Cuatrimestre 1 + Cuatrimestre 2) ÷ 2
```

### Restricciones

Las tres condiciones tienen que cumplirse a la vez:

| Restricción | Condición |
|---|---|
| Mínimo por examen | Cada examen de teoría ≥ 3 |
| Media anual de teoría | (Examen C1 + Examen C2) ÷ 2 ≥ 4 |
| Nota final | Nota final ≥ 5 |

Si no se cumple el mínimo por examen o la media anual de teoría, la asignatura está suspensa aunque la nota final supere el 5.

---

## convocatoria.html — Convocatoria

En convocatoria la evaluación cambia: hay dos exámenes de teoría y cuatro de prácticas, y los pesos son distintos.

### Fórmulas

**Teoría:**
- Examen T1 × 30% + Examen T2 × 30% = 60% del total

**Prácticas:**
- Práctica 1 × 25% + Práctica 2 × 25% + Práctica 3 × 20% + Práctica 4 × 30% = 40% del total

**Nota final:**
```
Nota final = T1×30% + T2×30% + Prácticas×40%
```

### Restricción

| Condición | Valor |
|---|---|
| Nota final | ≥ 5 para aprobar |

### Lógica de los exámenes de teoría

Cada examen de teoría tiene dos opciones:

- **Guardar nota** — solo disponible si tienes ≥ 3 en ese examen. La nota entra directamente en el cálculo sin presentarte.
- **Presentarse** — la nueva nota del examen sustituye completamente a la anterior, sin vuelta atrás. Si tienes < 3, esta opción es obligatoria.

---

## Uso

Abre cualquiera de los dos archivos directamente en el navegador. No necesitan servidor ni instalación. Introduce tus notas y el resultado se actualiza en tiempo real.
