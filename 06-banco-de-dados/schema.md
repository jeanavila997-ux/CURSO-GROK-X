# Banco de Dados do Curso

## Tecnologia
`localStorage` do navegador — chave `curso-grok-db-v1`.

## Schema (JSON)
```json
{
  "version": 1,
  "completedLessons": { "plano-1": true },
  "notes": { "plano": "texto..." },
  "lastModuleId": "plano",
  "updatedAt": "2026-10-23T..."
}
```

## Por quê localStorage?
Zero instalação, funciona offline, ideal para um curso local.

## Analogia
É a gaveta do navegador. Cada site tem a sua gaveta. Exportar JSON = fotocópia da gaveta.