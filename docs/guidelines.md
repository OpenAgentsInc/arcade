# Coding guidelines

- No default exports
- No require cycles
- No relative imports unless necessary to avoid require cycles or if in same folder
- Filenames for React components should be the name of the primary export (e.g. RootNavigator.tsx)
- Imports should be sorted via TypeScript Import Sorter (VSCode extension) from 'Michael' [TODO: Extract config for use with other editors]
